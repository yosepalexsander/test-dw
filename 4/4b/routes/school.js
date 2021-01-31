const express = require('express');
const dbConnection = require('../dbConnection');
const router = express.Router();

router.post('/create', (req, res) => {
  if (!req.session.userId) {
    res.redirect('/register');
  }
  const data = {
    NPSN: req.body.npsn,
    name_school: req.body.name_school,
    address: req.body.address,
    logo_school: req.body.logo_school,
    school_level: req.body.school_level,
    status_school: req.body.status_school,
    user_id: req.session.userId,
  }
  const sql = "INSERT INTO school_tb SET ?";
  dbConnection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT school_tb.id, user_tb.id  AS user_id, user_tb.name AS user_name, school_tb.name_school, school_tb.NPSN, school_tb.address, school_tb.logo_school, school_tb.school_level, school_tb.status_school FROM school_tb INNER JOIN user_tb ON user_tb.id = school_tb.user_id AND school_tb.id =" + id;
  dbConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.render('school-detail', { data: result[0] })
  });
});

router.post('/:id/update', (req, res) => {
  const id = req.params.id;
  const data = {
    NPSN: req.body.npsn,
    name_school: req.body.name_school,
    address: req.body.address,
    logo_school: req.body.logo_school,
    school_level: req.body.school_level,
    status_school: req.body.status.school,
    user_id: req.session.userId,
  }
  const sql = "UPDATE school_tb SET ? WHERE id=" + id + "AND user_id=" + req.session.userId;
  dbConnection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  })
})

router.delete('/:id/delete', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM school_tb WHERE id=" + id;
  dbConnection.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/')
  })
})

module.exports = router;