import React, { useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import './reviewProduct.css';
import { useNavigate } from 'react-router-dom';

function ReviewProduct() {
  const [reviewProduct, setReviewProduct] = useState({});
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const submitReview = async (e) => {
    e.preventDefault();
    let select = document.getElementById('rate-product');
    let value = Number(select.options[select.selectedIndex].value);

    try {
      const result = await fetch('/submitReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: value,
          review: description,
          productId: reviewProduct._id,
        }),
      });

      navigate('/prodInfo');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setReviewProduct(JSON.parse(window.localStorage.getItem('storedDetail')));
  }, []);
  return (
    <div className="review-container-box">
      <div className="review-prod-image">
        <img src={reviewProduct.imageURL} alt="" />
      </div>
      <h3>{reviewProduct.title}</h3>
      <div className="review-prod-rating">
        <Rating
          name="half-rating-read"
          value={reviewProduct.rating ? reviewProduct.rating : 0}
          precision={0.5}
          readOnly
        />
      </div>
      <form>
        <select id="rate-product">
          <option value="1">Poor</option>
          <option value="2">Bad</option>
          <option value="3">Average</option>
          <option value="4">Good</option>
          <option value="5">Excellent</option>
        </select>

        <div className="review-description">
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write Product review here..."
          />
        </div>
        <button onClick={submitReview}>Submit</button>
      </form>
    </div>
  );
}

export default ReviewProduct;
