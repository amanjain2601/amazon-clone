import React from 'react';
import Navbar from './navbar';
import './home.css';
import Card from './card';

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="banner-container">
        <img src="./banner.jpg" alt="" />
        <img src="mobile_banner.jpg" alt="" />
      </div>
      <div className="main">
        <Card
          image={'https://m.media-amazon.com/images/I/61MbLLagiVL._SL1000_.jpg'}
          price={2500}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          image={'https://m.media-amazon.com/images/I/61MbLLagiVL._SL1000_.jpg'}
          price={2500}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          image={'https://m.media-amazon.com/images/I/61MbLLagiVL._SL1000_.jpg'}
          price={2500}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          image={'https://m.media-amazon.com/images/I/61MbLLagiVL._SL1000_.jpg'}
          price={2500}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          image={'https://m.media-amazon.com/images/I/61MbLLagiVL._SL1000_.jpg'}
          price={2500}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          image={'https://m.media-amazon.com/images/I/61MbLLagiVL._SL1000_.jpg'}
          price={2500}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          image={'https://m.media-amazon.com/images/I/61MbLLagiVL._SL1000_.jpg'}
          price={2500}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          image={'https://m.media-amazon.com/images/I/61MbLLagiVL._SL1000_.jpg'}
          price={2500}
          rating={3}
          title={'Echo Dot'}
        />
      </div>
    </div>
  );
}

export default Home;
