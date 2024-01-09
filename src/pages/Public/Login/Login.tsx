import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../assets/images/logo.png';
import Button from '../../../components/Button/Button';
import axios from '../../../api/axios';
import useCheckLogged from '../../../hooks/useCheckLogged';
import './Login.scss';

const LOGIN_URL = '/sign-in';

const Login = () => {
  useCheckLogged();

  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCallbackResponse = async (response: any) => {
    try {
      const res = await axios.post(
        '/google/sign-in',
        JSON.stringify({ token_id: response.credential }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const decode:any = jwt_decode(res.data.data.id_token);
      const accessToken = res?.data?.data.id_token;
      const { user, scope } = decode;

      setAuth({ user, roles: scope.split(' '), accessToken });
      localStorage.setItem('access_token', accessToken);

      if (scope.includes('seller')) {
        navigate('/seller', { replace: true });
        return;
      }
      if (scope.includes('admin')) {
        navigate('/admin', { replace: true });
        return;
      }

      navigate('/seller/register', { replace: true });
    } catch (err:any) {
      toast.error(err.response?.data?.message);
      navigate('/register', { replace: true, state: err.response.data?.data?.user });
    }
  };

  useEffect(() => {
    /* global google */
    // @ts-ignore
    if (google) {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        { theme: 'outline', size: 'large', width: '400' },
      );
    } else {
      toast.error('Network problem');
    }
  }, []);

  const handleSubmit = async () => {
    const toastLoading = toast.loading('Waiting for login');
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          withCredentials: true,
        },
      );
      const decode: any = jwt_decode(response.data.data.id_token);
      const accessToken = response?.data?.data.id_token;
      const { user, scope } = decode;

      setAuth({ user, roles: scope.split(' '), accessToken });
      localStorage.setItem('access_token', accessToken);

      setEmail('');
      setPassword('');

      if (scope.includes('seller')) {
        navigate('/seller', { replace: true });
        return;
      }
      if (scope.includes('admin')) {
        navigate('/admin', { replace: true });
        return;
      }
      navigate('/seller/register', { replace: true });
    } catch (err:any) {
      toast.error(err.response?.data?.message);
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  return (
    <div className="login_container">
      <div className="login_cards row">
        <div className="logo col-md-6 col-sm-12">
          <img alt="" className="img-fluid" src={logo} />
        </div>
        <div className="forms_container col-md-6 col-sm-12">
          <div className="login_forms">
            <p className="p-4"><b>Log in ke Sea Deals Seller Center</b></p>
            <form
              className=""
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit().then();
              }}
            >
              <input type="email" placeholder="Email" className="form-control mb-2" value={email} required onChange={(event) => setEmail(event.target.value)} />
              <input type="password" placeholder="Kata sandi" className="form-control mb-2" value={password} required onChange={(event) => setPassword(event.target.value)} />
              <Button buttonType="primary" text="Login" isSubmit handleClickedButton={() => {}} />
            </form>
            <div className="hr-sect"><b>ATAU</b></div>
            <div className="d-flex justify-content-center">
              <div className="mb-4" id="signInDiv" />
            </div>
            <p id="daftar-text">
              Belum punya akun SeaDeals?
              {' '}
              <a href="/register" id="daftar-link"><b>Daftar</b></a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
