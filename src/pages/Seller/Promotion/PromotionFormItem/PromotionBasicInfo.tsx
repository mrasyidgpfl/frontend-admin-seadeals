import React, { FC, useEffect, useRef } from 'react';
import '../Promotions.scss';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';
import {
  getDownloadURL, ref, uploadBytes,
} from 'firebase/storage';
import VoucherConstant from '../../../../constants/voucher';
import storage from '../../../../firebase/firebase';
import formatter from '../../../../utils/formatter';

const PromotionBasicInfo:FC<any> = ({
  promotion, formType, handleOnChange, setPromotion, onDeleteBanner,
}) => {
  const timeNow = formatter.TimeNowString(2);
  const imageInputRef = useRef<any>();

  const handleImageChange = (e:any) => {
    e.preventDefault();
    const [file] = e.target.files;
    // In MegaByte
    if ((file.size / 1024 / 1024) > 2) {
      toast.error('Photo tidak bisa lebih dari 2MB');
      return;
    }
    if (file) {
      const namePhoto = `promotion-photo-${promotion.name}-${v4()}`;
      const imgRef = ref(storage, `banners/${namePhoto}`);

      uploadBytes(imgRef, file).then((snapshot:any) => {
        toast.success('image uploaded');
        getDownloadURL(snapshot.ref).then((url:any) => {
          setPromotion({ ...promotion, banner_name: namePhoto, banner_url: url });
        });
      });
      imageInputRef.current.value = '';
    }
  };

  useEffect(() => {
    setPromotion({ ...promotion, start_date: timeNow, end_date: timeNow });
  }, []);

  return (
    <div className="my-4">
      <h5 className="text-start"><b>Rincian Dasar</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="name">Banner Promosi</label>
        <div className="col-9 p-0 d-flex justify-content-start">
          {
            promotion.banner_url ? (
              <button className="promo-image" type="button" onClick={onDeleteBanner}>
                <div className="d-flex flex-column justify-content-center promo-image__filter">
                  <div>
                    X
                  </div>
                </div>
                <img className="img-fit promo-image" alt={promotion.name} src={promotion.banner_url} />
              </button>
            ) : (
              <button className="promo-image bordered" type="button" onClick={() => { imageInputRef.current.click(); }}>
                <div>
                  +
                </div>
              </button>
            )
          }
          <input
            name="image"
            className="d-none"
            type="file"
            onInput={handleImageChange}
            ref={imageInputRef}
          />
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="name">Nama Promosi</label>
        <input
          name="name"
          className="col-9 border rounded p-2"
          maxLength={100}
          placeholder="Masukkan nama promosi"
          type="text"
          required
          value={promotion.name}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
          onChange={handleOnChange}
        />
      </div>
      <div className="row my-3">
        <label className="col-3 text-end" htmlFor="code">Deskripsi</label>
        <div className="col-9">
          <div className="row">
            <div className="input-group prefix p-0">
              <textarea
                className="form__input form-control"
                name="description"
                maxLength={255}
                placeholder="Masukkan deskripsi promosi"
                required
                value={promotion.description}
                readOnly={formType !== VoucherConstant.CREATE}
                disabled={formType !== VoucherConstant.CREATE}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="start_date">Periode promosi</label>
        <input
          name="start_date"
          className="col-4 border rounded p-2"
          min={timeNow}
          type="datetime-local"
          required
          step={1}
          value={promotion.start_date}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
          onChange={handleOnChange}
        />
        <span className="col-1 p-2"> - </span>
        <input
          name="end_date"
          className="col-4 border rounded p-2"
          min={promotion.start_date}
          type="datetime-local"
          step={1}
          required
          value={promotion.end_date}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default PromotionBasicInfo;
