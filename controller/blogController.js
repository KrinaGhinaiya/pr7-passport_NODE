const UserModel = require('../model/UserModel');
const blogModel = require('../model/blogModel');
const fs = require('fs');
const path= require("path")

const registerPage = (req,res) =>{
    return res.render('register')
}

const loginPage = (req,res) =>{
    if(req.isAuthenticated()){
        return res.redirect("/dashboard");
    }
    return res.render("login");
}

const dashboardPage = (req,res) =>{
    return res.render("dashboard");
}

const registerrecord = async (req,res) =>{
    try{
       const {name,email,password} = req.body;

     await UserModel.create({
        name:name,
        email:email,
        password:password,
       })
       console.log("succesfully register");
       return res.redirect('/');
       
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const loginrecord = async (req,res) =>{
    try{
       const  {email,password} = req.body;
       const user = await UserModel.findOne({email:email});
       if(!user || user.password != password){
        console.log("Email and Password not valid");
        return res.redirect('/');
       }

       res.cookie('auth',user)
       return res.redirect('/dashboard')
    }
    catch(err){
        console.log(err)
        return false;
    }
};

const logout = (req,res) => {
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }
        return res.redirect("/");
    })
}

const blog = (req,res) =>{
    // if(!req.cookies['auth']){
    //     return res.redirect('/')
    // }
    // return res.render('blog')
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    return res.render("blog");
}

const eat = (req,res) =>{
    // if(!req.cookies['auth']){
    //     return res.redirect('/')
    // }
    // return res.render('eat')
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    return res.render("eat");
}

const relax = (req,res) =>{
    // if(!req.cookies['auth']){
    //     return res.redirect('/')
    // }
    // return res.render('relax')
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    return res.render("relax");
}

const add = (req,res) =>{
    // if(!req.cookies['auth']){
    //     return res.redirect('/')
    // }
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    console.log("Add route accessed"); 
     
    return res.render('add')
}

const addRecord = async(req,res) =>{
    // try {
    //     const {title,content} = req.body;

    //     await blogModel.create({
    //         title:title,
    //         content:content,
    //         image:req.file.path,
    // })
    // console.log("Blog add Sucssefull");
    // return res.redirect('/view');
        
    // } catch (err) {
    //     console.log(err);
    //     return false
    // }

    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/blogs/${req.file.filename}`
        }
        req.body.image = imagePath;

        let newAdmin = await blogModel.create(req.body);
        if (newAdmin) {
            console.log("New Blog Added...");
            return res.redirect("/view")
        } else {
            console.log("Somthing Wrong...");
            return res.redirect("back")
        }

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

const view= async (req, res)=>{
    try {
        let blogs = await blogModel.find({});
        const category = req.query.category;
        let allblog;
        if(category && category!=='All')
        {
            allblog=await blogModel.find({category})
        }
        else{
            allblog=await blogModel.find()
        }

        return res.render('view',{blogs: allblog })
        
    } catch (error) {
        console.log(error);
        return false
        
    }
}

const deleteData = async(req,res) =>{
    let rec = await blogModel.findById(req.params.id);
    console.log(rec);
    if(rec){
        try {
            let imagepath = path.join(__dirname, "..", rec.image)
        // console.log(imagepath);
        await fs.unlinkSync(imagepath);
        } catch (error) {
            console.log(error)
        }
        await blogModel.findByIdAndDelete(req.params.id);
        console.log("Delete Success");
        return res.redirect('/view');
    }else{
        console.log('Somthing Wrong');
        return res.redirect('/view');
    }
}

const editData = async (req,res) =>{
    try {
        let id = req.query.id;
        let blog = await blogModel.findById(id);
        return res.render('edit',{ blog
        })
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateRecord = async(req,res) => {
    try {
        let record = await blogModel.findById(req.params.id);
        if (record) {
            if (req.file) {
                let imagePath = record.image;
                if (imagePath != "") {
                    imagePath = path.join(__dirname, "..", imagePath);
                    try {
                        await fs.unlinkSync(imagePath);
                    } catch (error) {
                        console.log("File Missing....");
                    }
                }
                let newImagepath = `/uploads/blogs/${req.file.filename}`;
                req.body.image = newImagepath
            } else {
                req.body.image = record.image
            }
            await blogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            console.log("Update Record Success...");
            return res.redirect("/dashboard")
        } else {
            console.log("Record not Found...")
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports = {
    registerPage ,loginPage , dashboardPage , registerrecord , loginrecord , logout , blog , eat , relax , add , addRecord , view , deleteData , editData , updateRecord
}
