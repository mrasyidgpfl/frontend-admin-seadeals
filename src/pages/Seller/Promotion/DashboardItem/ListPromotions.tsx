import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Formatter from '../../../../utils/formatter';
import Button from '../../../../components/Button/Button';
import '../Promotions.scss';

const ListPromotions:FC<any> = ({ promotions }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="table-responsive table_wrapper">
        <table className="table table-hover promotion-dashboard__table">
          <caption>Daftar promosi toko</caption>
          <thead>
            <tr className="table-secondary">
              <th>Nama Promosi</th>
              <th className="col-2" scope="row">Nama Produk</th>
              <th>Deskripsi</th>
              <th>Diskon</th>
              <th>Kuota Pemakaian</th>
              <th>Status | Periode Promosi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {
            promotions.length === 0
              ? <tr><td colSpan={7} className="text-center">Tidak ada promosi!</td></tr>
              : promotions.map((promotion:any) => (
                <tr key={promotion.id}>
                  <td>
                    <div className="d-flex flex-column text-start">
                      <span>{promotion.name}</span>
                    </div>
                  </td>
                  <td>
                    {promotion.product_name}
                  </td>
                  <td>
                    {promotion.description}
                  </td>
                  <td>
                    {promotion.amount_type === 'percentage' && <span>{`${promotion.amount}%`}</span>}
                    {promotion.amount_type === 'nominal' && <span>{`${Formatter.DisplayPrice(promotion.amount)}`}</span>}
                  </td>
                  <td className="text-center">{promotion.quota}</td>
                  <td>
                    <div className="d-flex flex-column text-start">
                      <span style={{ width: 'fit-content' }} className="d-flex badge bg-secondary">{promotion.status}</span>
                      <span>{`${Formatter.DisplayDatetime(promotion.start_date)} - ${Formatter.DisplayDatetime(promotion.end_date)}`}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column align-items-start">
                      <Button buttonType="plain action-button" handleClickedButton={() => navigate(`/seller/promotions/show/${promotion.id}`)} text="Rincian" />
                      <Button buttonType="plain action-button" handleClickedButton={() => navigate(`/seller/promotions/update/${promotion.id}`)} isDisabled={promotion.status === 'ended'} text="Ubah" />
                      <Button buttonType="plain action-button" handleClickedButton={() => navigate(`/seller/promotions/new?copy=${promotion.id}`)} text="Duplikat" />
                    </div>
                  </td>
                </tr>
              ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ListPromotions;
