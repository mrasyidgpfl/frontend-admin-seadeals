import jwt_decode from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useCheckLogged = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname || '/';

  useEffect(() => {
    const token:any = localStorage.getItem('access_token');
    if (token !== null) {
      const dateNow = new Date();
      const decode:any = jwt_decode(token);
      if (decode.exp * 1000 < dateNow.getTime()) {
        navigate('/login');
      } else if (from === '/') {
        const { scope } = decode;
        if (scope.includes('seller')) {
          navigate('/seller', { replace: true });
          return;
        }
        if (scope.includes('admin')) {
          navigate('/admin', { replace: true });
          return;
        }
        navigate('/seller/register', { replace: true });
      }
    } else if (from !== '/register') {
      navigate('/login');
    }
  }, []);
};

export default useCheckLogged;
