
/*
 socket.io implementations
 */

var SqlConnection = require("../sql"),
    app = require("../app").app,
    io = require("../app").io;

exports.validateServer = function(err, socket, session) {
  socket.on("test server", function(data) {
    if (!data) {
      return socket.emit("error", "no server information received");
    }

    var config = {
        userName: data.userName,
        password: data.password,
        server: data.server
      },
      sqlConnection = new SqlConnection(config);
      sqlConnection.testServer(function(err, result) {
        if (err) {
          socket.emit("notconnected", err);
        } else {
          socket.emit("connected");
          socket.emit("databases", result);
        }
      });
  });

  socket.on("test command", function(data) {
    if (!data) {
      return socket.emit("error", "no table/procedure information received");
    }

    var config = {
        userName: data.userName,
        password: data.password,
        server: data.server,
        options: {
          database: data.database
        }
      },
      sqlConnection = new SqlConnection(config);

    if (data.table) {
      sqlConnection.getTable(data.table, function(err, result) {
        if (err) {
          socket.emit("error", err);
        } else {
          socket.emit("done", result);
        }
      });
    } else if (data.procedure) {
      sqlConnection.getProcedure(data.procedure, function(err, result) {
        if (err) {
          socket.emit("error", err);
        } else {
          socket.emit("done", result);
        }
      });
    } else {
      socket.emit("error", "table/procedure not specified");
    }
  });
};