import React, {
  FC, useEffect, useState,
} from 'react';
import toast from 'react-hot-toast';
import VoucherConstant from '../../../../constants/voucher';
import '../Promotions.scss';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import ProductListInfo from './ProductListInfo';
import ProductAPI from '../../../../api/product';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import PromotionsAPI from '../../../../api/promotions';

const PromotionBonusInfo:FC<any> = ({
  promotion, setPromotions, formType, handleOnChange,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [show, setShow] = useState<any>(false);

  const [products, setProducts] = useState<any>([]);
  const [deletedID, setDeletedID] = useState(undefined);

  const [quota, setQuota] = useState<any>('');
  const [maxQuota, setMaxQuota] = useState<any>('');

  const [globalQuota, setGlobalQuota] = useState<any>(false);

  const [tDFetch, setTDFetch] = useState<any>(false);
  const [tempData, setTempData] = useState<any>([]);
  const [unavailableProductsIds, setUnavailableProductsIds] = useState<any>([]);
  const [uPFetch, setUPFetch] = useState<any>(false);
  useEffect(() => {
    PromotionsAPI.GetPromotions(axiosPrivate, null)
      .then((resp:any) => {
        const { data } = resp.data;
        setTempData(data);
        setTDFetch(true);
      })
      .catch((err:any) => toast.error(err.response?.data?.message));
  }, []);

  useEffect(() => {
    if (tDFetch) {
      tempData.forEach((promo:any) => {
        if (promo.status === 'ongoing' || promo.status === 'upcoming') {
          setUnavailableProductsIds((prev:any) => [...prev, promo.product_id]);
        }
      });
      setUPFetch(true);
    }
  }, [tDFetch, promotion.start_date, promotion.end_date]);

  const findProducts = async () => {
    await ProductAPI.FindProductBySellerID(axiosPrivate, null)
      .then((resp:any) => {
        const { data } = resp.data;
        data.products.forEach((product:any) => {
          if (!unavailableProductsIds.includes(product.id)) {
            setProducts((prev:any) => [...prev, product]);
          }
        });
      })
      .catch((err:any) => toast.error(err.response?.data?.message));
  };

  useEffect(() => {
    if (uPFetch) {
      findProducts().then();
    }
  }, [uPFetch, deletedID]);

  const [addedProduct, setAddedProduct] = useState<any>();
  const [currentProduct, setCurrentProduct] = useState<any>();

  const handleSetCurrentProduct = (e:any) => {
    setCurrentProduct(e.target.value);
  };

  const handleAddProduct = () => {
    setAddedProduct(currentProduct);
    setShow(false);
  };

  return (
    <div className="my-4">
      <h5 className="text-start"><b>Pengaturan Bonus</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="amount_type">Tipe promosi</label>
        <div className="col-9">
          <div className="d-flex gap-3">
            <div>
              <input
                type="radio"
                id="percentage"
                name="amount_type"
                onChange={handleOnChange}
                value="percentage"
                readOnly={formType === VoucherConstant.SHOW}
                disabled={formType === VoucherConstant.SHOW}
                checked={promotion.amount_type === VoucherConstant.PERCENTAGE}
              />
              <label htmlFor="percentage" className="mx-1">Persentase</label>
              <br />
            </div>
            <div>
              <input
                type="radio"
                id="nominal"
                name="amount_type"
                onChange={handleOnChange}
                value="nominal"
                readOnly={formType === VoucherConstant.SHOW}
                disabled={formType === VoucherConstant.SHOW}
                checked={promotion.amount_type === VoucherConstant.NOMINAL}
              />
              <label htmlFor="nominal" className="mx-1">Nominal</label>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="amount">Promosi</label>
        <div className="col-9">
          <div className="row">
            {
                  promotion.amount_type === VoucherConstant.NOMINAL
                  && (
                  <div className="input-group prefix p-0">
                    <span className="input-group-addon">Rp</span>
                    <input
                      name="amount"
                      className="form__input"
                      placeholder="Masukkan angka"
                      type="number"
                      onChange={handleOnChange}
                      required
                      value={promotion.amount}
                      readOnly={formType === VoucherConstant.SHOW}
                      disabled={formType === VoucherConstant.SHOW}
                    />
                  </div>
                  )
              }
            {
                  promotion.amount_type === VoucherConstant.PERCENTAGE
                  && (
                  <div className="input-group suffix p-0">
                    <input
                      name="amount"
                      min={0}
                      max={100}
                      className="form__input"
                      placeholder="Masukkan angka"
                      type="number"
                      onChange={handleOnChange}
                      required
                      value={promotion.amount}
                      readOnly={formType === VoucherConstant.SHOW}
                      disabled={formType === VoucherConstant.SHOW}
                    />
                    <span className="input-group-addon">% (Persen)</span>
                  </div>
                  )
              }
          </div>
        </div>
      </div>
      <h5 className="text-start"><b>Pengaturan Bawaan (Ganti Semua)</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="quota">Kuota promosi</label>
        <div className="col-9">
          <div className="row">
            <div className="input-group prefix p-0">
              <input
                name="quota"
                className="form__input"
                placeholder="Masukkan angka"
                type="number"
                required
                value={promotion.quota}
                readOnly={formType === VoucherConstant.SHOW}
                disabled={formType === VoucherConstant.SHOW}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="max_quota">Kuantitas maksimal</label>
        <div className="col-9">
          <div className="row">
            <div className="input-group prefix p-0">
              <input
                name="max_quota"
                className="form__input"
                placeholder="Masukkan angka"
                type="number"
                required
                value={promotion.max_quota}
                readOnly={formType === VoucherConstant.SHOW}
                disabled={formType === VoucherConstant.SHOW}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="max_quota">Ubah Semua</label>
        <div className="col-9">
          <Button buttonType="secondary alt" text="Ubah" handleClickedButton={() => setGlobalQuota(true)} />
        </div>
      </div>
      {
            promotion.amount > 0 && (
            <>
              <h5 className="text-start"><b>Pengaturan Produk</b></h5>
              <div className="row my-3">
                <label className="col-3 text-end align-self-center" htmlFor="promosi-per-produk">Produk</label>
                <div className="col-9">
                  <Button buttonType="secondary alt" text="Tambah" handleClickedButton={() => setShow(true)} />
                  {
                          show && (
                          <Modal modalType="" cancel={() => setShow(false)}>
                            <div className="d-flex py-5 justify-content-center">
                              <div className="row px-5">
                                <h5 className="text-start mb-4"><b>Tambah promosi per produk</b></h5>
                                <div className="row mt-2 mb-5">
                                  <label className="col-3 text-end align-self-center mb-3" htmlFor="product">Pilih produk</label>
                                  <div className="col-9 p-0 mb-3">
                                    <select className="form-select my-auto" onChange={handleSetCurrentProduct} defaultValue="choose product">
                                      <option value="choose product" disabled>Pilih produk</option>
                                      {
                                            products.map(
                                              (
                                                product:any,
                                              ) => (
                                                <option
                                                  key={product.id}
                                                  value={product.id}
                                                >
                                                  {product.name}
                                                </option>
                                              ),
                                            )
                                          }
                                    </select>
                                  </div>
                                  <label className="col-3 text-end align-self-center mb-3" htmlFor="product">Kuota Promosi</label>
                                  <div className="col-9 p-0 mb-3">
                                    <input className="form-control" placeholder="Masukkan jumlah kuota promosi" onChange={(e) => setQuota(e.target.value)} />
                                  </div>
                                  <label className="col-3 text-end align-self-center" htmlFor="product">Jumlah Maksimal</label>
                                  <div className="col-9 p-0">
                                    <input className="form-control" placeholder="Masukkan jumlah maksimal" onChange={(e) => setMaxQuota(e.target.value)} />
                                  </div>
                                </div>
                                <div className="d-inline-flex justify-content-end gap-3">
                                  <Button buttonType="secondary alt" text="Tutup" handleClickedButton={() => setShow(false)} />
                                  <Button buttonType="primary" text="Tambah" handleClickedButton={handleAddProduct} />
                                </div>
                              </div>
                            </div>
                          </Modal>
                          )
                      }
                </div>
              </div>
              <ProductListInfo
                addedProduct={addedProduct}
                products={products}
                promotion={promotion}
                setPromotions={setPromotions}
                setDeletedID={setDeletedID}
                discount={promotion.amount}
                quota={quota === '' ? promotion.quota : quota}
                globalQuota={globalQuota}
                setGlobalQuota={setGlobalQuota}
                globalQuotaValue={quota === '' ? promotion.quota : quota}
                globalMaxQuotaValue={maxQuota === '' ? promotion.max_quota : maxQuota}
                setQuota={setQuota}
                maxQuota={maxQuota === '' ? promotion.max_quota : maxQuota}
                setMaxQuota={setMaxQuota}
                promotionType={promotion.amount_type}
              />
            </>
            )
        }
    </div>
  );
};

export default PromotionBonusInfo;
