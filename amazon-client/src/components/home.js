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
          id={1}
          image={'https://m.media-amazon.com/images/I/61MbLLagiVL._SL1000_.jpg'}
          price={2500}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          id={2}
          image={
            'https://m.media-amazon.com/images/I/61KPI-ZFbvL._AC_UL320_.jpg'
          }
          price={5876}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          id={3}
          image={
            'https://m.media-amazon.com/images/I/71Zf9uUp+GL._AC_UL320_.jpg'
          }
          price={990}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          id={4}
          image={
            'https://m.media-amazon.com/images/I/81hft+H1HHL._AC_UL320_.jpg'
          }
          price={3888}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          id={5}
          image={
            'https://m.media-amazon.com/images/I/81arIc2mqMS._AC_UL320_.jpg'
          }
          price={6888}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          id={6}
          image={
            'https://m.media-amazon.com/images/I/31aA5WOQ2DL._AC_UL320_.jpg'
          }
          price={2332}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          id={7}
          image={
            'https://images-eu.ssl-images-amazon.com/images/I/41I02AqGRFL._AC_SX184_.jpg'
          }
          price={9782}
          rating={3}
          title={'Echo Dot'}
        />
        <Card
          id={8}
          image={
            'https://images-eu.ssl-images-amazon.com/images/I/41Y+SwHCJzL._AC_SX184_.jpg'
          }
          price={7587}
          rating={3}
          title={'Echo Dot'}
        />
      </div>
    </div>
  );
}

export default Home;
