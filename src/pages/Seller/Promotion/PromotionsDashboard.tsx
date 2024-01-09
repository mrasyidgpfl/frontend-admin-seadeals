import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PromotionsAPI from '../../../api/promotions';
import ListPromotions from './DashboardItem/ListPromotions';
import Button from '../../../components/Button/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Pagination from '../../../components/Pagination/Pagination';
import FilterPromotions from './DashboardItem/FilterPromotions';
import './Promotions.scss';

const PromotionsDashboard:FC<any> = ({ title }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const innerRef = useRef(null);

  const [promotions, setPromotions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState('');

  const [deletedID, setDeletedID] = useState(undefined);

  const findPromotions = async () => {
    const filter = `page=${page}&status=${status}`;
    await PromotionsAPI.GetPromotions(axiosPrivate, filter)
      .then((resp:any) => {
        const { data } = resp.data;
        setTotalPage(data.total_pages);
        setPage(data.page);
        setPromotions(data);
      })
      .catch((err:any) => toast.error(err.response?.data?.message));
  };

  useEffect(() => {
    findPromotions().then();
  }, [page, status, deletedID]);

  return (
    <div className="promotions-dashboard_container">
      <h3>{title}</h3>
      <div className="promotion_content">
        <div className="d-flex justify-content-between mb-4 pb-4">
          <div className="d-flex flex-column text-start">
            <h5 className="m-0">Daftar Promosi</h5>
            <p className="m-0 p-0">Berikan harga terbaik untuk produkmu di SeaDeals</p>
          </div>
          <Button buttonType="secondary" text="Buat promosi" handleClickedButton={() => navigate('/seller/promotions/new')} />
        </div>
        <div>
          <FilterPromotions status={status} setStatus={setStatus} />
          <ListPromotions
            promotions={promotions}
            setDeletedID={setDeletedID}
          />
          <Pagination
            totalPage={totalPage}
            page={page}
            setPage={setPage}
            innerRef={innerRef}
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionsDashboard;
