import React, { useContext, useEffect, useState } from 'react';
import { useCheckData } from '../utils/customHooks.jsx';
import { Context } from '../store.jsx';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

const AddToCart = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const [id, setId] = useState(null);
  const [path, setPath] = useState('');
  const [, dispatch] = useContext(Context);
  const { data, error } = useCheckData(path, id, quantity);

  useEffect(() => {
    handleErrorQuantity(error, product)
  }, [data, error])

  const handleErrorQuantity = (err, product) => {
    if (err) {
      setQuantity(product.min)
      dispatch({ type: 'HANDLE_MODAL', payload: { product, modalIsOpen: true } });
      dispatch({ type: 'UPDATED_CART', payload: product })
    }
  }

  const additionToCart = (product) => {
    setQuantity(prevState => prevState + 1);
    setId(product.pid);
    setPath('/api/product/check');
    dispatch({ type: 'ADD_PRODUCT_TO_CART', payload: [product] });
  }

  const substractionFromCart = (product) => {
    setQuantity(prevState => prevState - 1);
    setId(product.pid);
    setPath('/api/product/check');
    dispatch({ type: 'REMOVE_PRODUCT_FROM_CART', payload: product.pid })
  }

  const debounce = (callback, delay) => {
    let timeout = null
    return (...args) => {
      const next = () =>
        callback(...args);
      clearTimeout(timeout);
      timeout = setTimeout(next, delay)
    }
  }

  const handleInfoIsBlocked = (product) => {
    if (product.isBlocked) {
      return 'Produkt niedostępny'
    } else return (
      <p>
        {'Obecnie masz: '}
        <span className='InfoText'>
          {`${quantity} szt. `}
        </span>
        {'produktu'}
      </p>
    )
  }

  return (
    <div>
      <p>{handleInfoIsBlocked(product)}</p>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <Button
            outline
            name='substractButton'
            disabled={quantity <= 0 || product.isBlocked}
            onClick={() => debounce(substractionFromCart(product), 1000)}
            color="danger"
            children={'-'}
          />
        </InputGroupAddon>
        <Input
          value={`${quantity} szt.`}
          disabled
        />
        <InputGroupAddon addonType="append">
          <Button
            outline
            name='addButton'
            disabled={quantity > product.max || product.isBlocked}
            onClick={() => debounce(additionToCart(product), 1000)}
            color="success"
            children={'+'}
          />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export default AddToCart;