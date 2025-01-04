const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const blogmodel= require("../model/blogModel")
const passport = require("passport");
const routes = express.Router();

const { loginPage, registerPage, dashboardPage, registerrecord, loginrecord, logout, blog, eat, relax, add, addRecord, view, deleteData, editData, updateRecord } = require('../controller/blogController');


// blogRoutes.get("/login",  passport.validateUser, addAdminPage)
// blogRoutes.get("/view", passport.validateUser, viewAllAdmins);

routes.get('/' , loginPage);
routes.get('/register',registerPage);
routes.get('/dashboard' , dashboardPage);
routes.post('/registerrecord',registerrecord);
routes.post('/loginrecord',loginrecord);
routes.get('/logout',logout);
routes.get('/blog',blog);
routes.get('/eat',eat);
routes.get('/relax',relax);
routes.get('/add', add);
routes.post('/addRecord', blogmodel.uploadImage,addRecord);
routes.get('/view',view);
routes.get('/deleteData/:id',deleteData);
routes.get('/edit',editData);
routes.get('/travel',(req,res)=>{
    return res.render("travel")
});

routes.post('/update/:id', blogmodel.uploadImage, updateRecord)

module.exports = routes;