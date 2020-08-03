const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Classes = require('../models/Classes');
const { ensureAuthenticated } = require('../config/auth')

router.get('/', (req, res, next) => {
    Classes.find({}, function(err, result) {
        if (err) return handleError(err);
        res.render('class', { cdata: result, studs: result.sname })
    })
});

router.get('/add', (req, res, next) => {
    Student.find({}, function(err, result) {
        if (err) return handleError(err);
        console.log('result', result);
        res.render('addclass', { studentname: result });
    })
});

/*
router.post('/add', (req, res, next) => {
    console.log('Class: ' + JSON.stringify(req.body))
    let clas = new Classes({
        cname: req.body.cname,
        desc: req.body.desc
    });

    //clas.studs.push({ sname: req.body.sname });
    // let subdoc = clas.studs;
    //console.log('subdoc', subdoc) // { _id: '

    console.log('clas details:', clas);
    clas.save()
        .then(data => {
            console.log(data);
            res.redirect('/class');
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });

});
*/

router.post('/add', (req, res, next) => {
    Classes.updateOne({ cname: req.body.cname, desc: req.body.desc }, { $push: { studs: { $each: [{ 'sname': req.body.sname }] } } }, { upsert: true },
        function(err, usr) {
            console.log('err', err);
            res.redirect('/class');
        });
});


/*
  let post2 = {
        $push: { studs: { $each: [{ 'sname': req.body.sname }] } }
    };
*/

router.get('/edit/:id', function(req, res, next) {
    Classes.findOne({ _id: req.params.id }, function(err, result) {
        console.log('editdata', result);
        res.render('editclass', {
            id: result._id,
            cname: result.cname,
            desc: result.desc,
            studs: result.studs
        });
    });
});

router.get('/edit/:id', function(req, res, next) {
    Student.find({}, function(err, result) {
        if (err) return handleError(err);
        console.log('result', result);
        res.render('editclass', { editnames: result });
    })
});


router.put('/edit/:id', function(req, res, next) {
    console.log(req.params.id);
    let editClassData = {
        cname: req.body.cname,
        desc: req.body.desc,
        sname: req.body.sname
    }

    Classes.findByIdAndUpdate({ _id: req.params.id }, editClassData, function(err, result) {
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
    Classes.deleteOne({ _id: req.params.id }, function(err) {
        if (err) return next(err);
        res.json({
            message: "deleted"
        });
    })
});


router.post('/studentDelete/:id', function(req, res) {
    let id = req.params.id;
    console.log('param', id);
    Classes.updateOne({ $pull: { 'studs': { _id: id } } },
        function(err) {
            if (err) return next(err);
            res.json({
                message: "deleted"
            });
        });

});


module.exports = router;


// 2nd

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Classes = require('../models/Classes');
const { ensureAuthenticated } = require('../config/auth')

// Class homepage
router.get('/', (req, res, next) => {
    Classes.find({}, function(err, result) {
        if (err) return handleError(err);
        res.render('class', { cdata: result, studs: result.sname })
    })
});

// add class
router.get('/add', (req, res, next) => {
    Student.find({}, function(err, result) {
        if (err) return handleError(err);
        console.log('result', result);
        res.render('addclass', { studentname: result });
    })
});


router.post('/add', (req, res, next) => {
    Classes.updateOne({ cname: req.body.cname, desc: req.body.desc }, { $push: { studs: { $each: [{ 'sname': req.body.sname }] } } }, { upsert: true },
        function(err, usr) {
            console.log('err', err);
            res.redirect('/class');
        });
});

//edit class
router.get('/edit/:id', (req, res, next) => {
    Classes.findOne({ _id: req.params.id }, (err, result) => {
        console.log('editdata', result);
        res.render('editclass', {
            id: result._id,
            cname: result.cname,
            desc: result.desc,
            studs: result.studs
        });
    });
});

router.get('/edit/:id', (req, res, next) => {
    Student.find({}, (err, result) => {
        if (err) return handleError(err);
        console.log('result', result);
        res.render('editclass', { studname: result });
    })
});


router.put('/edit/:id', function(req, res, next) {
    console.log(req.params.id);
    let editClassData = {
        cname: req.body.cname,
        desc: req.body.desc,
        sname: req.body.sname
    }

    Classes.findByIdAndUpdate({ _id: req.params.id }, editClassData, function(err, result) {
        if (err) throw err;
        console.log("item edited!");
        req.flash(
            'success_msg',
            'Data updated.'
        );
        res.json(result);

    });
});

//  delete item
router.delete('/delete/:id', function(req, res) {
    let id = req.params.id;
    console.log('param', id);
    Classes.deleteOne({ _id: req.params.id }, function(err) {
        if (err) return next(err);
        res.json({
            message: "deleted"
        });
    })
});


router.post('/studentDelete/:id', function(req, res) {
    let id = req.params.id;
    console.log('param', id);
    Classes.updateOne({ $pull: { 'studs': { _id: id } } },
        function(err) {
            if (err) return next(err);
            res.json({
                message: "deleted"
            });
        });

});


module.exports = router;