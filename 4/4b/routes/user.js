const express = require('express');
const dbConnection = require('../dbConnection');
const router = express.Router();

router.post('/create', (req, res) => {
  const data = {
    name: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  const sql = 'INSERT INTO user_tb SET ?';
  dbConnection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/')
  })
});

router.get('/:id', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;