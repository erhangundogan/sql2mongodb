
/*
 * GET home page.
 */

var Connection = require("tedious").Connection,
    Request = require("tedious").Request,
    Types = require("tedious").TYPES,
    jade = require("jade"),
    path = require("path"),
    config = {
      userName: "",
      password: "",
      server: "80.93.210.73",
      options: {
        database: "My_EG_Search_2011"
      }
    };

exports.index = function(req, res){
  res.render("index")
};

exports.sqlcon = function(req, res) {

};

exports.addressPost = function(req, res) {
  if (req.body && req.body.visit && req.body.visit.address) {
    var connection = new Connection(config);
    connection.on("connect", function(err) {
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
                  console.log(rowCount + " rows");
                }
              });

              request.on("row", function(columns) {
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

              request.on("doneInProc", function(rowCount, more) {
                res.write("</table>");
                res.end();
              });

              connection.execSql(request);
              */

              request = new Request("Src_HotelSearchv5", function(err, rowCount) {
                if (err) {
                  console.log(err);
                  res.write("</table>");
                  res.redirect("back");
                } else {
                  console.log(rowCount + " rows");
                }
              });

              request.on("row", function(columns) {
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

              request.on("doneInProc", function(rowCount, more) {
                res.write("</table>");
                res.end();
              });

              request.addParameter("OperatorID", Types.int, 0);
              request.addParameter("HotelID", Types.nVarChar, "");
              request.addParameter("CountryCode", Types.nVarChar, "EG");
              request.addParameter("City", Types.nVarChar, "Hurghada");
              request.addParameter("Area", Types.nVarChar, "");
              request.addParameter("Categories", Types.nVarChar, "");
              request.addParameter("Boards", Types.nVarChar, "");
              request.addParameter("Rooms", Types.nVarChar, "");
              request.addParameter("CheckInDate", Types.dateTime, "2013-03-01");
              request.addParameter("CheckOutDate", Types.dateTime, "2013-03-10");
              request.addParameter("Adult", Types.int, 2);
              request.addParameter("Child", Types.int, 0);
              request.addParameter("ChildAge1", Types.int, 0);
              request.addParameter("ChildAge2", Types.int, 0);
              request.addParameter("UserID", Types.int, 112000);
              request.addParameter("FirmID", Types.int, 65);
              request.addParameter("Position", Types.nVarChar, "web_Agent");

              connection.callProcedure(request);
            }
        });
      }
    });
    connection.on("errorMessage", function(err) {
      console.log(err);
    });
  }
};
