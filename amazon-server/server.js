const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Products = require('./products');
const stripe = require('stripe')(
  'sk_test_51L71A9SJy80HPv0GrWRL2UDk1elNM4ljeCrpvKGj3f9HQniyjcsxLQEZVYrgruEVRt0WPdscMpv9qylesGkEeHI300BGkgPcg5'
);

const port = 8000;

app.use(express.json());
app.use(cors());

//connection URL
const connection_url =
  'mongodb+srv://aman:amanjain@cluster0.fpqki.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongodb connection successfull');
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('Hello world');
});

//add product
app.post('/products/add', (req, res) => {
  const productDetail = req.body;

  Products.create(productDetail, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send(data);
    }
  });
});

//api for payment
app.post('/payment/create', async (req, res) => {
  const total = req.body.amount;

  if (total >= 1) {
    const payment = await stripe.paymentIntents.create({
      amount: total,
      currency: 'inr',
      payment_method_types: ['card'],
    });

    res.status(201).send({
      clientSecret: payment.client_secret,
    });
  }
});

//get product
app.get('/products/get', (req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
