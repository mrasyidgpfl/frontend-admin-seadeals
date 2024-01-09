import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import toast from 'react-hot-toast';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Modal from '../../../../components/Modal/Modal';
import CategoryInput from './CategoryInput';
import storage from '../../../../firebase/firebase';

const ProductMainInfo:FC<any> = ({
  product, handleOnChange, setCategoryID, productPhoto, setProductPhoto, onDeleteClick,
}) => {
  const imageInputRef = useRef<any>();
  const [category, setCategory] = useState({
    id: 0,
    name: '',
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useEffect(() => {
    setCategoryID(category.id);
  }, [category]);

  const handleImageChange = (e:any) => {
    e.preventDefault();
    if (productPhoto.length > 5) {
      return;
    }
    const [file] = e.target.files;
    // In MegaByte
    if ((file.size / 1024 / 1024) > 2) {
      toast.error('Photo tidak bisa lebih dari 2MB');
      return;
    }
    if (file) {
      const namePhoto = `product-photo-${v4()}`;
      const imgRef = ref(storage, `products/${namePhoto}`);

      uploadBytes(imgRef, file).then((snapshot:any) => {
        toast.success('image uploaded');
        getDownloadURL(snapshot.ref).then((url:any) => {
          setProductPhoto([...productPhoto, { name: namePhoto, file, photo_url: url }]);
        });
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);
      imageInputRef.current.value = '';
    }
  };

  return (
    <div className="my-4">
      {
        showCategoryModal
          && (
          <Modal modalType="" cancel={() => setShowCategoryModal(false)}>
            <CategoryInput
              setCatData={setCategory}
              handleClose={() => setShowCategoryModal(false)}
            />
          </Modal>
          )
      }
      <h5 className="text-start"><b>Informasi Dasar</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="photo">
          <span className="text-accent">*</span>
          <span>Foto Produk</span>
        </label>
        <div className="col-9 p-0 d-flex justify-content-start">
          {productPhoto.map(
            (el:any, i:any) => (
              <button className="product-form__image" key={`test${i.toString()}`} type="button" onClick={() => onDeleteClick(i)}>
                <div className="d-flex flex-column justify-content-center product-form__image__filter">
                  <div>
                    X
                  </div>
                </div>
                <img className="img-fit product-form__image" alt={i.toString()} src={el.photo_url} />
              </button>
            ),
          )}
          {productPhoto.length < 5 && (
            <button className="product-form__add-image-button" type="button" onClick={() => { imageInputRef.current.click(); }}>
              <div>
                +
              </div>
            </button>
          )}
          <input
            name="image"
            className="col-9 border rounded p-2 product-form__add-image"
            type="file"
            value={product.product_photos[0]}
            onInput={handleImageChange}
            ref={imageInputRef}
          />
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="name">
          <span className="text-accent">*</span>
          <span>Nama Produk</span>
        </label>
        <input
          name="name"
          className="col-9 border rounded p-2"
          maxLength={100}
          placeholder="Masukkan nama produk"
          type="text"
          required
          value={product.name}
          onChange={handleOnChange}
        />
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center">
          <span className="text-accent">*</span>
          <span>Kategori</span>
        </label>
        <div className="col-9 product-form__category" role="presentation" onClick={() => setShowCategoryModal(true)}>
          <input value={category.name} placeholder="Pilih Kategori" required readOnly />
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="description">
          <span className="text-accent">*</span>
          <span>Deskripsi</span>
        </label>
        <textarea
          name="description"
          className="col-9 border rounded p-2"
          maxLength={2000}
          placeholder="Masukkan deskripsi produk"
          required
          value={product.description}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default ProductMainInfo;
