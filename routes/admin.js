let multer  = require('multer');
var storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, './asset/upload')
     },
     filename: function (req, file, cb) {
       cb(null, Date.now() +'_'+ file.originalname)
     }
   })
var upload = multer({ storage: storage }); 
let Gallery = require('../database/gallery');
let Product = require('../database/product');
let Cat = require('../database/cat');
module.exports = (express,passport) => {
     let router = express.Router();
       // single image upload
      router.get('/image/upload',passport.authenticate('jwt', { session: false }),upload.single('image'),(req,res,next)=>{
           let obj = {name:req.file.filename};                      
           Gallery.save(obj)
           .then(img=>{
             res.json({success:true,data:img});
           })
           .catch(err=> res.json({success:false,data:'image save fail!'}));
          
      });
      // get product with paginate
      router.get('/product/:start/:count',passport.authenticate('jwt', { session: false }),(req,res)=>{
          let start = req.param('start'); // string
          let count = req.param('count'); // string change number
          Product.paginate(Number(start),Number(count))
          .then(product=>{
               res.json({success:true,data:product})
          })
          .catch(err=>res.json({success:false,data:err}))
      });
      // get category
      router.get('/cats/all',passport.authenticate('jwt', { session: false }),(req,res)=>{
           Cat.all()
           .then(cat=>res.json({success:true,data:cat}))
           .catch(err=>res.json({success:false,data:err}))
      });
      // get gallery
      router.get('/gallery/all',passport.authenticate('jwt',{session:false}),(req,res)=>{
           Gallery.all()
           .then(img=>res.json({success:true,data:img}))
           .catch(err=>res.json({success:false,data:err}))
      });
      // create product
      router.post('/product/create',passport.authenticate('jwt',{session:false}),(req,res)=>{

           let saveProduct = {
                cat_id : req.body.cat_id,
                name : req.body.name,
                price : req.body.price,
                image : req.body.image,
                description : req.body.description
           };
          Product.save(saveProduct)
         .then(product=>res.json({success:true,data:product}))
         .catch(err=>res.json({success:false,data:err}))
      });
     return router;
}