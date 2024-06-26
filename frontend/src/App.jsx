import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import BooksList from './components/BooksList';
import SingleBook from './components/SingleBook';
import BookProgress from './components/BookProgress';
import LandingPage from './components/LandingPage';
import UserCoupons from './components/UserCoupons';
import AvailableCoupons from './components/AvailableCoupons';
import ReadBooks from './components/ReadBooks';
import Friends from './components/Friends';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import UserReviews from './components/UserReviews';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <div className='layout'>
      <Navigation isLoaded={isLoaded} />
      <div className='main-content'>
        {isLoaded && <Outlet />}
      </div>
      <div className='footer-container'>

      <Footer />
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/books',
        element: <BooksList />
      },
      {
        path: '/books/:bookId',
        element: <SingleBook />
      },
      {
        path: '/books/:bookId/reviews',
        element: <Reviews />
      },
      {
        path: '/progress/user/:userId',
        element: <BookProgress />
      },
      {
        path: '/coupons/current',
        element: <UserCoupons />
      },
      {
        path: '/coupons',
        element: <AvailableCoupons />
      },
      {
        path: '/books/read',
        element: <ReadBooks />
      },
      {
        path: '/friends',
        element: <Friends />
      },
      {
        path: '/reviews/current',
        element: <UserReviews />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
