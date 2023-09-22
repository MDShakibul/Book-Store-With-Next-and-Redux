import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Books from '@/pages/Books';
import AddBook from '@/pages/AddBook';
import Signup from '@/pages/Signup';
import BookDetails from '@/pages/BookDetails';
import WishList from '@/pages/WishList';
import RecentRunningBook from '@/pages/RecentRunningBook';
import EditBook from '@/pages/EditBook';
import PrivateRoute from './PrivetRoute';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Books />,
      },
      {
        path: '/book-details/:id',
        element: (
          <PrivateRoute>
            <BookDetails />,
          </PrivateRoute>
        ),
      },
      {
        path: '/add-book',
        element: (
          <PrivateRoute>
            <AddBook />,
          </PrivateRoute>
        ),
      },
      {
        path: '/edit-book/:id',
        element: <EditBook />,
      },
      {
        path: '/wish-list',
        element: <WishList />,
      },
      {
        path: '/currently-running-list',
        element: <RecentRunningBook />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
  
  /* {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  }, */
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
