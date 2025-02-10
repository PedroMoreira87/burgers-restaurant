import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from './pages/header/Header';
import { AppDispatch } from './store';
import { fetchMenu } from './store/menu-slice.ts';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  return (
    <>
      <Header />
    </>
  );
}

export default App;
