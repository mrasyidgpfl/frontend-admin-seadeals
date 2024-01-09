import { useNavigate } from 'react-router-dom';
import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Button from '../../../components/Button/Button';
import Pagination from '../../../components/Pagination/Pagination';
import ProductAPI from '../../../api/product';
import ListProduct from './DashboardItem/ListProduct';
import '../Voucher/Voucher.scss';

const DashboardProduct:FC<any> = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const innerRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [deletedID, setDeletedID] = useState(undefined);

  const findProductBySellerID = async () => {
    const filter = `page=${page}&limit=10&sortBy=date&sort=desc`;
    await ProductAPI.FindProductBySellerID(axiosPrivate, filter)
      .then((resp:any) => {
        const { data } = resp.data;
        setTotalPage(data.total_page);
        setPage(data.current_page);
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err:any) => toast.error(err.response?.data?.message));
  };

  const handleDelete = async () => {
    await ProductAPI.DeleteProductByID(axiosPrivate, deletedID)
      .then((resp: any) => {
        const { data } = resp;
        if (data?.statusCode === 200) {
          toast.success('produk berhasil dihapus');
        }
        setDeletedID(undefined);
      })
      .catch((err: any) => toast.error(err.response?.data?.message));
  };

  useEffect(() => {
    findProductBySellerID().then();
  }, [page, deletedID]);

  return (
    <div className="promotions-dashboard_container">
      <h3>Daftar Produk</h3>
      <div className="promotion_content">
        <div className="d-flex justify-content-between mb-4 pb-4">
          <div className="d-flex flex-column text-start">
            <h5 className="m-0">Daftar Produk</h5>
            <p className="m-0 p-0">Buat produk untuk dijual di toko kamu</p>
          </div>
          <Button buttonType="secondary" text="Buat produk" handleClickedButton={() => navigate('/seller/product/new')} />
        </div>
        <div>
          <ListProduct
            products={products}
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

export default DashboardProduct;
