import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <ToastContainer />
      <App />
    </Provider>,
)
