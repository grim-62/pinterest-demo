var express = require('express');
var router = express.Router();
var userModel = require('./users');
var postModel = require('./posts');
const passport = require('passport');
const localStrategy = require("passport-local");

const upload = require('./multer');

passport.use(new localStrategy(userModel.authenticate()));

router.post('/register',(req,res,next)=>{
  var newUser = new userModel({
    fullname:req.body.fullname,
    username:req.body.username,
    gmail:req.body.gmail
  })
  userModel.register(newUser,req.body.password)
  .then(function(u){
      passport.authenticate('local')(req,res,function(){
      res.redirect('/profile');
    })
  })
  .catch(function(e){
    res.send(e)
  })
});

router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/',
  failureFlash:true
}),(req,res,next)=>{
});

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if (err) {return next (err);}
    res.redirect('/');
  })
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
};

router.get('/', function(req, res, next) {
  res.render('index',{error:req.flash('error')});
});

router.get('/ragisterpage', function(req, res, next){
  res.render('ragister');
});

router.get('/profile', isLoggedIn ,async function(req, res, next){
  var user = await userModel
    .findOne({username:req.session.passport.user})
    .populate('posts');
  await user.save()
  console.log(user)
  res.render('profile',{user});
});

router.get('/home', isLoggedIn ,async function(req, res, next){
  var user = await userModel.findOne({username:req.session.passport.user}).populate("posts");
  var post = await postModel.find()
  console.log(user)
  res.render('home',{user,post})
});

router.post('/upload',isLoggedIn,upload.single('image'),async (req,res,next)=>{
  if(!req.file){
    return res.status.send(400).send('no file were uploaded.');
  }
  const user = await userModel.findOne({ username:req.session.passport.user})
  const post = await postModel.create({
    image:req.file.filename,
    caption: req.body.caption,
    user: user._id,
  })
  user.posts.push(post._id);
  await user.save()
  res.send("file uploaded sucessfully!")
});

router.post('/prodile-dp',isLoggedIn,upload.single('profile'),async (req,res,next)=>{
  if(!req.file){
    return res.status.send(400).send('no file were uploaded.');
  }
  await userModel.updateOne({username:req.session.passport.user},{$set:{dp:req.file.filename}})
  res.redirect("/profile")
});

module.exports = router;
 
