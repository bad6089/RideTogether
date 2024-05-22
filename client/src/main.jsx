// src/main.jsx
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import SingleRide from './pages/SingleRide.jsx';
import SupportMe from './pages/SupportMe';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/support-me',
        element: <SupportMe />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/profiles/:username',
        element: <Profile />,
      },
      {
        path: '/me',
        element: <Profile />,
      },
      {
        path: '/rides/:id',
        element: <SingleRide />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
