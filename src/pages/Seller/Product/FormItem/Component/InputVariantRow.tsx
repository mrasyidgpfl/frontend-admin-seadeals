import React, { FC, useRef } from 'react';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';
import {
  deleteObject, getDownloadURL, ref, uploadBytes,
} from 'firebase/storage';
import storage from '../../../../../firebase/firebase';

const InputVariantRow:FC<any> = ({
  index, index2, handleChangeDataVariant, dataVariants, setDataVariants,
}) => {
  const uniqueID = `${index}-${index2}`;
  const imageInputRef = useRef<any>();

  const handleImageChange = (e:any) => {
    e.preventDefault();
    const [file] = e.target.files;
    // In MegaByte
    if ((file.size / 1024 / 1024) > 2) {
      toast.error('Foto tidak bisa lebih dari 2MB');
      return;
    }
    if (file) {
      const namePhoto = `product-variant-photo-${v4()}`;
      const imgRef = ref(storage, `products/${namePhoto}`);

      uploadBytes(imgRef, file).then((snapshot) => {
        toast.success('foto varian diupload');
        getDownloadURL(snapshot.ref).then((url) => {
          handleChangeDataVariant(e, { picture_url: url, picture_name: namePhoto });
        });
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      imageInputRef.current.value = '';
    }
  };

  const onDeleteClick = (e:any) => {
    e.preventDefault();
    const photoName = dataVariants[uniqueID].picture_name;
    const imgRef = ref(storage, `products/${photoName}`);

    deleteObject(imgRef).then(() => {
      toast.success('image deleted');
      const tmp = { ...dataVariants };
      tmp[uniqueID].picture_name = '';
      tmp[uniqueID].picture_url = '';
      setDataVariants(tmp);
    }).catch((errDelete:any) => {
      toast.error(errDelete);
    });
  };

  return (
    <div className="gap-3 cell-standard">
      <div className="d-flex align-items-center">
        <div className="input-group prefix">
          <span className="input-group-addon">Rp</span>
          <input
            name={`price__${uniqueID}`}
            className="form__input"
            placeholder="Masukkan angka"
            type="number"
            required
            min={99}
            value={dataVariants[uniqueID]?.price}
            onChange={handleChangeDataVariant}
          />
        </div>
      </div>
      <div className="d-flex align-items-center">
        <div>
          <div className="input-group suffix">
            <input
              name={`stock__${uniqueID}`}
              className="form__input"
              placeholder="Masukkan angka"
              type="number"
              required
              onChange={handleChangeDataVariant}
              min={1}
              value={dataVariants[uniqueID]?.stock}
            />
            <span className="input-group-addon">pcs</span>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <input
          name={`variant_code__${uniqueID}`}
          className="form__input rounded"
          placeholder="Masukkan kode"
          type="text"
          required
          onChange={handleChangeDataVariant}
          value={dataVariants[uniqueID]?.variant_code}
        />
      </div>
      <div className="cell__image">
        {dataVariants[uniqueID]?.picture_url ? (
          <button className="cell__image-item" type="button" onClick={onDeleteClick}>
            <img className="cell__image-item" alt={`variant ${uniqueID}`} src={dataVariants[uniqueID]?.picture_url} />
          </button>
        ) : (
          <div className="d-flex justify-content-center">
            <button className="cell__image-item plus" type="button" onClick={() => { imageInputRef.current.click(); }}>
              <div>
                +
              </div>
            </button>
          </div>
        )}
        <input
          name={`picture_url__${uniqueID}`}
          className="col-9 border rounded p-2 product-form__add-image"
          type="file"
          onInput={handleImageChange}
          ref={imageInputRef}
        />
      </div>
    </div>
  );
};

export default InputVariantRow;
