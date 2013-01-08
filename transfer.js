
var dbConfig   = require("./settings").db,
    MongoDb    = require("mongodb"),
    Connection = MongoDb.Connection,
    Db         = MongoDb.Db,
    BSON       = MongoDb.pure().BSON;

exports.push = function(data, rows, callback) {
  var bson = new BSON(),
      size = bson.calculateObjectSize(rows, false);
  console.log(size);
  Db.connect(data.transfer, function(err, db) {
    if (err) {
      console.error("[ERROR] Db.connect: %s", err.stack||err);
      return callback(err, null);
    } else {
      db.collection(data.table, function(err, collection) {
        if (err) {
          console.error("[ERROR] db.collection: %s", err.stack||err);
          return callback(err, null);
        } else {
          collection.insert(rows, {safe:true}, callback);
        }
      });
    }
  });
};
