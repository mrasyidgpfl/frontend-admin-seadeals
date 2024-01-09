import { AxiosInstance } from 'axios';

const OrderDetailsAPI = {
  GetOrderDetails: (ax:AxiosInstance, orderID:number) => ax.get(`/seller/orders/thermal/${orderID}`),
};

export default OrderDetailsAPI;
