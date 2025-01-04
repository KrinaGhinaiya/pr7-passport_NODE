const mongoose = require('mongoose');
const multer = require('multer');
const path= require("path")

const blogSchema =  mongoose.Schema({
      title:{
        type:String,
        require:true,
      },
      category:{
        type:String,
        require:true,
      },
      content:{
        type:String,
        require:true,
      },

      image:{
        type:String,
        require:true,
      },
});



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "..", "uploads/blogs"));
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname+"-"+Date.now());
  }
});

// const fileUpload = multer({storage:storage}).single("image");

blogSchema.statics.uploadImage = multer({storage: storage}).single('image');

const blog = mongoose.model('blog',blogSchema);

module.exports = blog;