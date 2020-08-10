const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/add', (req, res, next) => {
    console.log('Post a User: ' + JSON.stringify(req.body))
    let student = new Student({
        fname: req.body.fname,
        lname: req.body.lname,
        semail: req.body.semail,
        sphone: req.body.sphone,
        saddress: req.body.saddress
    });

    student.save()
        .then(data => {
            console.log(data);
            res.redirect('/students');
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
});


router.get('/', (req, res, next) => {
    Student.find({}, function(err, result) {
        if (err) return handleError(err);
        res.render('students', { sdata: result })
    })
});

router.get('/add', (req, res, next) => {
    res.render('addstudent');
});

router.get('/edit/:id', function(req, res, next) {

    Student.findOne({ _id: req.params.id }, function(err, data) {
        res.render('edit', { student: data });
    });
});

router.put('/edit/:id', function(req, res, next) {
    console.log(req.params.id);
    let editformdata = {
        fname: req.body.fname,
        lname: req.body.lname,
        semail: req.body.semail,
        sphone: req.body.sphone,
        saddress: req.body.saddress
    }

    Student.findByIdAndUpdate({ _id: req.params.id }, editformdata, function(err, result) {
        if (err) throw err;
        console.log("item edited!");
        req.flash(
            'success_msg',
            'Data updated.'
        );
        res.json(result);

    });
});


router.delete('/delete/:id', function(req, res) {
    let id = req.params.id;
    console.log('param', id);
    Student.deleteOne({ _id: req.params.id }, function(err) {
        if (err) return next(err);
        res.json({
            message: "deleted"
        });
    })
});

module.exports = router;