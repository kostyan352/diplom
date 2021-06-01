const { Router } = require('express')
const mongoose = require('mongoose')
const router = Router()
const Person = require('../models/person')


router.post('/MD', (req, res) => {
    Person.find()
    .populate('Name')
    .exec()
    .then(docs => {
        // console.log(docs);
        res.status(200).send(docs)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
})

// получение всех
router.get('/', (req, res) => {
    Person.find()
    .exec()
    .then(docs => {
        // console.log(docs);
        res.status(200).send(docs)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
})
// findone
router.post('/one', (req, res) => {
    Person.findOne({ name: 'test'})
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).send(docs)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
})
// по ID
router.post('/new/:PersonId', (req, res) => {
    const id = req.params.PersonId;
    Person.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err})
    })
})

// отправить нового человека
router.post('/new', (req, res) => {
    const person = new Person({
        Name: req.body.Name,
        ipPhone: req.body.ipPhone,
        OfficePhone: req.body.OfficePhone,
        Title: req.body.Title,
        FIO: req.body.FIO,
        MDepart: req.body.MDepart,
        Depart: req.body.Depart,
    });
    person.save();
    res.status(201).json({
        message: "POST DONE"
    })
}
)
module.exports = router