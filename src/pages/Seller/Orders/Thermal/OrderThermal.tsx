import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Thermal from '../../../../constants/thermal';
import ThermalDocument from '../../../../components/PDF/Thermal/ThermalDocument';
import useAxiosPrivateWithoutNavigate from '../../../../hooks/useAxiosPrivateWithoutNavigation';

const UserOrder = () => {
  const { id } = useParams();

  const [data, setData] = useState<Thermal>({
    courier: { code: '', name: '' },
    issued_at: '',
    price: 0,
    buyer: { address: '', city: '', name: '' },
    delivery_number: '',
    origin_city: '',
    products: [],
    seller_name: '',
    total_weight: 0,
  });
  const [thermalLoading, setThermalLoading] = useState<boolean>(true);

  const axiosPrivate = useAxiosPrivateWithoutNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getReceipt = async () => {
      try {
        const response = await axiosPrivate.get(`seller/orders/thermal/${id}`, {
          signal: controller.signal,
        });
        const result = response.data;
        if (isMounted) {
          setThermalLoading(false);
          setData(result.data);
        }
      } catch (err) {
        toast.error('Gagal Memuat Thermal Order');
      }
    };
    getReceipt().then();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (thermalLoading) return <div>Loading...</div>;

  return (
    <div className="d-flex my-4 col-8">
      <PDFViewer width="100%" height={2000}>
        <ThermalDocument data={data} />
      </PDFViewer>
    </div>
  );
};

export default UserOrder;
