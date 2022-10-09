const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Products = require('./products');
const Order = require('./order');
const User = require('./user');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authenticate = require('./middleware/authenticate');
const stripe = require('stripe')(
  'sk_test_51L71A9SJy80HPv0GrWRL2UDk1elNM4ljeCrpvKGj3f9HQniyjcsxLQEZVYrgruEVRt0WPdscMpv9qylesGkEeHI300BGkgPcg5'
);

const port = process.env.PORT || 8000;
const bcrypt = require('bcryptjs');

dotenv.config({ path: './config.env' });
app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      'https://amazon-backend-mern.herokuapp.com',
      'http://localhost:8000',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());

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

//register user
app.post('/register', async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;

  if (!userName || !email || !password || !confirmPassword) {
    return res.status(422).send({ error: 'Please fill the data correctly' });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(422).send({ error: 'Email already exist' });
    } else if (password !== confirmPassword) {
      return res.status(422).send({ error: 'Password is not matching' });
    } else {
      const initialBasket = [];
      const user = new User({
        userName,
        email,
        password,
        confirmPassword,
        initialBasket,
      });

      await user.save();
      res.status(201).send({ message: 'user created successfully' });
    }
  } catch (err) {
    console.log(err);
  }
});

//login user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: 'Please fill the data' });
  }

  try {
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();

      let expiryDate = new Date(Number(new Date()) + 315360000000);
      res.cookie('jwtoken', token, {
        expires: expiryDate,
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).send({ error: 'Invalid Credentials' });
      } else {
        res.status(202).send({ message: 'user signed in successfully' });
      }
    } else {
      res.status(400).send({ error: 'Invalid Credentials' });
    }
  } catch (err) {
    console.log(err);
  }
});

//logout user
app.post('/logout', async (req, res) => {
  try {
    const { basket, user } = req.body;
    res.clearCookie('jwtoken', { path: '/' });

    const userId = await User.findOne({ email: user });
    await userId.saveBasket(basket);

    res.status(200).send('User Logout');
  } catch (err) {
    console.log(err);
  }
});

app.post('/saveUserBasket', async (req, res) => {
  try {
    const { basket, user } = req.body;

    if (user) {
      const userId = await User.findOne({ email: user });
      await userId.saveBasket(basket);

      res.status(200).send(userId);
    }
  } catch (err) {
    console.log(err);
  }
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

//get products
app.get('/products/get', (req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//get user info
app.get('/userinfo/get', authenticate, async (req, res) => {
  res.send(req.rootUser);
});

//api to add order detail
app.post('/orders/add', (req, res) => {
  const products = req.body.basket;
  const price = req.body.price;
  const email = req.body.email;
  const address = req.body.address;

  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };

  Order.create(orderDetail, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

//get user order
app.post('/orders/get', (req, res) => {
  const email = req.body.email;

  Order.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      const userOrders = result.filter((order) => order.email === email);
      res.send(userOrders);
    }
  });
});

app.post('/getProductInfo', (req, res) => {
  const _id = req.body._id;

  Products.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      const productFound = result.find((product) => {
        let value = product._id.valueOf();
        if (value === _id) {
          return product;
        }
      });

      res.send(productFound);
    }
  });
});

app.post('/submitReview', async (req, res) => {
  const userId = await Products.findOne({ _id: req.body.productId });

  await userId.saveReview(req.body);

  res.status(200).send('Review successfully submitted');
});

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('amazon-client/build'));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './amazon-client/build/index.html'));
  });
}

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
