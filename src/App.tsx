import './App.css';

import { lazy, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { selectIsRefreshing } from './redux/auth/selectors';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRouter';
import { refreshUser } from './redux/auth/operations';
import ModalDeleteContact from './components/ModalDeleteContact/ModalDeleteContact';
import {
  selectIsLoading,
  selectIsModalDelVisible,
  selectIsModalEditVisible,
} from './redux/filters/selectors';
import { Toaster } from 'react-hot-toast';
import ModalEditContact from './components/ModalEditContact/ModalEditContact';
import { RotatingLines } from 'react-loader-spinner';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));

function App() {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectIsRefreshing);
  const isModalDelVisible = useSelector(selectIsModalDelVisible);
  const isModalEditVisible = useSelector(selectIsModalEditVisible);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div className="container">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegisterPage />}
              />
            }
          />

          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
        </Routes>
      </Layout>
      {isLoading && (
        <div className="loader-container">
          <RotatingLines strokeColor="blue" />
        </div>
      )}
      <Toaster />
      {isModalDelVisible && <ModalDeleteContact />}
      {isModalEditVisible && <ModalEditContact />}
    </div>
  );
}

export default App;
