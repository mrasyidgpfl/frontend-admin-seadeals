import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from './useAxiosPrivate';

export default function useGetSellerOrders() {
  const axiosPrivate = useAxiosPrivate();
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orders, setOrders] = useState([]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSellerOrders = async () => {
      try {
        const response = await axiosPrivate.get(`sellers/orders?filter=${filter}`, {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setLoadingOrders(false);
          setOrders(data.orders);
        }
      } catch (err) {
        toast.error('gagal memuat daftar pesanan');
      }
    };
    getSellerOrders();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { loadingOrders, orders, setFilter };
}
