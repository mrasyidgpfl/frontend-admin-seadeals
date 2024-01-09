import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../Button/Button';
import DeliveryInfoItem from './DeliveryInfoItem';
import dateFormatter from '../../../utils/dateFormatter';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ComplaintPhotos from './ComplaintPhotos';

interface Props {
  closeComplaint: ()=>void,
  order: any,
  setShowModal: (isShow:boolean)=>void,
  refreshData: ()=>void,
}

const getActionText = (actionType:string) => {
  if (actionType === 'reject') return 'Tolak Komplain';
  if (actionType === 'accept') return 'Kembalikan Dana ke Pembeli';
  return '';
};
const getActionURL = (actionType:string) => {
  if (actionType === 'reject') return 'reject-refund/orders';
  if (actionType === 'accept') return 'accept-refund/orders';
  return '';
};

const ManageComplaint:FC<Props> = ({
  closeComplaint, order, setShowModal, refreshData,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [loadingAction, setLoadingAction] = useState(false);
  const [action, setAction] = useState<any>(null);

  const respondComplaint = async () => {
    if (!action) {
      toast.error('pilih aksi terlebih dahulu');
      return;
    }
    if (loadingAction) return;

    const url = getActionURL(action);

    try {
      setLoadingAction(true);
      toast.loading('Mengirim Respon Komplain..');
      await axiosPrivate.post(
        url,
        JSON.stringify({ order_id: order.id }),
      );
      refreshData();
      setLoadingAction(false);
      setShowModal(false);
      toast.dismiss();
      toast.success('Respon berhasil disimpan');
    } catch (e) {
      toast.dismiss();
      toast.error('Gagal Menyimpan Respon Komplain');
    }
  };

  return (
    <div className="pe-4 me-1">
      <div className="d-flex justify-content-between mb-4">
        <h4 className="fw-bold">Komplain Pesanan</h4>
        <Button
          buttonType="plain text-main"
          text="Kembali ke Rincian"
          handleClickedButton={() => closeComplaint()}
        />
      </div>
      <div className="">
        <p className="fw-bold mb-3 fs-5">Detail Komplain:</p>
        <div className="p-3 border rounded shadow-sm mb-4">
          <p>{order?.complaint?.description}</p>
        </div>
        {order?.complaint?.complaint_photos && (
          <ComplaintPhotos order={order} />
        )}
        <p className="fw-bold mb-3 fs-5">Informasi Pengiriman:</p>
        <div className="p-3 border rounded shadow-sm mb-4">
          <div className="row">
            <div className="col-4">
              <DeliveryInfoItem header="Kurir" value={order?.delivery?.courier} />
              <DeliveryInfoItem header="Dikirim" value={dateFormatter.formatTime(order?.delivery?.activity[0]?.created_at)} />
            </div>
            <div className="col-5">
              <DeliveryInfoItem header="Tipe Pengiriman" value="Reguler" />
              <DeliveryInfoItem header="Tujuan Pengiriman" value={order?.delivery?.destination_address} />
            </div>
          </div>
        </div>
        {order.status === 'complained'
            && (
            <div className="">
              <p className="fs-5 fw-bold mb-2">
                Aksi Komplain
                {`: ${action ? getActionText(action) : ''}`}
              </p>
              <div className="fw-bold d-flex justify-content-between mb-4">
                <div
                  className={`border px-3 py-2 hover-click ${action === 'reject' ? 'border-accent' : ''}`}
                  onClick={() => setAction('reject')}
                  role="presentation"
                >
                  <p>Tolak Komplain</p>
                </div>
                <div
                  className={`border px-3 py-2 hover-click ${action === 'accept' ? 'border-accent' : ''}`}
                  onClick={() => setAction('accept')}
                  role="presentation"
                >
                  <p>Kembalikan Dana ke Pembeli</p>
                </div>
              </div>
              <div>
                <Button
                  buttonType={`secondary ${loadingAction && 'disabled'}`}
                  handleClickedButton={() => respondComplaint()}
                  text="Konfirmasi"
                />
              </div>
            </div>
            )}
      </div>
    </div>
  );
};

export default ManageComplaint;
