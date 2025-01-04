const express = require('express');
const routes = express.Router();
const blogmodel = require("../model/blogModel")
const { blog, eat, relax, add, addRecord, view, deleteData, editData, updateRecord } = require('../controller/blogController');
const passport = require("passport");

// blogRoutes.get("/login",  passport.validateUser, addAdminPage)
// blogRoutes.get("/view", passport.validateUser, viewAllAdmins);

routes.get('/add', add);
routes.post('/addRecord', blogmodel.uploadImage, addRecord);
routes.get('/eat', eat);
routes.get('/relax', relax);

routes.get('/deleteData/:id', deleteData);

routes.get('/edit', editData);
routes.post('/update/:id', blogmodel.uploadImage, updateRecord)

routes.get('/travel', (req, res) => {
    return res.render("travel")
});


module.exports = routes;