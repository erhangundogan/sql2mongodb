var Connection = require("tedious").Connection,
    Request    = require("tedious").Request,
    TYPES      = require("tedious").TYPES,
    jade       = require("jade"),
    path       = require("path"),
    dbConfig   = require("./settings").db,
    mongoose   = exports.mongoose = require("mongoose"),
    mongodb    = require("mongodb"),
    Schema     = exports.Schema = mongoose.Schema,
    ObjectId   = exports.ObjectId = Schema.ObjectId,
    ObjectID   = require("mongodb/node_modules/bson/lib/bson").ObjectID,
    MongoConnection = {};

var sqlConnection = module.exports =  function(config) {
  this.config = config;
};
sqlConnection.prototype.tableCount = function(table, callback) {
  var self = this,
      conn = new Connection(self.config);

  conn.on("connect", function(err) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      var queryString = [];
      /*
       select SUM(rows) As Rows
       from sys.partitions p
       left join sys.objects o on o.object_id = p.object_id
       where (p.index_id in (0,1)) and (o.is_ms_shipped = 0) and (o.type_desc = 'USER_TABLE') and (o.name = 'table')
       */
      queryString.push("SELECT SUM(rows) AS Rows");
      queryString.push("FROM sys.partitions p");
      queryString.push("LEFT JOIN sys.objects o ON o.object_id = p.object_id");
      queryString.push("WHERE (p.index_id in (0,1)) AND (o.is_ms_shipped = 0) AND");
      queryString.push("(o.type_desc = 'USER_TABLE') AND o.name = ");
      queryString.push("('"+table+"')");
      var query = queryString.join(" ");

      var request = new Request(query, function(err, rowCount) {
        if (err) {
          console.log(err);
          callback(err, null);
        }
      });

      request.on("row", function(result) {
        callback(null, result[0].value);
      });

      conn.execSql(request);
    }
  });

  conn.on("errorMessage", function(err) {
    console.log(err);
    callback(err, null);
  });
};
sqlConnection.prototype.testServer = function(callback) {
  var self = this,
      connection = new Connection(this.config);

  connection.on("connect", function(err) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      var request = new Request("sp_databases", function(err) {
        if (err) {
          console.log(err);
          callback(err, null);
        }
      }), databaseList = [];

      request.on("row", function(database) {
        databaseList.push(database[0].value);
      });

      request.on("doneProc", function(rowCount, more) {
        callback(null, databaseList);
      });

      connection.callProcedure(request);
    }
  });

  connection.on("errorMessage", function(err) {
    console.log(err);
    callback(err, null);
  });
};
sqlConnection.prototype.getTable = function(data, socket, callback) {
  var self = this,
      rows = [], columns = [],
      schema = {}, ItemSchema = {}, ItemModel = {}, request = {},
      table = data.table,
      mongodbServer = data.transfer,
      lastRowID = data.rowID || 0,
      count = 10000,
      insertRows = 0,
      readRows = 0,
      types = require("./tedious2");

  self.tableCount(table, function(err, tableCount) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {

      function startTransfer(start, rowCount) {
        if (start >= tableCount) {
          return callback(null, "Transfer Finished!");
        }
        var queryString = [];

        queryString.push("DECLARE @ColumnName NVARCHAR(60)");
        queryString.push("SET @ColumnName = (SELECT TOP 1 name FROM sys.columns WHERE object_id = OBJECT_ID('dbo.");
        queryString.push(table);
        queryString.push("'))");
        queryString.push("SELECT * FROM ( ");
        queryString.push("SELECT ROW_NUMBER() OVER(ORDER BY @ColumnName) AS row, T.* ");
        queryString.push("FROM (SELECT * FROM ");
        queryString.push(table);
        queryString.push(") T ");
        queryString.push(") T2 WHERE T2.row BETWEEN");
        queryString.push(start);
        queryString.push("AND");
        queryString.push(start + rowCount);
        var query = queryString.join(" "),
            connection = new Connection(self.config);

        connection.on("connect", function(err) {
          if (err) {
            console.log(err);
            callback(err, null);
          } else {
            request = new Request(query, function(err) {
              if (err) {
                console.log(err);
                return callback(err, null);
              }
            });

            // should process columns again, because it may be changed
            request.on("columnMetadata", function(allColumns) {
              if (insertRows === 0) {
                var columnItem = {};

                for (var idx in allColumns) {
                  columnItem = allColumns[idx];
                  schema[columnItem.colName] = types[columnItem.type.name];
                }
                ItemSchema = new Schema(schema);
                ItemModel = MongoConnection.model(table, ItemSchema);
              }
            });

            request.on("row", function(row) {
              socket.emit("append", ++readRows + " kayıt MSSQL'den alındı");
              var newRow = {};

              for (var colNumber in row) {
                var item = row[colNumber];
                for (var field in schema) {
                  if (field === item.metadata.colName) {
                    newRow[field] = item.value;
                    break;
                  }
                }
              }

              var newItem = new ItemModel(newRow);
              newItem.save(function(err, result) {
                if (err) {
                  console.error("[ERROR] save failed, %s", err.stack||err);
                  socket.emit("error", err.stack||err);
                  process.exit(1);
                } else {
                  socket.emit("done", ++insertRows + " kayıt MongoDB'ye eklendi.");
                }
              });
            });

            request.on("doneProc", function() {
              lastRowID = lastRowID + count;
              startTransfer(lastRowID, count);
            });

            connection.execSql(request);
          }
        });

        connection.on("errorMessage", function(err) {
          console.log(err);
          callback(err, null);
        });
      }

      if (mongodbServer) {
        MongoConnection = mongoose.createConnection(mongodbServer);
        startTransfer(lastRowID, count);
      }
    }
  });
};
sqlConnection.prototype.getProcedure = function(procedure, callback) {
  var self = this,
      connection = new Connection(this.config);

  connection.on("connect", function(err) {
    var rows = [],
        columns = [],
        request = {};

    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      request = new Request(procedure, function(err) {
        if (err) {
          console.log(err);
          callback(err, null);
        }
      });

      request.on("columnMetadata", function(allColumns) {
        var c = {},
            item = {},
            indx = 0;
        for (indx in allColumns) {
          item = allColumns[indx];
          columns.push({
            name: item.colName,
            length: item.dataLength,
            type: types[item.type.name],
            base_type: item.type.name});
        }
      });

      request.on("row", function(row) {
        var r = {},
            item = {},
            indx = 0;
        for (indx in row) {
          item = row[indx];
          r[item.metadata.colName] = item.value;
        }
         rows.push(r);
      });

      request.on("doneProc", function() {
        jade.renderFile(
          path.join(__dirname, "..", "views", "grid.jade"),
          { rows:rows, columns:columns },
          function(err, result) {
            if (err) {
              console.error("[ERROR] JadeFormatter, %s", err.stack||err);
              callback(err.stack||err, null);
            } else {
              callback(result, null);
            }
          });
      });

      request.addParameter("OperatorID", TYPES.Int, 0);
      request.addParameter("HotelID", TYPES.NVarChar, "");
      request.addParameter("CountryCode", TYPES.NVarChar, "EG");
      request.addParameter("City", TYPES.NVarChar, "");
      request.addParameter("Area", TYPES.NVarChar, "");
      request.addParameter("Categories", TYPES.NVarChar, "");
      request.addParameter("Boards", TYPES.NVarChar, "");
      request.addParameter("Rooms", TYPES.NVarChar, "");
      request.addParameter("CheckInDate", TYPES.SmallDateTime, new Date(2013,2,1));
      request.addParameter("CheckOutDate", TYPES.SmallDateTime, new Date(2013,2,10));
      request.addParameter("Adult", TYPES.Int, 2);
      request.addParameter("Child", TYPES.Int, 0);
      request.addParameter("ChildAge1", TYPES.Int, 0);
      request.addParameter("ChildAge2", TYPES.Int, 0);
      request.addParameter("UserID", TYPES.Int, 112000);
      request.addParameter("FirmID", TYPES.Int, 65);
      request.addParameter("Position", TYPES.NVarChar, "web_Agent");

      connection.callProcedure(request);
    }
  });

  connection.on("errorMessage", function(err) {
    console.log(err);
    callback(err, null);
  });
};