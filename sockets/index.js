
/*
 socket.io implementations
 */

var Connection = require("tedious").Connection,
    Request = require("tedious").Request,
    TYPES = require("tedious").TYPES,
    jade = require("jade"),
    path = require("path"),
    app = require("../app").app,
    io = require("../app").io;

exports.validateServer = function(err, socket, session) {
  socket.on("test server", function(data) {
    if (!data) {
      return socket.emit("error", "no server information received");
    }

    var config = {
        userName: data.user,
        password: data.password,
        server: data.server
      },
      connection = new Connection(config);

    connection.on("connect", function(err) {
      if (err) {
        console.log(err);
        socket.emit("notconnected", err);
      } else {
        socket.emit("connected");
        session.config = config;
        session.save();

        var queryDatabases = new Request("sp_databases", function(err, rowCount) {
          if (err) {
            console.log(err);
          }
        }), databaseList = [];

        queryDatabases.on("row", function(database) {
          databaseList.push(database[0].value);
        });

        queryDatabases.on("doneInProc", function(rowCount, more) {
          socket.emit("databases", databaseList);
        });

        connection.callProcedure(queryDatabases);
      }
    });

    connection.on("errorMessage", function(err) {
      console.log(err);
      socket.emit("notconnected", err);
    });

  });
  socket.on("test command", function(data) {
    if (!data) {
      return socket.emit("error", "no table/procedure information received");
    }

    var config = {
        userName: data.user,
        password: data.password,
        server: data.server,
        options: {
          database: data.database
        }
      },
      connection = new Connection(config),
      types = require("../tedious2.js");

    connection.on("connect", function(err) {
      var rows = [],
          columns = [],
          request = {};

      if (err) {
        console.log(err);
        socket.emit("notconnected", err);
      } else {
        session.config = config;
        session.save();
        if (data.table) {
          var queryString = "select top 100 * from " + data.table;
          request = new Request(queryString, function(err, rowCount) {
            if (err) {
              console.log(err);
              socket.emit("error", err);
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
                type: types[item.type.name]});
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
                  socket.emit("error", err.stack||err);
                } else {
                  socket.emit("done", result);
                }
              });
          });

          connection.execSql(request);

        } else if (data.procedure) {
          request = new Request(data.procedure, function(err, rowCount) {
            if (err) {
              console.log(err);
              socket.emit("error", err);
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
                type: types[item.type.name]});
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
                  socket.emit("error", err.stack||err);
                } else {
                  socket.emit("done", result);
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
        } else {
          socket.emit("error", "no table/procedure information received");
        }
      }
    });
    connection.on("errorMessage", function(err) {
      console.log(err);
      socket.emit("notconnected", err);
    });
  });
};