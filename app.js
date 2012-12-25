
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure("development", function() {
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");
  app.set("view options", { layout: false }); // for extending jade blocks
  app.use(express.logger({ format: '\x1b[0;37m[:date] \x1b[0;32m:remote-addr \x1b[0;33m:method \x1b[0;30m:status \x1b[0;35m:response-time ms \x1b[0;36m:referrer \x1b[0;37m:url ' }));
  app.use(express.bodyParser({ uploadDir:"/tmp" }));
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use("/public", express.static(__dirname + "/public"));
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

app.get('/', routes.index);
app.post('/address', routes.addressPost);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
