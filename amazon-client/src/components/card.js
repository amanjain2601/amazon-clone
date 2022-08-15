import React from 'react';
import './card.css';
import Rating from '@material-ui/lab/Rating';

function Card() {
  return (
    <div className="card-container">
      <div className="card-image">
        <img
          src="https://m.media-amazon.com/images/I/61MbLLagiVL._SL1000_.jpg"
          alt=""
        />
      </div>
      <div className="description">
        <h5>Echo Dot (4th Gen 2020 release)| Smart Speaker</h5>
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />
        <p>$ 3500</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default Card;
