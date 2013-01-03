
/*
 socket.io implementations
 */

var Connection = require("tedious").Connection,
    Request = require("tedious").Request,
    TYPES = require("tedious").TYPES,
    jade = require("jade"),
    path = require("path"),
    app = require("../app").app,
    io = require("../app").io,
    conf = {
      userName: "",
      password: "",
      server: "80.93.210.73",
      options: {
        database: "My_EG_Search_2011"
      }
    };

exports.validateServer = function(err, socket, session) {
  socket.on("test server", function(data) {
    if (!data) {
      return socket.emit("error", { message:"no server information received" });
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
        socket.emit("error", { message:err });
      } else {
        socket.emit("connected");
        session.config = config;
        session.save();
      }
    });

    connection.on("errorMessage", function(err) {
      console.log(err);
      socket.emit("error", { message:err });
    });

  });

  socket.on("test command", function(data) {
    if (!data) {
      return socket.emit("error", { message:"no table/procedure information received" });
    }

    var config = {
        userName: data.user,
        password: data.password,
        server: data.server,
        options: {
          database: data.name
        }
      },
      request = {},
      connection = new Connection(config);

    connection.on("connect", function(err) {
      if (err) {
        console.log(err);
        socket.emit("error", { message:err });
      } else {
        session.config = config;
        session.save();
        if (data.table) {
          var queryString = "select top 1000 * from " + data.table;
          request = new Request(queryString, function(err, rowCount) {
            if (err) {
              console.log(err);
              socket.emit("error", { message:err });
            } else {
              socket.emit("done", rowCount);
            }
          });

          request.on("row", function(row) {
            if (row) {
              socket.emit("row", row);
            }
          });

          request.on("columnMetadata", function(columns) {
            if (columns) {
              socket.emit("columns", columns);
            }
          });

          connection.execSql(request);

        } else if (data.procedure) {
          request = new Request(data.procedure, function(err, rowCount) {
            if (err) {
              console.log(err);
              socket.emit("error", { message:err });
            } else {
              socket.emit("done", rowCount);
            }
          });

          request.on("row", function(row) {
            if (row) {
              socket.emit("row", row);
            }
          });

          request.on("columnMetadata", function(columns) {
            if (columns) {
              socket.emit("columns", columns);
            }
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
          socket.emit("error", { message:"no table/procedure information received" })
        }
      }
    });

    connection.on("errorMessage", function(err) {
      console.log(err);
      socket.emit("error", { message:err })
    });
  });
};