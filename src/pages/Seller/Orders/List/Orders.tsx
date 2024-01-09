import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import OrdersNav from './OrdersNav';
import OrdersList from './OrdersList';
import '../Orders.scss';
import LoadingPlain from '../../../../components/Loading/LoadingPlain';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Pagination from '../../../../components/Pagination/Pagination';
import ModalOrderDetail from '../../../../components/Modal/ModalOrderDetail/ModalOrderDetail';

const Orders = () => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParam, setSearchParam] = useSearchParams();

  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orders, setOrders] = useState([]);

  const [filter, setFilter] = useState(searchParam.get('type') || '');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getSellerOrders = async (isMounted: boolean, controller: AbortController) => {
    try {
      const response = await axiosPrivate.get(`sellers/orders?filter=${filter}&page=${page}`, {
        signal: controller.signal,
      });
      const { data } = response.data;
      if (isMounted) {
        setLoadingOrders(false);
        setOrders(data.orders);
        setTotalPage(data.total_page);
      }
    } catch (err) {
      toast.error('gagal memuat daftar pesanan');
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setLoadingOrders(true);

    getSellerOrders(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [filter, page]);

  const refreshData = () => {
    const isMounted = true;
    const controller = new AbortController();
    setLoadingOrders(true);
    getSellerOrders(isMounted, controller);
  };

  const setParam = (status:string) => {
    setSearchParam({ type: status });
    setFilter(status);
  };

  const viewOrder = (order:any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div className="py-4">
      {showModal && (
      <ModalOrderDetail
        setShow={setShowModal}
        order={selectedOrder}
        refreshData={refreshData}
      />
      )}
      <h3 className="my-3 title">Daftar Pesanan</h3>
      <OrdersNav setParam={setParam} active={filter} />
      {loadingOrders
        ? <LoadingPlain height={64} />
        : <OrdersList orders={orders} viewOrder={viewOrder} />}
      <Pagination
        page={!page ? 1 : page}
        totalPage={totalPage}
        setPage={setPage}
        innerRef={{}}
      />
    </div>
  );
};

export default Orders;
