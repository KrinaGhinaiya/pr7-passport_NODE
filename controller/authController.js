const UserModel = require('../model/UserModel');
const blogModel = require('../model/blogModel');
const fs = require('fs');
const path = require("path")

const registerPage = (req, res) => {
    return res.render('register')
}

const registerrecord = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        await UserModel.create({
            name: name,
            email: email,
            password: password,
        })
        console.log("succesfully register");
        return res.redirect('/');

    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const loginPage = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    return res.render("login");
}

const loginrecord = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user || user.password != password) {
            console.log("Email and Password not valid");
            return res.redirect('/');
        }

        res.cookie('auth', user)
        return res.redirect('/dashboard')
    }
    catch (err) {
        console.log(err)
        return false;
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        return res.redirect("/");
    })
}

const dashboardPage = async (req, res) => {
    try {
        const category = req.query.category;
        let allblog;
        if (category && category !== 'All') {
            allblog = await blogModel.find({ category })
            return res.render('dashboard', { blogs: allblog })
        }
        else {
            allblog = await blogModel.find()
            return res.render('dashboard', { blogs: allblog })
        }
    } catch (error) {
        console.log(error);
        return false
    }
}


module.exports = { registerPage, loginPage, registerrecord, loginrecord, logout, dashboardPage }
