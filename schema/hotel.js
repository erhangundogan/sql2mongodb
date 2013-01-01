var mongoose   = exports.mongoose = require("mongoose"),
    mongodb    = require("mongoose/node_modules/mongodb"),
    Grid       = mongodb.Grid,
    GridStore  = mongodb.GridStore,
    utils      = require("../utils.js"),
    Schema     = exports.Schema = mongoose.Schema,
    ObjectId   = exports.ObjectId = Schema.ObjectId,
    ObjectID   = require("mongoose/node_modules/mongodb/node_modules/bson/lib/bson").ObjectID,
    Connection = exports.connection = mongoose.createConnection(settings.db.connection);

var HotelSchema = new Schema({
  "id":           { type:String, index:{unique:true} } ,
  "hotelname":    { type:String, index:true } , // gundogan.erhan
  "picture":      { type:String, index:true } ,
  "picture_grid": { type:ObjectId, index:true }
});