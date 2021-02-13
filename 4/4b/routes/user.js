const e = require('express');
const express = require('express');
const pool = require('../helpers/db');
const router = express.Router();
const encrypt = require('../helpers/encryption');

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.get('/:id', (req, res) => {
    res.sendStatus(200);
});

router.post('/', async (req, res) => {
    const encryptPass = await encrypt.hash(req.body.password);
    const data = {
        name: req.body.username,
        email: req.body.email,
        password: encryptPass
    }
    console.log(data)
    const sql = 'INSERT INTO user_tb SET ?';
    pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(sql, data, (err, results) => {
            if (err) throw err;
            res.redirect('/')
            console.log('register succes')
        })
        conn.release()
    })
});

router.post('/auth', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sql = 'SELECT * FROM user_tb WHERE email = ?';
    pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(sql, [email], async (err, results) => {
            const macthing = await encrypt.authentication(password, results[0].password)
            if (results.length > 0 && macthing) {
                req.session.loggedIn = true;
                req.session.userId = results[0].id;
                req.session.username = results[0].name;
                req.session.email = results[0].email;
                res.redirect(301, '/');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
        })
        conn.release()
    })
});


module.exports = router;