import React, { useEffect, useState } from 'react';
import { useData } from '../../utils/customHooks.jsx';
import Loader from '../Loader.jsx';
import ProductsList from '../ProductsList.jsx';
import Store from '../../store.jsx';
import '../../styles/App.css';

const App = () => {
  const [path, setPath] = useState('');
  const { data, isLoading } = useData(path);

  useEffect(() => {
    setPath('/api/cart')
  }, [path])

  return (
    <Store>
      <div className="AppContainer">
        {
          isLoading ?
            <Loader /> :
            <ProductsList products={data} />
        }
      </div>
    </Store>
  );
};

export {
  App
};