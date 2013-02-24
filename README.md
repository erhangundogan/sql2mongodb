# sql2mongodb (aka priceless)

### MS SQL Server - MongoDB export tool

MS SQL Server initialization and MongoDB export tool. It uses node.js and express for web server architecture; websocket(socket.io) and traditional http protocols, MSSQL connectivity with Tedious and MongoDb connectivity with Mongoose. MongoDB session management using as well. You can connect to MS SQL Server and query databases. When you are fine with the table or stored procedure, export it's structure and data to MongoDB server if you want. You can use nginx 1.3.13(latest) for WebSocket experience.

Project is under development.

### How to Install

```bash
npm install -d sql2mongodb
```

### How to use

```bash
node app.js
```

### Ajax usage
http://localhost:3000/old

### WebSocket usage
http://localhost:3000


### Troubleshooting
+ If you enter user and password correct you would see databases on combobox otherwise you may not able to connect to mssql server.
+ When you have selected database from combobox then you should write table in memo
+ stored procedures and query functionality is not implemented yet
+ mssql named instances not supported cause of tedious
+ Records begin id is line number, not a guid or something else
+ You may have timer display bug
+ You may experience slow transfer on windows platform after some period if you have a lot of records on mssql ( > 1 million )  


### Author

**Erhan Gundogan**

+ http://twitter.com/erhangundogan
+ http://github.com/erhangundogan
+ http://mass.io


License
---------------------

Copyright 2013 Erhan Gundogan

Licensed under the MIT License.