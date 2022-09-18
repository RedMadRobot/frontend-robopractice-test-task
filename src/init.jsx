import { Provider } from 'react-redux';
import { App } from './app';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './store/index.js';

export default async () => {
  const store = configureStore(reducer);
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}