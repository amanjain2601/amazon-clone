const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const port = 3001;

app.use(express.json());
app.use(cors());

//connection URL
const connection_url =
  'mongodb+srv://aman:amanjain@cluster0.fpqki.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
