import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
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
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import OrderListScreen from './screens/Admin/OrderListScreen.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import ProductListScreen from './screens/Admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/Admin/ProductEditScreen.jsx';
import UserListScreen from './screens/Admin/UserListScreen.jsx';
import UserEditScreen from './screens/Admin/UserEditScreen.jsx';

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
        path: 'placeOrder',
        element: <PrivateRoute><PlaceOrderScreen /></PrivateRoute>
      },
      {
        path: 'order/:orderId',
        element: <PrivateRoute><OrderScreen /></PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute><ProfileScreen /></PrivateRoute>
      },
      {
        path: 'admin/orderList',
        element: <AdminRoute><OrderListScreen /></AdminRoute>
      },
      {
        path: 'admin/productList',
        element: <AdminRoute><ProductListScreen /></AdminRoute>
      },
      {
        path : 'admin/productList/edit/:id',
        element: <AdminRoute><ProductEditScreen /></AdminRoute>
      },
      {
        path: '/admin/userList',
        element: <AdminRoute><UserListScreen /></AdminRoute>
      },
      {
        path: '/admin/userList/edit/:id',
        element: <AdminRoute><UserEditScreen /></AdminRoute>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <PayPalScriptProvider deferLoading>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </PayPalScriptProvider>,
)
