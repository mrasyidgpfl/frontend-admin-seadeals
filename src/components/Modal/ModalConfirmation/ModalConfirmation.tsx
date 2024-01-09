import React, { FC } from 'react';
import Button from '../../Button/Button';
import Modal from '../Modal';
import './ModalConfirmation.scss';

const ModalConfirmation:FC<any> = ({
  text, handleClose, handleConfirm, setShowModal,
}) => {
  const children = () => (
    <div className="text-center p-4">
      <span>{text}</span>
      <div className="d-flex justify-content-end gap-3 my-2">
        <Button buttonType="secondary alt" handleClickedButton={handleClose} text="Tidak" />
        <Button buttonType="primary" handleClickedButton={handleConfirm} text="Ya" />
      </div>
    </div>
  );

  return (
    <Modal modalType="confirmation" cancel={() => setShowModal(false)}>
      {children()}
    </Modal>
  );
};

export default ModalConfirmation;
