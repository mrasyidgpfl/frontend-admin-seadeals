import React, { FC } from 'react';
import CourierBox from './CourierBox';
import LoadingPlain from '../../../../components/Loading/LoadingPlain';

interface DeliveryTypeItemsProps {
  loading: boolean,
  couriers: any[],
  setCouriers: any,
}

const DeliveryTypeItems:FC<DeliveryTypeItemsProps> = ({ loading, couriers, setCouriers }) => {
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    const { checked } = e.target;

    const newOptions = couriers.map((cour) => {
      if (cour.id === parseInt(id, 10)) {
        // eslint-disable-next-line no-param-reassign
        cour.used = checked;
        // eslint-disable-next-line no-param-reassign
        cour.modified = !cour.modified;
      }
      return cour;
    });
    setCouriers(newOptions);
  };

  return (
    <div className="delivery_type_couriers mb-4">
      {loading
        ? (
          <div className="text-center py-2 text-secondary">
            <LoadingPlain height={68} />
            Memuat Daftar Jasa Kirim
          </div>
        )
        : couriers.map((cour) => (
          <CourierBox
            key={cour.id}
            courier={cour}
            handleChange={handleOptionChange}
          />
        ))}
    </div>
  );
};

export default DeliveryTypeItems;
