const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const keys = require('./config/keys');
mongoose.connect('mongodb://shubham:shubham123@ds018168.mlab.com:18168/nn-outh-test', () => {
  console.log('connected to mongodb');
})

mongoose.Promise = global.Promise;

const routes = {
  expense : require('./routes/expense'),
  loan    : require('./routes/loan'),
  saving  : require('./routes/saving'),
  user    : require('./routes/user'),
  auth  : require('./routes/oauth')
}

const corsOptions = {
	origin: (origin, cb) => cb(null, true),
	exposedHeaders: true,
	credentials: true
};

const bodyParser = require('body-parser');
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 7200000,
  keys: [keys.session.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', routes.auth);
// app.use((req, res, next) => {
//   if(req.user){
//     next();
//   }else{
//     res.send('user not logged in');
//   }
// })
app.use('/expense', routes.expense);
app.use('/user', routes.user);
app.use('/loan', routes.loan);
app.use('/saving', routes.saving);
app.listen(5000 , () => console.log('listening on port 5000'));
