import { AxiosInstance } from 'axios';

const PrintSettingsAPI = {
  GetSellerPrintSettings: (ax:AxiosInstance) => ax.get('/seller/settings/print'),

  UpdateSellerPrintSettings: (ax:AxiosInstance, allowPrint:boolean) => {
    const payload = { allow_print: allowPrint };
    return ax.patch('/seller/settings/print', payload);
  },
};

export default PrintSettingsAPI;
