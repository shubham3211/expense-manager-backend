const route = require('express').Router();
let user = require('../database/models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
  console.log('serializing');
  done(null, user.id);
})

passport.deserializeUser((userId, done) => {
  console.log('deserializing')
  user.findById(userId)
    .then((data) => {
      if(!data){
        done(new Error('no such user'))
      }
      done(null, data);
    }).catch((err) => {
      done(err);
    })
})

passport.use(new LocalStrategy(function(username, password, done) {
  user.findOne({email: username}, function(err, currentUser) {
    if(err) { return done(err);}
    if(!currentUser){
      return done(null, false);
    }
    if(!currentUser.comparePassword(password, currentUser.password)) {
      return done(null, false)
    }
    return done(null, currentUser);
  })
}))

route.post('/signup', (req, res) => {
  user.findOne({email: req.body.email})
    .then((currentUser) => {
      if(currentUser) {
        res.status(500).send('Email already exist with a account')
      }else{
        let record =  new user();
        record.email = req.body.email;
        record.password = record.hashPassword(req.body.password);
        record.name = req.body.name;
        record.save()
          .then((data) => res.send({userId: data._id, email: data.email, name: data.name}))
      }
    }).catch(err => console.log(err))
})

route.post('/login', passport.authenticate('local'), function(req, res) {
  console.log(req.user);
  res.send({email: req.user.email, userId: req.user._id});
})

module.exports = route;