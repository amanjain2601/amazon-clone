import React from 'react';
import { useStatevalue } from '../StateProvider';
import Navbar from './navbar';
import './checkout.css';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';

function Checkout() {
  const [{ basket }, dispatch] = useStatevalue();

  const removeFromBasket = (e, id) => {
    e.preventDefault();

    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
  };

  return (
    <div className="checkout-container">
      <Navbar />
      <div className="main-container">
        <div className="shopping-cart">
          <h2>Shopping Cart</h2>
          {basket?.map((product) => {
            return (
              <div className="product">
                <div className="product-image">
                  <img src={product.image} alt="" />
                </div>
                <div className="description">
                  <h4>{product.title}</h4>
                  <p>$ {product.price}</p>
                  <button
                    onClick={(e) => removeFromBasket(e, product.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
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

          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
