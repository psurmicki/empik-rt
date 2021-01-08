import React from 'react';
import AddToCart from './AddToCart.jsx';
import Cart from './Cart.jsx';
import ModalQuantity from './ModalQuantity.jsx';
import PurchaseValue from './PurchaseValue.jsx';
import { Badge } from 'reactstrap';
import { map } from 'lodash';
import '../styles/ProductList.css';

const ProductsList = ({ products }) => {
  return (
    <div>
      <ModalQuantity />
      <Cart />
      <h2>Lista produktów:</h2>
      {
        map(products, (product, i) => {
          return (
            <div
              className='ProductListContainer'
              key={`${product.pid}-${i}`}
            >
              <div className='ProductListRow'>
                <div className='ProductListColumn ProductName'>
                  {product.name}
                </div>
                <div className='ProductListColumn'>
                  <AddToCart product={product} />
                </div>
                <div className='ProductListColumn'>
                  <Badge
                    className='Badge'
                    color="light"
                    pill
                  >
                    {` ${product.price} zł / szt.`}
                  </Badge>
                </div>
                <div className='ProductListColumn'>
                  <PurchaseValue productId={product.pid} />
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ProductsList;

