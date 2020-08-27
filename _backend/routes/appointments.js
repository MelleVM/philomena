const router = require('express').Router();
let Appointment = require('../models/appointment.model');

router.route('/').get((req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const date = req.body.date;
    const fullDate = req.body.fullDate;
    const fullDateEnd = req.body.fullDateEnd;
    const timeFrom = req.body.timeFrom;
    const timeTo = req.body.timeTo;
    const productId = req.body.productId;
    const userId = req.body.userId;

    const newAppointment = new Appointment({date, fullDate, fullDateEnd, timeFrom, timeTo, productId, userId});

    newAppointment.save()
        .then(() => res.json('Appointment Created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment => res.json(appointment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Appointment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment => {
      appointment.date = req.body.date;
      appointment.fullDate = req.body.fullDate;
      appointment.fullDateEnd = req.body.fullDateEnd;
      appointment.timeFrom = req.body.timeFrom;
      appointment.timeTo = req.body.timeTo;
      appointment.productId = req.body.productId;
      appointment.userId = req.body.userId;

      appointment.save()
        .then(() => res.json('Appointment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;