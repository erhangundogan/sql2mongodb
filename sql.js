var Connection = require("tedious").Connection,
    Request = require("tedious").Request,
    TYPES = require("tedious").TYPES,
    jade = require("jade"),
    path = require("path")

var sqlConnection = module.exports =  function(config) {
  this.config = config;
};
sqlConnection.prototype.tableCount = function(table, callback) {
  var self = this,
      connection = new Connection(this.config);

  connection.on("connect", function(err) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      var queryString = "SELECT COUNT(0) FROM " + table;
      var request = new Request(queryString, function(err, rowCount) {
        if (err) {
          console.log(err);
          callback(err, null);
        }
      });

      request.on("row", function(result) {
        callback(null, result[0].value);
      });

      connection.execSqlBatch(queryString);
    }
  });

  connection.on("errorMessage", function(err) {
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
sqlConnection.prototype.getTable = function(table, callback) {
  var self = this,
      connection = new Connection(this.config);

  self.tableCount(table, function(err, tableCount) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      connection.on("connect", function(err) {
        var rows = [],
            columns = [],
            request = {},
            lastRowID = 0,
            count = 5000,
            queryString = [];

        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          queryString.push("DECLARE @ColumnName NVARCHAR(60)");
          queryString.push("SET @ColumnName = (SELECT top 1 name FROM sys.columns WHERE object_id = OBJECT_ID('dbo.");
          queryString.push(table);
          queryString.push("'))");
          queryString.push("SELECT * FROM ( ");
          queryString.push("SELECT ROW_NUMBER() OVER(ORDER BY @ColumnName) AS row, T.* ");
          queryString.push("FROM (SELECT * FROM ");
          queryString.push(table);
          queryString.push(") T ");
          queryString.push(") T2 WHERE T2.row BETWEEN");
          queryString.push(lastRowID);
          queryString.push("AND");
          queryString.push(count);

          request = new Request(queryString, function(err, rowCount) {
            if (err) {
              console.log(err);
              callback(err, null);
            }
          });

          // Columns information (call once)
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

          // Row information (call each row)
          request.on("row", function(row) {
            var r = {},
                item = {},
                indx = 0;
            for (indx in row) {
              item = row[indx];
              r[item.metadata.colName] = item.value;
            }
            rows.push(r);
            //socket.emit("rows length", rows.length + " kayıt alındı");
          });

          request.on("doneProc", function() {
            if (self.config.transfer) {
              var transfer = require("transfer");
              transfer.push(self.config, rows, function(err, result) {
                if (err) {
                  console.error("[ERROR] MongoTransfer, %s", err.stack||err);
                  callback(err.stack||err, null);
                } else {
                  callback(null, result.length.toString());
                }
              });
            } else {
              jade.renderFile(
                path.join(__dirname, "views", "grid.jade"),
                { rows:rows, columns:columns },
                function(err, result) {
                  if (err) {
                    console.error("[ERROR] JadeFormatter, %s", err.stack||err);
                    callback(err.stack||err, null);
                  } else {
                    callback(null, result);
                  }
                });
            }
          });

          connection.execSql(request);
        }
      });

      connection.on("errorMessage", function(err) {
        console.log(err);
        callback(err, null);
      });
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