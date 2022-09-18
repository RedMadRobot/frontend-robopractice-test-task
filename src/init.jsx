import { Provider } from 'react-redux';

export default async () => {
  
  return (
    <Provider store={store}>
      <ApiContext.Provider value={api}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ApiContext.Provider>
    </Provider>
  );
}