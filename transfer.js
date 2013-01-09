
var dbConfig   = require("./settings").db,
    MongoDb    = require("mongodb"),
    Connection = MongoDb.Connection,
    Db         = MongoDb.Db,
    BSON       = MongoDb.pure().BSON;

exports.push = function(server, table, rows, callback) {
  var bson = new BSON(),
      maxSize = 16 * 1024 * 1024,
      size = bson.calculateObjectSize(rows, false);

  if (size > maxSize) {
    return callback("oversize");
  }

  Db.connect(server, function(err, db) {
    if (err) {
      console.error("[ERROR] Db.connect: %s", err.stack||err);
      return callback(err, null);
    } else {
      db.collection(table, function(err, collection) {
        if (err) {
          console.error("[ERROR] db.collection: %s", err.stack||err);
          return callback(err, null);
        } else {
          collection.insert(rows, {safe:false}, callback);
        }
      });
    }
  });
};
