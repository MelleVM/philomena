const router = require('express').Router();
let Exception = require('../models/exception.model');

router.route('/').get((req, res) => {
    Exception.find()
        .then(exceptions => res.json(exceptions))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const dateFrom = req.body.dateFrom;
    const dateTo = req.body.dateTo;
    const title = req.body.title;

    const newException = new Exception({
        dateFrom,
        dateTo,
        title
    });

    newException.save()
        .then(() => res.json('Exception Created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Exception.findById(req.params.id)
        .then(exception => res.json(exception))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exception.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exception deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exception.findById(req.params.id)
        .then(exception => {
            exception.dateFrom = req.body.dateFrom;
            exception.dateTo = req.body.dateTo;
            exception.title = req.body.title;

            exception.save()
                .then(() => res.json('Exception updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;