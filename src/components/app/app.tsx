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
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { useDispatch } from '../../services/store';

const App = () => {
  const location = useLocation();
  const { number } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const background = location.state?.background;

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />

          <Route element={<ProtectedRoute onlyUnAuth />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='orders' element={<ProfileOrders />} />
          </Route>
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title={`Информация о заказе`}
                  onClose={() => navigate(-1)}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title={`Детали ингредиента`}
                  onClose={() => navigate(-1)}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal
                    title={`#${location.pathname.split('/')[3]}`}
                    onClose={() => navigate(-1)}
                  >
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
