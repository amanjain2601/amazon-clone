import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import './home.css';
import Card from './card';
import axios from 'axios';
import { useStatevalue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState('');
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStatevalue();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await axios.get('/products/get');

        setProducts(data);

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
        console.log(err);
      }
    };

    fetchdata();
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <div className="banner-container">
        <img src="./banner.jpg" alt="" />
        <img src="mobile_banner.jpg" alt="" />
      </div>
      <div className="main">
        {products &&
          products?.data.map((product) => {
            return (
              <Card
                id={product._id}
                image={product.imageURL}
                price={product.price}
                rating={product.rating}
                title={product.title}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Home;
