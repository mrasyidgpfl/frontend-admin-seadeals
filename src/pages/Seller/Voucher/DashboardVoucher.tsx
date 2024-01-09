import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import VoucherAPI from '../../../api/voucher';
import ListVoucher from './DashboardItem/ListVoucher';
import Button from '../../../components/Button/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Pagination from '../../../components/Pagination/Pagination';
import FilterVoucher from './DashboardItem/FilterVoucher';
import './Voucher.scss';

const DashboardVoucher:FC<any> = ({ title }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const innerRef = useRef(null);

  const [vouchers, setVouchers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const [deletedID, setDeletedID] = useState(undefined);

  const findVoucherByUserID = async () => {
    const filter = `page=${page}&status=${status}`;
    await VoucherAPI.FindVoucherByUserID(axiosPrivate, filter)
      .then((resp:any) => {
        const { data } = resp.data;
        setTotalPage(data.total_pages);
        setPage(data.page);
        setVouchers(data.vouchers);
        setLoading(false);
      })
      .catch((err:any) => toast.error(err.response?.data?.message));
  };

  const handleDelete = async () => {
    await VoucherAPI.DeleteVoucherByID(axiosPrivate, deletedID)
      .then((resp: any) => {
        const { data } = resp.data;
        if (data?.is_deleted) {
          toast.success('voucher berhasil dihapus');
        }
        setDeletedID(undefined);
      })
      .catch((err: any) => toast.error(err.response?.data?.message));
  };

  useEffect(() => {
    findVoucherByUserID().then();
  }, [page, status, deletedID]);

  return (
    <div className="voucher__container">
      <h3>{title}</h3>
      <div className="voucher__content">
        <div className="d-flex justify-content-between mb-4 pb-4">
          <div className="d-flex flex-column text-start">
            <h5 className="m-0">Daftar Voucher</h5>
            <p className="m-0 p-0">Buat voucher untuk menarik pembeli</p>
          </div>
          <Button buttonType="secondary" text="Buat voucher" handleClickedButton={() => navigate('/seller/voucher/new')} />
        </div>
        <div>
          <FilterVoucher status={status} setStatus={setStatus} />
          <ListVoucher
            vouchers={vouchers}
            setDeletedID={setDeletedID}
            handleDelete={handleDelete}
            loading={loading}
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

export default DashboardVoucher;
