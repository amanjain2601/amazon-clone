import axios from 'axios';
import React, { useState } from 'react';
import './addproduct.css';

function Addproduct() {
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);

  const addProduct = (e) => {
    e.preventDefault();

    axios
      .post('/products/add', {
        title,
        imageURL,
        price,
        rating,
      })
      .then(() => {
        setTitle('');
        setImageURL('');
        setPrice(0);
        setRating(0);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="./amazon_logo.png" alt="" />
      </div>

      <form className="addprod-form">
        <h3>Add Product</h3>
        <div className="input-container">
          <p>Title</p>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="input-container">
          <p>ImageURL</p>
          <input
            type="text"
            onChange={(e) => setImageURL(e.target.value)}
            value={imageURL}
          />
        </div>

        <div className="input-container">
          <p>Price</p>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>

        <div className="input-container">
          <p>Rating</p>
          <input
            type="number"
            onChange={(e) => setRating(e.target.value)}
            value={rating}
          />
        </div>

        <button onClick={addProduct}>Add Product</button>
      </form>
    </div>
  );
}

export default Addproduct;
