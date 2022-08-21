import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import './home.css';
import Card from './card';
import axios from '../axios';

function Home() {
  const [products, setProducts] = useState('');

  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get('/products/get');
      setProducts(data);
    };

    fetchdata();
  });

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
