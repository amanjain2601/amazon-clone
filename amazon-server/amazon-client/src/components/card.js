import React, { useEffect } from 'react';
import './card.css';
import Rating from '@material-ui/lab/Rating';
import { useStatevalue } from '../StateProvider';
import axios from 'axios';

function Card({ id, image, title, price, rating }) {
  const [{ basket, user }, dispatch] = useStatevalue();
  const addToBasket = async (e) => {
    e.preventDefault();

    await dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id,
        title,
        price,
        image,
        rating,
      },
    });

    basket.push({ id, title, price, image, rating });

    console.log(basket);

    axios.post('/saveUserBasket', {
      basket,
      user,
    });
  };

  return (
    <div className="card-container">
      <div className="card-image">
        <img src={image} alt="" />
      </div>
      <div className="prod-description">
        <h5>{title}</h5>
        <Rating
          name="half-rating-read"
          defaultValue={rating}
          precision={0.5}
          readOnly
        />
        <p>$ {price}</p>
        <button className="add-btn" onClick={addToBasket}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
