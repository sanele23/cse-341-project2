const mongodb = require('./data/database');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;


const port = process.env.PORT || 3000;
const app = express();

app
.use(bodyParser.json())
.use(session({
  secret: "secret",
  resave:false,
  saveUninitialized: true,
}))
.use(passport.initialize())
.use(passport.session())

// allow passport to use "express-session"
// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
      'Origin, X-Requested-Width, Content-Type, Accept, Z-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Routes
app.use('/', require('./routes'));

//Github auth
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
      return done(null, profile)
  }));


passport.serializeUser((user, done) => {
  done(null, user)
});
passport.deserializeUser((user, done) => {
  done(null, user)
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out') })

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/')
    })

// Error handling
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.id, `Caught Exception: ${err}\n` + `Exception origin: ${origin}`);
});


// wrap
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and Running on port ${port}`);
    });
  }
});
