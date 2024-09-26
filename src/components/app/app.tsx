import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  const location = useLocation();

  const backgroundLocation = location.state?.background;

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={backgroundLocation || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />}>
            <Route
              path=':number'
              element={
                <Modal
                  title={`Информация о заказе`}
                  onClose={() => window.history.back()}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={`#${location.pathname.split('/')[2]}`}
                onClose={() => window.history.back()}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route element={<ProtectedRoute onlyUnAuth />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/profile' element={<Profile />}>
              <Route
                path='orders/:number'
                element={
                  <Modal
                    title={`#${location.pathname.split('/')[3]}`}
                    onClose={() => window.history.back()}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route path='orders' element={<ProfileOrders />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
