import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export default function useSellerDeliveryOptions() {
  const axiosPrivate = useAxiosPrivate();
  const [loadingCouriers, setLoadingCouriers] = useState(true);
  const [couriers, setCouriers] = useState<any>([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getDeliveryOptions = () => {
      Promise.all([axiosPrivate.get('couriers'), axiosPrivate.get('sellers/couriers')])
        .then((responses) => {
          const [courierList, usedCourier] = responses;
          const cL = courierList.data.data;
          const uC = usedCourier.data.data;

          const list = cL.map((courier:any) => {
            // eslint-disable-next-line no-param-reassign
            courier.used = !!uC.find((used: any) => used.courier_id === courier.id);
            // eslint-disable-next-line no-param-reassign
            courier.modified = false;
            return courier;
          });

          if (isMounted) {
            setCouriers(list);
            setLoadingCouriers(false);
          }
        });
    };
    getDeliveryOptions();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { loadingCouriers, couriers, setCouriers };
}
