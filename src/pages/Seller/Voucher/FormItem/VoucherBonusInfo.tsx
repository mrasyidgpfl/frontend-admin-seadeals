import React, { FC } from 'react';
import VoucherConstant from '../../../../constants/voucher';
import '../Voucher.scss';

const VoucherBonusInfo:FC<any> = ({ voucher, formType, handleOnChange }) => (
  <div className="my-4">
    <h5 className="text-start"><b>Pengaturan Bonus</b></h5>
    <div className="row my-3">
      <label className="col-3 text-end align-self-center" htmlFor="amount_type">Tipe voucher</label>
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
              checked={voucher.amount_type === VoucherConstant.PERCENTAGE}
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
              checked={voucher.amount_type === VoucherConstant.NOMINAL}
            />
            <label htmlFor="nominal" className="mx-1">Nominal</label>
            <br />
          </div>
        </div>
      </div>
    </div>
    <div className="row my-3">
      <label className="col-3 text-end align-self-center" htmlFor="amount">Voucher</label>
      <div className="col-9">
        <div className="row">
          {
            voucher.amount_type === VoucherConstant.NOMINAL
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
                  value={voucher.amount}
                  readOnly={formType === VoucherConstant.SHOW}
                  disabled={formType === VoucherConstant.SHOW}
                />
              </div>
            )
          }
          {
            voucher.amount_type === VoucherConstant.PERCENTAGE
            && (
              <div className="input-group suffix p-0">
                <input
                  name="amount"
                  max={100}
                  className="form__input"
                  placeholder="Masukkan angka"
                  type="number"
                  onChange={handleOnChange}
                  required
                  value={voucher.amount}
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
    <div className="row my-3">
      <label className="col-3 text-end align-self-center" htmlFor="quota">Kuota voucher</label>
      <input
        name="quota"
        className="col-9 border rounded p-2"
        type="number"
        placeholder="Masukkan angka"
        required
        value={voucher.quota}
        readOnly={formType === VoucherConstant.SHOW}
        disabled={formType === VoucherConstant.SHOW}
        onChange={handleOnChange}
      />
    </div>
    <div className="row my-3">
      <label className="col-3 text-end align-self-center" htmlFor="min_spending">Minimal pembelian</label>
      <div className="col-9">
        <div className="row">
          <div className="input-group prefix p-0">
            <span className="input-group-addon">Rp</span>
            <input
              name="min_spending"
              className="form__input"
              placeholder="Masukkan angka"
              type="number"
              required
              value={voucher.min_spending}
              readOnly={formType === VoucherConstant.SHOW}
              disabled={formType === VoucherConstant.SHOW}
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default VoucherBonusInfo;
