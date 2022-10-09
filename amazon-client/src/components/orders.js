import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import './orders.css';
import { useStatevalue } from '../StateProvider';

function Orders() {
  const [{ user }, dispatch] = useStatevalue();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await fetch('/userInfo/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const userDetail = await result.json();

        dispatch({
          type: 'SET_USER',
          userid: userDetail.email,
          basket: userDetail.basket,
        });

        const res = await fetch('/orders/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userDetail.email,
          }),
        });

        const data = await res.json();

        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    };

    getOrders();
  }, []);

  return (
    <div className="order-container">
      <Navbar />
      <div className="main-order-container">
        <div className="order-box">
          <h2>Your Orders</h2>
          {orders.map((order) => {
            return (
              <div className="order-detail">
                <div className="order-address-container">
                  <h4>Shipping Address</h4>
                  <div>
                    <p>{order.address.fullName}</p>
                    <p>{order.address.phone}</p>
                    <p>{order.address.area}</p>
                    <p>{order.address.city}</p>
                    <p>{order.address.flat}</p>
                    <p>{order.address.state}</p>
                  </div>
                </div>
                <div className="order-basket">
                  <h4>Orders</h4>
                  <p>
                    Subtotal: $ <span>{order.price}</span>
                  </p>
                  {order.products.map((product) => {
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Orders;
