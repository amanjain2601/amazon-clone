const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Products = require('./products');

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
