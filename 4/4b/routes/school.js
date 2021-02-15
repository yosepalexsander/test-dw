const express = require('express');
const pool = require('../helpers/db');
const router = express.Router();
const { authenticateToken } = require('../middleware/jwt');

router.post('/', (req, res) => {
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
    pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(sql, data, (err, results) => {
            if (err) throw err;
            res.redirect('/');
        })
        conn.release();
    })
})

router.get('/:id', authenticateToken, (req, res) => {
    const sql = "SELECT school_tb.id, user_tb.id  AS user_id, user_tb.name AS user_name, school_tb.name_school, school_tb.NPSN, school_tb.address, school_tb.logo_school, school_tb.school_level, school_tb.status_school FROM school_tb INNER JOIN user_tb ON user_tb.id = school_tb.user_id AND school_tb.id =" + req.params.id;
    pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(sql, (err, result) => {
            if (err) throw err;
            // res.render('school-detail', {
            //     data: result[0],
            //     user: {
            //         loggedIn: req.session.loggedIn,
            //         id: req.session.userId,
            //         name: req.session.username,
            //     },
            // })
            res.json(result[0])
        });
        conn.release();
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
        status_school: req.body.status_school,
    }
    const sql = "UPDATE school_tb SET ? WHERE id= ? AND user_id= ?";
    pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(sql, [data, id, req.session.userId], (err, results) => {
            if (err) res.sendStatus(403);
            res.status(200).json({ message: 'Data has been updated successfully' });
        });
        conn.release();
    });
})

router.delete('/:id/delete', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM school_tb WHERE id = ? AND user_id = ? ";
    pool.getConnection((err, conn) => {
        conn.query(sql, [id, req.session.userId], (err, results) => {
            if (err) {
                res.status(500).send({ error: "Something failed!" });
                return
            }
            res.send({ message: 'Data has been deleted successfully' });
        })
        conn.release();
    })
})

module.exports = router;