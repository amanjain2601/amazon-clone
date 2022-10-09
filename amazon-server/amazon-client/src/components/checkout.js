import React, { useEffect } from 'react';
import { useStatevalue } from '../StateProvider';
import Navbar from './navbar';
import './checkout.css';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkout() {
  const [{ basket, user }, dispatch] = useStatevalue();
  const navigate = useNavigate();

  const clickCheckoutButton = () => {
    console.log(user);
    if (!user) {
      navigate('/login');
    } else {
      navigate('/address');
    }
  };

  const removeFromBasket = async (e, id) => {
    e.preventDefault();

    await dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });

    const index = basket.findIndex((basketItem) => basketItem.id === id);

    basket.splice(index, 1);

    if (!user) {
      window.localStorage.setItem('storedBasket', JSON.stringify(basket));
    }

    await axios.post('/saveUserBasket', {
      basket,
      user,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (err) {
        if (Object.keys(localStorage['storedBasket'].length !== 0)) {
          dispatch({
            type: 'SET_USER',
            userid: '',
            basket: JSON.parse(window.localStorage.getItem('storedBasket')),
          });
        }
      }
    };

    fetchData();
  }, []);

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

          <button onClick={clickCheckoutButton} className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
