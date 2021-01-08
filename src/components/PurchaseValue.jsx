import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store.jsx';
import { filter } from 'lodash';
import '../styles/PurchaseValue.css';

const PurchaseValue = ({ productId }) => {
  const [purchaseValue, setPurchaseValue] = useState(0)
  const [state] = useContext(Context);

  useEffect(() => {
    handleTotalItemPurchaseValue(productId)
  }, [state, productId])

  const handleTotalItemPurchaseValue = (productId) => {
    let products = filter(state.cart, product => productId == product.pid);
    if (products.length > 0) {
      let price = ((Number(products[0].price)) * products.length).toFixed(2);
      setPurchaseValue(price);
    } else setPurchaseValue(0)
  };

  return (
    <div>
      <p className='PurchaseValueParagraph'>
        {'Wartość zamówienia: '}
        <span className='PurchaseValuePrice'>
          {`${purchaseValue} zł`}
        </span>
      </p>
    </div>
  )
}

export default PurchaseValue;