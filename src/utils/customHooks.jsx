import { useEffect, useReducer } from 'react';
import { apiReducer, checkDataReducer } from '../reducers.jsx';

const fetchData = async (path) => {
  if (!path) return;
  const response = await fetch(path);
  if (response.ok) {
    return response.json();
  } throw response;
};

const checkData = async (path, pid, quantity) => {
  if (!path || !pid || !quantity) return;
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pid,
      quantity
    }),
  });
  if (response.ok) {
    return response.json();
  } throw response;
};

export const useData = (path) => {
  const [response, dispatch] = useReducer(apiReducer, {
    data: null,
    isLoading: false,
    error: null
  });
  useEffect(() => {
    dispatch({ type: 'FETCHING_DATA' });
    fetchData(path)
      .then((data) => dispatch({ type: 'FETCHED_SUCCESS', payload: data }))
      .catch((error) => {
        error.json()
          .then((body) => {
            dispatch({ type: 'FETCHED_FAILED', payload: body })
          })
      });
  }, [path]);
  return response;
};

export const useCheckData = (path, pid, quantity) => {
  const [response, dispatch] = useReducer(checkDataReducer, {
    data: null,
    isLoading: false,
    error: null
  });
  useEffect(() => {
    dispatch({ type: 'CHECK_DATA' });
    checkData(path, pid, quantity)
      .then((data) => dispatch({ type: 'CHECK_SUCCESS', payload: data }))
      .catch((error) => {
        error.json()
          .then((body) => {
            dispatch({ type: 'CHECK_FAILED', payload: body })
          })
      });
  }, [path, pid, quantity]);
  return response;
};