const mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/mediaDB';
const connect = mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true},);
const autoIncrement = require('mongoose-auto-increment');
const mongoosepaginate = require('mongoose-paginate');
//autoIncrement.initialize(mongoose.createConnection(url));// or
autoIncrement.initialize(mongoose.connection);

let Schema = mongoose.Schema;
// ************ Category Schema *********** //
let CatScheme = new Schema({
    id : {type:Number,required:true},
    name : {type:String,required:true},
    image : {type:String,required:true},
    since : {type:Date,required:true},
});
let Cat = mongoose.model('category',CatScheme); // create table
// ************ Product Schema *********** //
let ProductScheme = new Schema({
    cat_id : {type:Number,required:true},
      name : {type:String,required:true},
     price : {type:Number,required:true},
     image : {type:String,required:true},
     description : {type:String,required:true},
     since : {type:Date,required:true},
});
// make autoincrement use mongoose-auto-increatement
ProductScheme.plugin(autoIncrement.plugin,'product'); // product => table name
ProductScheme.plugin(mongoosepaginate); // pagination
let Product = mongoose.model('product',ProductScheme); // create products table

// ************ User Schema *********** //
let UserScheme = new Schema({
   name : {type:String,required:true},
   email : {type:String,required:true},
   password : {type:String,required:true},
   since : {type:Date,required:true},
});

let User = mongoose.model('user',UserScheme);

// ************ Gallergy Schema *********** //
let GalleryScheme = new Schema({
    name : {type:String,required:true}
});
GalleryScheme.plugin(autoIncrement.plugin,'gallery');
let Gallery = mongoose.model('gallery',GalleryScheme);


module.exports = {
    Cat,
    Product,
    User,
    Gallery
}