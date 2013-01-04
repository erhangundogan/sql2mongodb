
/**
 * Module dependencies.
 */

var express           = require("express"),
    routes            = require("./routes"),
    sockets           = require("./sockets"),
    app               = exports.app = express.createServer(),
    io                = exports.io = require("socket.io").listen(app),
    dbConfig          = require("./settings").db.session,
    MongoDb           = require("mongoose/node_modules/mongodb"),
    MongoDbServer     = new MongoDb.Server(dbConfig.host, dbConfig.port, dbConfig.serverOptions),
    MongoDbConnection = new MongoDb.Db(dbConfig.dbName, MongoDbServer, dbConfig.dbOptions),
    mongoStore        = require("connect-mongodb"),
    sessionStore      = new mongoStore({ db: MongoDbConnection, collection: dbConfig.collection }),
    SessionSockets    = require("session.socket.io"),
    cookieParser      = express.cookieParser(),
    sessionSockets    = new SessionSockets(io, sessionStore, cookieParser);

// Configuration

app.configure("development", function() {
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");
  app.set("view options", { layout: false }); // for extending jade blocks
  app.use(require("connect-flash")());
  app.use(express.logger({ format: '\x1b[0;37m[:date] \x1b[0;32m:remote-addr \x1b[0;33m:method \x1b[0;30m:status \x1b[0;35m:response-time ms \x1b[0;36m:referrer \x1b[0;37m:url ' }));
  app.use(express.bodyParser({ uploadDir:"/tmp" }));
  app.use(express.methodOverride());
  app.use(cookieParser);
  app.use("/public", express.static(__dirname + "/public"));
  app.use(express.session({
    secret: "anshsb7s2j2a78D2nefkerltmKai61545s2k230O76thfwfmI1",
    maxAge: new Date(Date.now() + 3600000),
    store: sessionStore
  }));
  app.use(function(req, res, next) {
    res.locals.session = req.session;
    res.locals.flash = function() { return req.flash() };
    next();
  });
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.profiler.get);
app.post('/', routes.profiler.post);

//io.sockets.on('connection', sockets.validateServer);
sessionSockets.on("connection", sockets.validateServer);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
