import React from 'react';
import { useStatevalue } from '../StateProvider';
import Navbar from './navbar';
import './payment.css';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import { useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

function Payment() {
  const [{ basket, address }] = useStatevalue();

  const elements = useElements();
  const stripe = useStripe();

  const navigate = useNavigate();
  return (
    <div className="payment-container">
      <Navbar />
      <div className="payment-main-container">
        <div className="review-container">
          <h2>Review Your Order</h2>
          <div className="payment-address-container">
            <h5>Shipping Address</h5>
            <div>
              <p>{address.fullName}</p>
              <p>{address.flat}</p>
              <p>{address.area}</p>
              <p>{address.landmark}</p>
              <p>
                {address.city} {address.state}
              </p>

              <p>Phone: {address.phone}</p>
            </div>
          </div>
          <div className="payment-box">
            <h5>Payment Method</h5>
            <p>Card Details</p>
            <div>
              <CardElement />
            </div>
          </div>

          <div className="payment-order-container">
            <h5>Your Order</h5>
            <div>
              {basket?.map((product) => {
                return (
                  <div className="product">
                    <div className="product-image">
                      <img src={product.image} alt="" />
                    </div>
                    <div className="description">
                      <h4>{product.title}</h4>
                      <p>$ {product.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="subtotal-container">
          <div className="subtotal">
            <CurrencyFormat
              renderText={(value) => {
                return (
                  <>
                    <p>
                      Subtotal({basket.length} items ) :<strong>{value}</strong>
                    </p>
                    <small>
                      <input type="checkbox" />
                      <span>This order contains a gift</span>
                    </small>
                  </>
                );
              }}
              decimalScale={2}
              value={getBasketTotal(basket)}
              displayType="text"
              thousandSeparator={true}
              prefix={'$ '}
            />

            <button className="place-order-btn">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;