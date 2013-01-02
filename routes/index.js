
/*
 * GET home page.
 */

var Connection = require("tedious").Connection,
    Request = require("tedious").Request,
    TYPES = require("tedious").TYPES,
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

exports.addressPost = function(req, res) {
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
                res.end("</table>");
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

            request.on("doneInProc", function(rowCount, more, sel) {
              res.end("</table>");
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
    }
  });
  connection.on("errorMessage", function(err) {
    console.log(err);
  });
};
