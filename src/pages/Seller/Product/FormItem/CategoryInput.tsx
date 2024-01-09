import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import ProductAPI from '../../../../api/product';
import Button from '../../../../components/Button/Button';
import { ReactComponent as IconChevron } from '../../../../assets/svg/icon_chevron_right.svg';

const CategoryInput:FC<any> = ({ handleClose, setCatData }) => {
  const [categories, setCategories] = useState([]);
  const [categories2nd, setCategories2nd] = useState([]);
  const [categories3rd, setCategories3rd] = useState([]);
  const defaultCat = { name: '', parent_id: null };
  const [category, setCategory] = useState({ ...defaultCat });
  const axiosPrivate = useAxiosPrivate();

  const findAllCategories = async () => {
    const filter = 'findAll=true';
    await ProductAPI.FindAllCategories(axiosPrivate, filter)
      .then((resp:any) => {
        const { data } = resp.data;
        setCategories(data.categories);
      })
      .catch((err:any) => toast.error(err.response?.data?.message));
  };

  const handleChooseCategory = (cat:any, depth:number) => {
    if (depth === 2) {
      setCategories3rd([]);
    } else if (depth === 1) {
      setCategories2nd([]);
      setCategories3rd([]);
    }
    setCategory(defaultCat);
    if (cat.children?.length !== 0 && depth === 1) {
      setCategories2nd(cat.children);
    } else if (cat.children?.length !== 0 && depth === 2) {
      setCategories3rd(cat.children);
    } else {
      setCategory(cat);
    }
  };

  const handleSubmit = () => {
    setCatData(category);
    handleClose();
    toast.success('berhasil mengubah kategori');
  };

  useEffect(() => {
    findAllCategories().then();
  }, []);

  return (
    <div className="d-flex flex-column p-4 w-75">
      <h5 className="mb-4 text-main text-start">Ubah Kategori</h5>
      <div className="category__container">
        <div className="category__scroll">
          {categories.map((item:any) => (
            <div className="category__item" key={item.id} role="presentation" onClick={() => handleChooseCategory(item, 1)}>
              <Button buttonType="plain category__item-button cat1" text={item.name} handleClickedButton={() => handleChooseCategory(item, 1)} />
              {item?.children?.length !== 0 && React.createElement(IconChevron, { className: 'category__chevron-icon' })}
            </div>
          ))}
        </div>
        {
          categories2nd !== null && category !== null
          && (
          <div className="category__scroll">
            {categories2nd.map((item:any) => (
              <div className="category__item" key={item.id}>
                <Button buttonType="plain category__item-button cat2" text={item.name} handleClickedButton={() => handleChooseCategory(item, 2)} />
                {item?.children?.length !== 0 && React.createElement(IconChevron, { className: 'category__chevron-icon' })}
              </div>
            ))}
          </div>
          )
        }
        {
          categories3rd !== null && categories2nd !== null && category !== null
          && (
          <div className="category__scroll">
            {categories3rd.map((item:any) => (
              <div className="category__item">
                <Button buttonType="plain category__item-button cat2" text={item.name} handleClickedButton={() => handleChooseCategory(item, 3)} />
              </div>
            ))}
          </div>
          )
        }
      </div>
      <p className="text-start">{`Kategori yang kamu pilih adalah ${category.name}`}</p>
      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button
          buttonType="secondary alt"
          text="Batal"
          handleClickedButton={() => {
            setCategory(defaultCat);
            handleClose();
          }}
        />
        <Button buttonType={category.name === '' ? 'plain' : 'primary'} text="Simpan Kategori" handleClickedButton={handleSubmit} isDisabled={category.name === ''} />
      </div>
    </div>
  );
};

export default CategoryInput;
