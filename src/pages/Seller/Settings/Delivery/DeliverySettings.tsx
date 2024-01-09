import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import courierIcon from '../../../../assets/svg/courier.svg';
import printIcon from '../../../../assets/svg/print.svg';
import calendarIcon from '../../../../assets/svg/calendar.svg';
import DeliveryTypeItems from './DeliveryTypeItems';
import './DeliverySettings.scss';
import Button from '../../../../components/Button/Button';
import Toggle from '../../../../components/Toggle/Toggle';
import useSellerDeliveryOptions from '../../../../api/useDeliveryOptions';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import PrintSettingsAPI from '../../../../api/printSettings';
import LoadingPlain from '../../../../components/Loading/LoadingPlain';

const DeliverySettings = () => {
  const axiosPrivate = useAxiosPrivate();
  const { loadingCouriers, couriers, setCouriers } = useSellerDeliveryOptions();
  const [loadingPrintSettings, setLoadingPrintSettings] = useState(true);
  const [printSettings, setPrintSettings] = useState({ modified: false, allowPrint: false });

  useEffect(() => {
    const getSellerPrintSettings = async () => {
      await PrintSettingsAPI.GetSellerPrintSettings(axiosPrivate)
        .then((resp:any) => {
          const { data } = resp.data;
          const settings = { modified: false, allowPrint: data.allow_print };
          setPrintSettings(settings);
          setLoadingPrintSettings(false);
        })
        .catch((err:any) => toast.error(err.response?.data?.message));
    };
    getSellerPrintSettings().then();
  }, []);

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const updateOptions = async () => {
    const updateCourierURL = 'sellers/couriers';
    const updates = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const courier of couriers) {
      if (courier.modified) {
        updates.push({ courier_id: courier.id, is_selected: courier.used });
      }
    }

    const promises = updates.map((update) => axiosPrivate.post(
      updateCourierURL,
      JSON.stringify(update),
    ));

    const settingsPromise = PrintSettingsAPI.UpdateSellerPrintSettings(
      axiosPrivate,
      printSettings.allowPrint,
    );

    await Promise.all([...promises, settingsPromise]);
  };

  const togglePrintSettings = () => {
    setPrintSettings((prevState) => ({
      allowPrint: !prevState.allowPrint,
      modified: !prevState.modified,
    }));
  };

  const handleSaveOptions = async () => {
    if (loadingUpdate) return;

    setLoadingUpdate(true);
    toast.loading('menyimpan perubahan');
    try {
      await updateOptions();
      toast.dismiss();
      toast.success('perubahan tersimpan!');
      setLoadingUpdate(false);
    } catch (e) {
      toast.dismiss();
      toast.error('perubahan gagal disimpan');
    }
  };

  return (
    <div className="py-4">
      <div className="container bg-white text-start border-bottom-dashed p-4 px-5">
        <p className="fs-4 fw-bold mb-1">Pengaturan Pengiriman</p>
        <p className="text-secondary">Atur Pengiriman pada Toko Anda</p>
      </div>
      <div className="container bg-white text-start border-bottom-dashed px-5 py-4">
        <div className="d-flex align-items-center gap-4 mb-4">
          <img src={courierIcon} alt="Jasa Kirim" height="46px" />
          <div className="">
            <p className="fw-bold fs-5">Jasa Kirim</p>
            <p className="fs-6 text-secondary">Atur Jasa Kirim yang Anda Inginkan</p>
          </div>
        </div>
        <div className="">
          <div className="mb-4">
            <DeliveryTypeItems
              loading={loadingCouriers}
              couriers={couriers}
              setCouriers={setCouriers}
            />
          </div>
        </div>
      </div>
      <div className="container bg-white text-start border-bottom-dashed px-5 py-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <img src={printIcon} alt="Jasa Kirim" height="46px" />
            <div className="">
              <p className="fw-bold fs-5">Cetak Mode Thermal</p>
              <p className="fs-6 text-secondary">Aktifkan Cetak Mode Thermal jika kamu ingin mencetak label pengiriman untuk semua jasa kirim.</p>
            </div>
          </div>
          {loadingPrintSettings
            ? (
              <div className="text-center py-2 text-secondary">
                <LoadingPlain height={68} />
              </div>
            )
            : <Toggle id={0} inputID="thermal" isChecked={printSettings.allowPrint} handleChange={() => togglePrintSettings()} />}
        </div>
      </div>
      <div className="container bg-white text-start border-bottom-dashed px-5 py-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <img src={calendarIcon} alt="Jasa Kirim" height="46px" />
            <div className="">
              <p className="fw-bold fs-5">Dikirim Dalam</p>
              <p className="fs-6 text-secondary">Ubah jumlah hari &quot;Dikirim dalam&quot; untuk semua produk yang ada di toko Anda.</p>
            </div>
          </div>
          <input disabled value={2} className="form-control text-end" style={{ width: '10%' }} />
        </div>
      </div>
      <div className="container bg-white text-start border-bottom-dashed px-5 py-4">
        <Button buttonType={`ms-auto ${loadingUpdate ? 'disabled' : 'primary'}`} text="Simpan Perubahan" handleClickedButton={() => handleSaveOptions()} />
      </div>
    </div>
  );
};
export default DeliverySettings;
