



/*
exports.push = function(server, table, rows, callback) {
  Db.connect(server, function(err, db) {
    if (err) {
      console.error("[ERROR] Db.connect: %s", err.stack||err);
      return callback(err, null);
    } else {
      console.log("push initiated");
      db.collection(table, function(err, collection) {
        if (err) {
          console.error("[ERROR] db.collection: %s", err.stack||err);
          return callback(err, null);
        } else {
          console.log("collection initiated");
          collection.insert(rows, {safe:true}, callback);
        }
      });
    }
  });
};
*/