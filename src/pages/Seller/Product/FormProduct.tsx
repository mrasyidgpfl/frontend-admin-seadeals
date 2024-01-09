import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { deleteObject, ref } from 'firebase/storage';
import Button from '../../../components/Button/Button';
import ProductMainInfo from './FormItem/ProductMainInfo';
import ProductVariantInfo from './FormItem/ProductVariantInfo';
import ProductOtherInfo from './FormItem/ProductOtherInfo';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import storage from '../../../firebase/firebase';

const CREATE_PRODUCT_URL = 'sellers/create-product';

const FormProduct:FC<any> = ({
  title,
}) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [dataVariants, setDataVariants] = useState<any>({});
  const [productPhoto, setProductPhoto] = useState<any[]>([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category_id: 0,
    is_bulk_enabled: false,
    min_quantity: '',
    max_quantity: '',
    video_url: '',
    is_hazardous: false,
    condition_status: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    default_price: '',
    default_stock: '',
    variant_1_name: null,
    variant_2_name: null,
    product_photos: [],
    variant_array: [],
  });

  const handleOnChange = (e: any) => {
    let isBool = false;
    if (e.target.name === 'is_hazardous') {
      isBool = true;
    }

    setProduct({
      ...product,
      [e.target.name]: isBool ? Boolean(e.target.value) : e.target.value,
    });
  };

  const setCategoryID = (categoryID:any) => {
    setProduct({
      ...product,
      category_id: categoryID,
    });
  };

  const handleSubmit = async () => {
    try {
      if (productPhoto.length < 1) {
        toast.error('Minimal terdapat 1 foto produk');
        return;
      }

      let variantArray:any = null;
      if (dataVariants) {
        variantArray = [];
        Object.keys(dataVariants).forEach((dataVariant:any) => {
          variantArray.push({ product_variant_details: dataVariants[dataVariant] });
        });
      }

      const body = {
        name: product.name,
        category_id: product.category_id,
        is_bulk_enabled: false,
        min_quantity: Number(product.min_quantity) === 0 ? null : Number(product.min_quantity),
        max_quantity: Number(product.max_quantity) === 0 ? null : Number(product.max_quantity),
        variant_1_name: product.variant_1_name,
        variant_2_name: product.variant_2_name,
        default_price: Number(product.default_price),
        default_stock: Number(product.default_stock),
        product_detail_req: {
          description: product.description,
          video_url: product.video_url,
          is_hazardous: product.is_hazardous,
          condition_status: product.condition_status,
          weight: Number(product.weight),
          length: Number(product.length),
          width: Number(product.width),
          height: Number(product.height),
        },
        product_photos: productPhoto,
        variant_array: variantArray,
      };
      const response = await axiosPrivate.post(
        CREATE_PRODUCT_URL,
        JSON.stringify(body),
      );
      if (response.status === 200) {
        toast.success('produk baru berhasil dibuat');
      }
      navigate('/seller/product/list');
    } catch (err:any) {
      toast.error(err.response?.data?.message);
    }
  };

  const onDeleteClick = (idx:number) => {
    const photo = productPhoto[idx];
    const imgRef = ref(storage, `products/${photo.name}`);

    deleteObject(imgRef).then(() => {
      toast.success('image deleted');
      setProductPhoto(productPhoto.filter((el:any, i:any) => (i !== idx)));
    }).catch((errDelete:any) => {
      toast.error(errDelete);
    });
  };

  const handleAbort = () => {
    productPhoto.forEach((_, index) => {
      onDeleteClick(index);
    });
    navigate('/seller/product/list');
  };

  return (
    <div className="product-form__container">
      <h3 className="mb-4 mt-2">{title}</h3>
      <div className="product-form__content">
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit().then();
        }}
        >
          <ProductMainInfo
            product={product}
            handleOnChange={handleOnChange}
            setCategoryID={setCategoryID}
            productPhoto={productPhoto}
            setProductPhoto={setProductPhoto}
            onDeleteClick={onDeleteClick}
          />
          <ProductVariantInfo
            product={product}
            handleOnChange={handleOnChange}
            setProduct={setProduct}
            dataVariants={dataVariants}
            setDataVariants={setDataVariants}
          />
          <ProductOtherInfo product={product} handleOnChange={handleOnChange} />
          <div className="d-flex flex-row-reverse gap-3">
            <Button isSubmit buttonType="primary" handleClickedButton={() => {}} text="Simpan" />
            <Button
              buttonType="secondary alt"
              handleClickedButton={() => {
                handleAbort();
              }}
              text="Batal"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProduct;
