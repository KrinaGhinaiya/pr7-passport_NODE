const UserModel = require('../model/UserModel');
const blogModel = require('../model/blogModel');
const fs = require('fs');
const path = require("path")

const add = (req, res) => {
    return res.render('add')
}

const addRecord = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/blogs/${req.file.filename}`
        }
        req.body.image = imagePath;

        let newAdmin = await blogModel.create(req.body);
        if (newAdmin) {
            console.log("New Blog Added...");
            return res.redirect("/dashboard")
        } else {
            console.log("Somthing Wrong...");
            return res.redirect("back")
        }

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

const eat = (req, res) => {
    // if(!req.cookies['auth']){
    //     return res.redirect('/')
    // }
    // return res.render('eat')
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return res.render("eat");
}

const relax = (req, res) => {
    // if(!req.cookies['auth']){
    //     return res.redirect('/')
    // }
    // return res.render('relax')
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return res.render("relax");
}

const deleteData = async (req, res) => {
    let rec = await blogModel.findById(req.params.id);
    if (rec) {
        try {
            await blogModel.findByIdAndDelete(req.params.id);
            console.log("Delete Success");
            return res.redirect('/dashboard');
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log("Blog Not Found");
        return res.redirect('back');
    }
}

const editData = async (req, res) => {
    try {
        let id = req.query.id;
        let blog = await blogModel.findById(id);
        return res.render('edit', {
            blog
        })

    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateRecord = async (req, res) => {
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

module.exports = { eat, relax, add, addRecord, deleteData, editData, updateRecord }
