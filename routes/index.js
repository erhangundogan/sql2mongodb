
/*
 * Traditional HTTP/GET
 */

var SqlConnection = require("../sql");

exports.profiler = {};
exports.profiler.get = function(req, res) {
  res.render("index", { locals: { session:req.session }});
};
exports.profiler.getHttp = function(req, res) {
  res.render("index_ajax", { locals: { session:req.session }});
};
exports.profiler.connect = function(req, res) {
  var data = req.query.settings;
  if (data) {
    var config = {
        userName: data.userName,
        password: data.password,
        server: data.server
      },
      sqlConnection = new SqlConnection(config);
      sqlConnection.testServer(function(err, result) {
        if (err) {
          res.error("error", err.stack||err);
        } else {
          req.session.config = config;
          req.session.save();
          res.send(result);
        }
      });
  } else {
    res.error("no server information received");
  }
};
exports.profiler.command = function(req, res) {
  var data = req.query.settings;
  if (data) {
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

    req.session.mongodb_server = data.transfer;

    if (data.table) {
      sqlConnection.getTable(data, null, function(err, result) {
        if (err) {
          res.end(err.stack||err);
          process.exit(1);
        } else {
          req.session.config = config;
          req.session.save();
          res.write(result);
        }
      });
    } else if (data.procedure) {
      sqlConnection.getProcedure(data.procedure, function(err, result) {
        if (err) {
          res.end(err.stack||err);
          process.exit(1);
        } else {
          req.session.config = config;
          req.session.save();
          res.write(result);
        }
      });
    } else {
      res.error("error", "table/procedure not specified");
    }
  } else {
    res.error("no table/procedure information received");
  }
};
