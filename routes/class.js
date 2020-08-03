/*global handleError */
/*global next */

const express = require('express');

const router = express.Router();
const Student = require('../models/Student');
const Classes = require('../models/Classes');

// Class homepage
router.get('/', (req, res) => {
    Classes.find({}, (err, result) => {
        if (err) return handleError(err);
        res.render('class', { cdata: result, studs: result.sname });
    });
});

// add class
router.get('/add', (req, res, next) => {
    Student.find({}, (err, result) => {
        if (err) return handleError(err);
        console.log('result', result);
        res.render('addclass', { studentname: result });
    });
});

router.post('/add', (req, res, next) => {
    console.log(`Post a Class: ${JSON.stringify(req.body)}`);
    const clas = new Classes({
        cname: req.body.cname,
        desc: req.body.desc,
        sname: req.body.sname,
    });

    clas.save()
        .then((data) => {
            console.log(data);
            res.redirect('/class');
        }).catch((err) => {
            res.status(500).send({
                message: err.message,
            });
        });
});

// edit class
router.get('/edit/:id', (req, res, next) => {
    Classes.findOne({ _id: req.params.id }, (err, result) => {
        console.log('editdata', result);
        res.render('editclass', {
            id: result._id,
            cname: result.cname,
            desc: result.desc,
            sname: result.sname,
        });
    });
});

router.get('/edit/:id', (req, res, next) => {
    Student.find({}, (err, result) => {
        if (err) return handleError(err);
        console.log('result', result);
        res.render('editclass', { studname: result });
    });
});

router.put('/edit/:id', (req, res, next) => {
    console.log(req.params.id);
    const editClassData = {
        cname: req.body.cname,
        desc: req.body.desc,
        sname: req.body.sname,
    };

    Classes.findByIdAndUpdate({ _id: req.params.id }, editClassData, (err, result) => {
        if (err) throw err;
        console.log('item edited!');
        req.flash(
            'success_msg',
            'Data updated.',
        );
        res.json(result);
    });
});

//  delete item
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    console.log('param', id);
    Classes.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return next(err);
        res.json({
            message: 'deleted',
        });
    });
});

router.post('/studentDelete/:id', (req, res) => {
    const { id } = req.params;
    console.log('param', id);
    Classes.updateOne({ $pull: { studs: { _id: id } } },
        (err) => {
            if (err) return next(err);
            res.json({
                message: 'deleted',
            });
        });
});

module.exports = router;