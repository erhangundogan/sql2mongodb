
exports.db = {
  connection: "mongodb://localhost/sql2mongodb",
  session: {
    host: "localhost",
    port: 27017,
    dbName: "sql2mongodb",
    collection: "sessions",
    serverOptions: { auto_reconnect: true, native_parser:true },
    dbOptions: {}
  }
};