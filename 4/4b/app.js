const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const pool = require('./helpers/db');

const PORT = process.env.PORT || 8080;

//routers
const userRouters = require('./routes/user');
const schoolRouters = require('./routes/school');

const app = express();

app.set('view engine', 'hbs'); // set view engine
// set view file
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
        title: function () { return "School Data"; },
        metaContent: function () { return "school database" },
        metaKeywords: function () { return "sekolah di Indonesia" },
        when: function (operand1, operator, operand2, opts) {
            const operators = {
                'eq': function (l, r) { return l === r; },
                'neq': function (l, r) { return l !== r; },
                'gt': function (l, r) { return Number(l) > Number(r); },
                'or': function (l, r) { return l || r; },
                'and': function (l, r) { return l && r; },
                '%': function (l, r) { return (l % r) === 0; }
            }
            const result = operators[operator](operand1, operand2);
            return (result) ? opts.fn(this) : opts.inverse(this);
        }
    }
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
    resave: false,
    saveUninitialized: true
}))
app.use('/static', express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    const sql = 'SELECT * FROM school_tb';
    pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(sql, (err, results) => {
            if (err) throw err;
            if (req.session.loggedIn) {
                res.render('home', {
                    result: results,
                    user: {
                        loggedIn: req.session.loggedIn,
                        id: req.session.userId,
                        name: req.session.username,
                    },
                    helpers: {
                        title: function () { return "School Data"; }
                    }
                })
            } else {
                res.render('home', {
                    result: results,
                    helpers: {
                        title: function () { return "School Data"; }
                    }
                })
            }
        })
        conn.release()
    })
})


//user
app.use('/user', userRouters);
// school 
app.use('/school', schoolRouters);

app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
});
