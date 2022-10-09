import React, { useEffect } from 'react';
import './card.css';
import Rating from '@material-ui/lab/Rating';
import { useStatevalue } from '../StateProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Card({ id, image, title, price, rating }) {
  const [{ basket, user }, dispatch] = useStatevalue();
  const navigate = useNavigate();

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

    if (!user) {
      window.localStorage.setItem('storedBasket', JSON.stringify(basket));
    }

    axios.post('/saveUserBasket', {
      basket,
      user,
    });
  };

  const seeProductInfo = () => {
    dispatch({
      type: 'VIEW_PRODUCT',
      id: id,
    });

    navigate('/prodInfo');
  };

  return (
    <div className="card-container">
      <div className="card-image" onClick={seeProductInfo}>
        <img src={image} alt="" />
      </div>
      <div className="prod-description">
        <h5 onClick={seeProductInfo}>{title}</h5>
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
