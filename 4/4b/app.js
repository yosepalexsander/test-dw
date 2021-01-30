const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const dbConnection = require('./dbConnection');
const app = express();
// set view engine
app.set('view engine', 'hbs');
// set view file

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'itssecretweapon',
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
  },
  resave: true,
  saveUninitialized: true
}))
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM school_tb';
  dbConnection.query(sql, (err, results) => {
    if (err) throw err;
    else if (req.session.loggedIn) {

      res.render('home', {
        result: results,
        user: {
          loggedIn: req.session.loggedIn,
          id: req.session.userId,
          name: req.session.username,
          email: req.session.email,
        }
      })
    } else {
      res.render('home', { result: results })
    }
  })
})

// user registration and login 

app.get('/register', (req, res) => {
  res.render('register.hbs');
});

app.post('/save', (req, res) => {
  const data = {
    name: req.body.username,
    email: req.body.email,
    password: req.body.registPassword
  }
  const sql = 'INSERT INTO user_tb SET ?';
  dbConnection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/')
  })
})

app.get('/login', (req, res) => {
  res.render('login')
});

app.post('/auth', (req, res) => {
  const userName = req.body.email;
  const password = req.body.password;
  const stmt = 'SELECT * FROM user_tb WHERE email = ? AND password = ?'
  dbConnection.query(stmt, [userName, password], (err, results) => {
    if (results.length > 0) {
      req.session.loggedIn = true;
      req.session.userId = results[0].id;
      req.session.username = results[0].name;
      req.session.email = results[0].email;
      res.redirect('/');
    } else {
      res.send('Incorrect Username and/or Password!');
    }
  })
})

// school 
app.use('/school/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT user_tb.id  AS user_id, user_tb.name AS user_name, school_tb.name_school, school_tb.NPSN, school_tb.address, school_tb.logo_school, school_tb.school_level, school_tb.status_school FROM school_tb INNER JOIN user_tb ON user_tb.id = school_tb.user_id AND school_tb.id =" + id;
  dbConnection.query(sql, (err, results) => {
    if (err) throw err;
    res.render('school-detail', { result: results })
  });
});
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});