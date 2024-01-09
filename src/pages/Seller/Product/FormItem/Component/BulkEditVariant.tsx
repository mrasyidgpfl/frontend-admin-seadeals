import React, { FC } from 'react';
import Button from '../../../../../components/Button/Button';

const BulkEditVariant:FC<any> = ({ bulkData, handleOnChange, handleOnSubmit }) => (
  <div className="my-2 gap-3 d-flex rounded bg-lightgray">
    <div className="p-2">
      <div className="input-group prefix">
        <span className="input-group-addon">Rp</span>
        <input
          name="price"
          className="form__input"
          placeholder="Masukkan angka"
          type="number"
          value={bulkData.price}
          onChange={handleOnChange}
        />
      </div>
    </div>
    <div className="p-2">
      <div className="input-group suffix">
        <input
          name="stock"
          className="form__input"
          placeholder="Masukkan angka"
          type="number"
          value={bulkData.stock}
          onChange={handleOnChange}
        />
        <span className="input-group-addon">Pcs</span>
      </div>
    </div>
    <div className="p-2">
      <input
        name="variant_code"
        className="form__input rounded"
        placeholder="Masukkan kode"
        type="text"
        value={bulkData.variant_code}
        onChange={handleOnChange}
      />
    </div>
    <div className="p-2">
      <Button buttonType="primary alt" handleClickedButton={handleOnSubmit} text="Terapkan" />
    </div>
  </div>
);

export default BulkEditVariant;
