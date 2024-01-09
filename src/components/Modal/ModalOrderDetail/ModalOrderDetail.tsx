import React, { FC, useState } from 'react';
import Modal from '../Modal';
import OrderDetail from './OrderDetail';
import ConfirmDelivery from './ConfirmDelivery';
import ManageComplaint from './ManageComplaint';

interface ModalOrderDetailProps {
  setShow: (isShow:boolean)=>void,
  order: any,
  refreshData: ()=>void,
}

const ModalOrderDetail:FC<ModalOrderDetailProps> = ({ setShow, order, refreshData }) => {
  const [showDelivery, setShowDelivery] = useState(false);
  const [showComplaint, setShowComplaint] = useState(false);

  const children = () => (
    <div className="p-5 pe-3 w-100 text-start">
      {!showDelivery && !showComplaint && (
        <OrderDetail
          order={order}
          toggleDelivery={() => setShowDelivery(true)}
          toggleComplaint={() => setShowComplaint(true)}
        />
      )}
      {showDelivery && (
        <ConfirmDelivery
          closeDelivery={() => setShowDelivery(false)}
          order={order}
          setShowModal={setShow}
          refreshData={refreshData}
        />
      )}
      {showComplaint && (
      <ManageComplaint
        closeComplaint={() => setShowComplaint(false)}
        order={order}
        setShowModal={setShow}
        refreshData={refreshData}
      />
      )}
    </div>
  );

  return (
    <Modal
      modalType="order_detail"
      cancel={() => setShow(false)}
    >
      {children()}
    </Modal>
  );
};

export default ModalOrderDetail;
