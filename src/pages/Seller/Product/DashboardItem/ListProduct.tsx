import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalConfirmation from '../../../../components/Modal/ModalConfirmation/ModalConfirmation';
import Button from '../../../../components/Button/Button';
import { ReactComponent as IconHeart } from '../../../../assets/svg/icon_heart.svg';
import '../Product.scss';
import Formatter from '../../../../utils/formatter';
import Loading from '../../../../components/Loading/Loading';

const ListProduct:FC<any> = ({
  products, setDeletedID, handleDelete, loading,
}) => {
  const navigate = useNavigate();
  const buyerURL = process.env.REACT_APP_BUYER_URL;
  const [showModalDelete, setShowModalDelete] = useState(false);

  return (
    <div className="container">
      {showModalDelete && (
        <ModalConfirmation
          text="Kamu yakin akan menghapus produk ini?"
          handleClose={() => setShowModalDelete(false)}
          handleConfirm={() => {
            handleDelete();
            setShowModalDelete(false);
          }}
          setShowModal={setShowModalDelete}
        />
      )}
      <div className="table-responsive product-list__container">
        <table className="table table-hover product-list__table">
          <caption>List of shop product</caption>
          <thead>
            <tr className="table-secondary">
              <th>Nama Produk</th>
              <th>
                <div className="d-flex justify-content-between gap-4 align-items-end">
                  <span className="product-list__variant small">Kode Variasi</span>
                  <span className="product-list__variant large">Variasi</span>
                  <span className="product-list__variant large">Harga</span>
                  <span className="product-list__variant">Stok</span>
                </div>
              </th>
              <th>Penjualan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          {loading ? <tbody><tr><td colSpan={4}><Loading height={48} /></td></tr></tbody> : (
            <tbody>
              {
            products.length === 0
              ? (
                <tr>
                  <td className="text-center" colSpan={4}>No Products</td>
                </tr>
              )
              : products.map((p: any) => (
                <tr key={p.id} className={p.is_deleted ? 'deleted product-list__row' : 'product-list__row'}>
                  <td>
                    <div className="product-list__product-main">
                      <img src={p.photo} alt="foto produk" className="product-list__photo" />
                      <div className="d-flex flex-column text-start">
                        <span className="product-list__name">{p.name}</span>
                        <span className="product-list__category">
                          {p.category}
                        </span>
                        <div className="product-list__caption">
                          {React.createElement(IconHeart, { className: 'product-list__icon' })}
                          <span>{p.favorite_count}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  {
                    p.product_variant_detail !== null
                      ? (
                        <td>
                          {p.product_variant_detail.map((pvd: any) => (
                            <div className="d-flex justify-content-between gap-4 my-1" key={pvd.id}>
                              <span className="product-list__variant cell-content small">{pvd.variant_code || '-'}</span>
                              {
                                pvd.variant1_value || pvd.variant2_value
                                  ? (
                                    <span
                                      className="product-list__variant cell-content large"
                                    >
                                      {`${pvd.variant1_value || ''}${pvd.variant1_value && pvd.variant2_value ? ',' : ''} ${pvd.variant2_value || ''}`}
                                    </span>
                                  )
                                  : <span className="product-list__variant cell-content large">-</span>
                              }
                              <span
                                className="product-list__variant cell-content large"
                              >
                                {Formatter.DisplayPrice(pvd.price)}
                              </span>
                              <span
                                className="product-list__variant cell-content"
                              >
                                {pvd.stock !== 0 ? pvd.stock : 'Habis'}
                              </span>
                            </div>
                          ))}
                        </td>
                      )
                      : <td>No variant</td>
                  }
                  <td><span className="product-list__variant">{p.sold_count}</span></td>
                  <td>
                    <div className="d-flex flex-column align-items-start">
                      <Button
                        buttonType="plain action-button"
                        handleClickedButton={() => { window.open(`https://${buyerURL}/product/${p.slug}.${p.id}`, '_blank'); }}
                        text="Lihat"
                      />
                      <Button
                        buttonType="plain action-button"
                        handleClickedButton={() => navigate(`/seller/product/show/${p.id}`)}
                        text="Rincian"
                      />
                      <Button
                        buttonType="plain action-button"
                        handleClickedButton={() => navigate(`/seller/product/update/${p.id}`)}
                        text="Ubah"
                        isDisabled
                      />
                      <Button
                        buttonType="plain action-button"
                        handleClickedButton={() => {
                          setShowModalDelete(true);
                          setDeletedID(p.id);
                        }}
                        text="Hapus"
                        isDisabled={p.is_deleted}
                      />
                    </div>
                  </td>
                </tr>
              ))
          }
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
export default ListProduct;
