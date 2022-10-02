import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import { useStatevalue } from '../StateProvider';
import './productinfo.css';
import Rating from '@material-ui/lab/Rating';

function ProductInfo() {
  const [{ viewProduct }, dispatch] = useStatevalue();
  const [productDetail, setProductDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        if (viewProduct !== null) {
          const res = await fetch('/getProductInfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              _id: viewProduct,
            }),
          });

          const productInformation = await res.json();
          setProductDetail(productInformation);
          window.localStorage.setItem(
            'storedDetail',
            JSON.stringify(productInformation)
          );
        }

        if (Object.keys(localStorage['storedDetail'].length !== 0)) {
          setProductDetail(
            JSON.parse(window.localStorage.getItem('storedDetail'))
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchData = async () => {
      const res = await fetch('/userInfo/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const userDetail = await res.json();

      dispatch({
        type: 'SET_USER',
        userid: userDetail.email,
        basket: userDetail.basket,
      });
    };

    fetchData();

    getProductInfo();
  }, []);

  return (
    <div className="product-info-container">
      <Navbar />
      <div className="product-info-image">
        <img src={productDetail.imageURL} alt="" />
      </div>

      <h3>{productDetail.title}</h3>
      <div className="product-info-rating">
        <Rating
          name="half-rating-read"
          value={productDetail.rating ? productDetail.rating : 0}
          precision={0.5}
          readOnly
        />
      </div>

      <h3 className="product-info-price">$ {productDetail.price}</h3>

      <div className="reviews-container">
        <div className="review-heading">
          <h3>Ratings & Reviews</h3>
          <button
            className="review-product-button"
            onClick={() => navigate('/review')}
          >
            Review Product
          </button>
        </div>

        {productDetail.reviews?.map((reviewInfo) => {
          return (
            <div className="user-reviews">
              <div className="rating-box">
                <p
                  className={
                    reviewInfo.rating > 2
                      ? reviewInfo.rating > 4
                        ? 'green'
                        : 'yellow'
                      : 'red'
                  }
                >
                  {reviewInfo.rating}
                </p>
                <Rating
                  name="half-rating-read"
                  value={reviewInfo.rating ? reviewInfo.rating : 0}
                  precision={0.5}
                  readOnly
                />
              </div>

              <p className="customer-review">{reviewInfo.descripton}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductInfo;
