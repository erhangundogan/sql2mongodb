
/*
 * Cutting Edge Websocket (socket.io) implementation
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
          socket.emit("error", err);
        } else {
          session.config = config;
          session.save();
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
          database: data.database,
          connectTimeout: 60000
        }
      },
      sqlConnection = new SqlConnection(config);

    session.mongodb_server = data.transfer;

    if (data.table) {
      sqlConnection.getTable(data, socket, function(err, result) {
        if (err) {
          socket.emit("error", err);
          process.exit(1);
        } else {
          session.config = config;
          session.save();
          socket.emit("finished", result);
        }
      });
    } else if (data.procedure) {
      sqlConnection.getProcedure(data.procedure, function(err, result) {
        if (err) {
          socket.emit("error", err);
          process.exit(1);
        } else {
          session.config = config;
          session.save();
          socket.emit("finished", result);
        }
      });
    } else {
      socket.emit("error", "table/procedure not specified");
    }
  });
};