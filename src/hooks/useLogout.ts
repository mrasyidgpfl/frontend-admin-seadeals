import toast from 'react-hot-toast';
import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

const useLogout = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  return async () => {
    const loadingToast = toast.loading('Waiting for sign out');
    try {
      await axiosPrivate.post('/sign-out', JSON.stringify({ user_id: parseInt(auth.user.user_id, 10) }));
      localStorage.removeItem('access_token');
    } catch (err:any) {
      toast.error(err.response?.data?.message);
    } finally {
      toast.dismiss(loadingToast);
    }
    setAuth({});
  };
};

export default useLogout;
