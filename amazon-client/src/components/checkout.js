import React from 'react';
import { useStatevalue } from '../StateProvider';

function Checkout() {
  const [{ basket }] = useStatevalue();
  console.log(basket);
  return <div>checkout</div>;
}

export default Checkout;
