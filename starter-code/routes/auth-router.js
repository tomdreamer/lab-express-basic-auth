const express = require("express");
const bcryptjs = require("bcryptjs");

const User= require("../models/user-model.js");

const router= express.Router();

router.get("/signup", (req,res,next)=>{
    res.render("auth-views/signup-form.hbs");
})

router.post("/process-signUp", (req, res, next)=>{
    const {userName, signUpPassword}= req.body;

    const encryptedPassword = bcryptjs.hashSync(signUpPassword, 10); 
    
    
    User.create({userName,  encryptedPassword})
    .then(()=>{
        res.redirect("/");
    })
    .catch(() => { 
        res.redirect("/signup")});
});

router.get("/login", (req,res, next)=>{
    res.render("auth-views/login-form.hbs");
  })
  
    router.post("/process-login", (req, res, next)=>{
    const {userName, signUpPassword} = req.body;

    User.findOne({userName :{$eq: userName} })
    .then(userDoc => {
      if(!userDoc){
      req.flash("error", "User name is incorrect!");
  
        res.redirect("/login");
        return;
      }
      
      const {encryptedPassword} = userDoc;
  
      if(!bcryptjs.compareSync(signUpPassword, encryptedPassword)){
    req.flash("error", "Password is incorrect");
        res.redirect("/login");
        return;
      }
      req.flash("success", "Log in success!");
      res.redirect("/");
  
    })
    .catch(err => next(err));
  })


module.exports = router;