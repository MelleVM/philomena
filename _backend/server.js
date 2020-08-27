const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const stripe = require('stripe')('sk_test_vdEzK9a3Ij0oy6gOP3e3PbGD00NErqLRyI');

const webpush = require('web-push')
const bodyParser = require('body-parser')

const path = require('path')

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client")))
app.use(bodyParser.json());

const publicVapidKey = "BGfm4sQHZAliz8fKXzab4hgWkYqmWYKUyJXcaTOxXzfRmioc2ooN1dPeyDulAC6NaNR_17-J3k9ORzIkOQlhvy4"
const privateVapidKey = "T-m3gTIKYl6TsAuyrPerdoA-w8x2rcSfkk6asGqjPY0"

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

// Subscribe route
app.post('/subscribe', (req, res) => {
  // Get pushSubscription Object
  const subscription = req.body

  // Send 201 - resource created
  res.status(201).json({})

  // Create payload
  const payload = JSON.stringify({ title: 'Push Test' })

  // Pass object into sendNotification
  webpush.sendNotification(subscription, payload).catch(err => console.error(err))
});

require('dotenv').config();
//


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
},
(err) => {
  if (err) throw err;
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const employeesRouter = require('./routes/employees');
const appointmentsRouter = require('./routes/appointments');
const productsRouter = require('./routes/products');
const exceptionsRouter = require('./routes/exceptions');

app.use('/users', usersRouter);
app.use('/employees', employeesRouter);
app.use('/appointments', appointmentsRouter);
app.use('/products', productsRouter);
app.use('/exceptions', exceptionsRouter);

app.get('/secret', async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    amount: 500,
    currency: 'eur',
    payment_method_types: ['ideal'],
  })
    res.json({
      client_secret: intent.client_secret
    });
});

 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

