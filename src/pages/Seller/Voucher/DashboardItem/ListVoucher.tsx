import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Formatter from '../../../../utils/formatter';
import ModalConfirmation from '../../../../components/Modal/ModalConfirmation/ModalConfirmation';
import Button from '../../../../components/Button/Button';
import Loading from '../../../../components/Loading/Loading';

const ListVoucher:FC<any> = ({
  vouchers, setDeletedID, handleDelete, loading,
}) => {
  const navigate = useNavigate();
  const [showModalDelete, setShowModalDelete] = useState(false);

  return (
    <div className="container">
      {showModalDelete && (
      <ModalConfirmation
        text="Kamu yakin akan menghapus voucher ini?"
        handleClose={() => setShowModalDelete(false)}
        handleConfirm={() => {
          handleDelete();
          setShowModalDelete(false);
        }}
        setShowModal={setShowModalDelete}
      />
      )}
      <div className="table-responsive">
        <table className="table table-hover voucher__table">
          <caption>List of shop voucher</caption>
          <thead>
            <tr className="table-secondary">
              <th>Nama Voucher | Kode</th>
              <th>Diskon</th>
              <th>Kuota Pemakaian</th>
              <th>Status | Periode Voucher</th>
              <th>Aksi</th>
            </tr>
          </thead>
          {loading ? <tbody><tr><td colSpan={4}><Loading height={48} /></td></tr></tbody>
            : (
              <tbody>
                {
            vouchers.length === 0
              ? <tr><td colSpan={5}>No vouchers</td></tr>
              : vouchers.map((v:any) => (
                <tr key={v.id}>
                  <td>
                    <div className="d-flex flex-column text-start">
                      <span>{v.name}</span>
                      <span>
                        {'Kode: '}
                        <b>{v.code}</b>
                      </span>
                    </div>
                  </td>
                  <td>
                    {v.amount_type === 'percentage' && <span>{`${v.amount}%`}</span>}
                    {v.amount_type === 'nominal' && <span>{`${Formatter.DisplayPrice(v.amount)}`}</span>}
                  </td>
                  <td>{v.quota}</td>
                  <td>
                    <div className="d-flex flex-column text-start">
                      <span style={{ width: 'fit-content' }} className="d-flex badge bg-secondary">{v.status}</span>
                      <span>{`${Formatter.DisplayDatetime(v.start_date)} - ${Formatter.DisplayDatetime(v.end_date)}`}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column align-items-start">
                      <Button buttonType="plain action-button" handleClickedButton={() => navigate(`/seller/voucher/show/${v.id}`)} text="Rincian" />
                      <Button buttonType="plain action-button" handleClickedButton={() => navigate(`/seller/voucher/update/${v.id}`)} isDisabled={v.status === 'ended'} text="Ubah" />
                      <Button buttonType="plain action-button" handleClickedButton={() => navigate(`/seller/voucher/new?copy=${v.id}`)} text="Duplikat" />
                      <Button buttonType="plain action-button" handleClickedButton={() => { setShowModalDelete(true); setDeletedID(v.id); }} isDisabled={v.status !== 'upcoming'} text="Akhiri" />
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
export default ListVoucher;
