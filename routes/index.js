
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
      server: '80.93.210.73',
      options: {
        database: 'My_EG_Search_2011'
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
              /*
              var queryString = "select top 100 * from " + req.body.visit.address;
              var request = new Request(queryString, function(err, rowCount) {
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
              */

              var params = {};
              params.OperatorID = 0;
              params.HotelID = "";
              params.CountryCode = "EG";
              params.City = "Hurghada";
              params.Area = "";
              params.Categories = "";
              params.Boards = "";
              params.Rooms = "";
              params.CheckInDate = "2013-03-01";
              params.CheckOutDate = "2013-03-10";
              params.Adult = 2;
              params.Child = 0;
              params.ChildAge1 = 0;
              params.ChildAge2 = 0;
              params.UserID = 112000;
              params.FirmID = 65;
              params.Position = "web_Agent";

              request = new Request("exec Src_HotelSearchv5", function(err, rowCount) {
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

              connection.execute(request, params);
            }
        });
      }
    });
    connection.on('errorMessage', function(err) {
      console.log(err);
    });
  }
};
