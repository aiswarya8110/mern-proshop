import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';

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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>,
)
