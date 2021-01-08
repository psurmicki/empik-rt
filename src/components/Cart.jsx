import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store.jsx';
import { get, map } from 'lodash';
import '../styles/Cart.css';

const Cart = () => {
  const [totalPurchaseValue, setTotalPurchaseValue] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [state] = useContext(Context);

  useEffect(() => {
    handleTotalPurchaseValue();
    handleTotalQuantityValues();
  }, [state])

  const handleTotalPurchaseValue = () => {
    const purchaseValue = map(state.cart, product => get(product, 'price', null));
    let val = calculatePrice(purchaseValue);
    setTotalPurchaseValue(val);
  }

  const calculatePrice = (prices) => {
    let priceToNumber = prices.map(price => Number(price))
    let priceValues = priceToNumber.map(price => typeof price == 'number' ? price : 0);
    let totalPrices = priceValues.reduce(
      (prevValue, currentValue) => {
        return prevValue + currentValue
      }, 0);
    return totalPrices.toFixed(2);
  }

  const handleTotalQuantityValues = () => {
    let quantityCartLength = state.cart.length;
    setTotalQuantity(quantityCartLength);
  }

  return (
    <div className='CartRow'>
      <div className='CartColumn'>
        <p>
          {'Wartość całego zamówienia: '}
          <span className='CartValueText'>
            {`${totalPurchaseValue} zł`}
          </span>
        </p>
      </div>
      <div className='CartColumn'>
        <p>
          {'Całkowita ilość zamówionych produktów: '}
          <span className='CartValueText'>
            {totalQuantity}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Cart;