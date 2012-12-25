
/*
 * GET home page.
 */

var Connection = require('tedious').Connection,
    Request = require('tedious').Request,
    config = {
      userName: '',
      password: '',
      server: 'pxxdgsywke.database.windows.net'
    };

exports.index = function(req, res){
  res.render('index')
};

exports.addressPost = function(req, res) {
  if (req.body && req.body.visit && req.body.visit.address) {
    var connection = new Connection(config);
    connection.on('connect', function(err) {
      request = new Request("select HotelName from Hotel ", function(err, rowCount) {
        if (err) {
          console.log(err);
        } else {
          console.log(rowCount + ' rows');
        }
      });

      request.on('row', function(columns) {
        columns.forEach(function(column) {
          console.log(column.value);
        });
      });

      connection.execSql(request);
    });
  }
};

function executeStatement() {

}