
/*
 * GET home page.
 */

var Connection = require('tedious').Connection,
    Request = require('tedious').Request,
    jade = require('jade'),
    path = require("path"),
    config = {
      userName: '',
      password: '',
      server: '80.93.210.76',
      options: {
        database: 'YouTravelDB'
      }
    };

exports.index = function(req, res){
  res.render('index')
};

exports.sqlcon = function(req, res) {

};

exports.addressPost = function(req, res) {
  if (req.body && req.body.visit && req.body.visit.address) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
      if (err) {
        console.log(err);
      } else {
        jade.renderFile(
          path.join(__dirname, "..", "views", "hotel.jade"),
          function(err, result) {
            if (err) {
              console.error("[ERROR] JadeFormatter, %s", err.stack||err);
            } else {
              res.write(result);
              res.write("<table class='table table-striped table-bordered table-condensed table-hover'>");
              var queryString = "select top 100 * from " + req.body.visit.address;
              request = new Request(queryString, function(err, rowCount) {
                if (err) {
                  console.log(err);
                  res.write("</table>");
                  res.redirect("back");
                } else {
                  console.log(rowCount + ' rows');
                }
              });

              request.on('row', function(columns) {
                jade.renderFile(
                  path.join(__dirname, "..", "views", "row.jade"), {
                    "columns": columns
                  },
                  function(err, result) {
                    if (err) {
                      console.error("[ERROR] JadeFormatter, %s", err.stack||err);
                    } else {
                      res.write(result);
                    }
                });
              });

              request.on('doneInProc', function(rowCount, more) {
                res.write("</table>");
                res.end();
              });

              connection.execSql(request);
            }
        });
      }
    });
    connection.on('errorMessage', function(err) {
      console.log(err);
    });
  }
};
