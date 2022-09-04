import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import './home.css';
import Card from './card';
import axios from '../axios';
import { useStatevalue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState('');
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStatevalue();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await axios.get('/products/get');

        setProducts(data);

        const userDetail = await axios.get('/userInfo/get');
        dispatch({
          type: 'SET_USER',
          userid: userDetail.data.email,
          basket: userDetail.data.basket,
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
