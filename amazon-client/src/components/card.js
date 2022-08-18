import React from 'react';
import './card.css';
import Rating from '@material-ui/lab/Rating';
import { useStatevalue } from '../StateProvider';

function Card({ image, title, price, rating }) {
  const [{ basket }, dispatch] = useStatevalue();
  const addToBasket = (e) => {
    e.preventDefault();

    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        title,
        price,
        image,
        rating,
      },
    });
  };

  return (
    <div className="card-container">
      <div className="card-image">
        <img src={image} alt="" />
      </div>
      <div className="description">
        <h5>{title}</h5>
        <Rating
          name="half-rating-read"
          defaultValue={rating}
          precision={0.5}
          readOnly
        />
        <p>$ {price}</p>
        <button onClick={addToBasket}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Card;
