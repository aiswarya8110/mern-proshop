import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeScreen />
      },
      {
        path: 'product/:id',
        element: <ProductScreen />
      },
      {
        path: 'cart',
        element: <CartScreen />
      },
      {
        path: 'login',
        element: <LoginScreen />
      },
      {
        path: 'register',
        element: <RegisterScreen />
      },
      {
        path: 'shipping',
        element: <PrivateRoute><ShippingScreen /></PrivateRoute>
      },
      {
        path: 'payment',
        element: <PaymentScreen />
      },
      {
        path: 'order',
        element: <PrivateRoute><PlaceOrderScreen /></PrivateRoute>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
