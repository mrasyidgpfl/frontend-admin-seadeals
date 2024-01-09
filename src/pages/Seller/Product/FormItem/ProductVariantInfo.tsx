import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import RadioBoolean from '../../../../components/RadioBoolean/RadioBoolean';
import Button from '../../../../components/Button/Button';
import { ReactComponent as IconClose } from '../../../../assets/svg/icon_close.svg';
import InputVariantRow from './Component/InputVariantRow';
import InputVariantName from './Component/InputVariantName';
import BulkEditVariant from './Component/BulkEditVariant';

const ProductVariantInfo:FC<any> = ({
  product, handleOnChange, setProduct, dataVariants, setDataVariants,
}) => {
  const [showVariantTable, setShowVariantTable] = useState(false);
  const [variant1, setVariant1] = useState<any>([]);
  const [variant2, setVariant2] = useState<any>([]);
  const defaultVariantValue = {
    price: 99,
    stock: 1,
    variant_code: '',
    picture_url: '',
    picture_name: '',
  };
  const [bulkVariant, setBulkVariant] = useState<any>(defaultVariantValue);

  const inputVariant1Ref = useRef(null);
  const inputVariant2Ref = useRef(null);

  useEffect(() => {
    setDataVariants({});
    const tmp:any = {};
    variant1.forEach((v1:any, index:number) => {
      if (variant2.length >= 1) {
        variant2.forEach((v2: any, index2: number) => {
          tmp[`${index}-${index2}`] = {
            variant_1_value: v1,
            variant_2_value: v2,
            ...defaultVariantValue,
          };
        });
      } else {
        tmp[`${index}-${undefined}`] = {
          variant_1_value: v1,
          variant_2_value: undefined,
          ...defaultVariantValue,
        };
      }
    });
    setDataVariants(tmp);
  }, [variant1, variant2]);

  const removeVariantByIdx = (varNum1:boolean, index:number) => {
    if (varNum1) {
      setVariant1(variant1.filter((_:any, id:number) => id !== index));
    } else {
      setVariant2(variant2.filter((_:any, id:number) => id !== index));
    }
  };

  const handleChangeByName = (name:string, value:any) => {
    setProduct((data:any) => ({ ...data, [name]: value }));
  };

  const handleChangeDataVariant = (e:any, value:any) => {
    const { name } = e.target;
    const [prop, uniqueID] = name.split('__');
    const tmp = dataVariants[uniqueID];
    if (prop === 'stock' || prop === 'price') {
      tmp[prop] = parseInt(e.target.value, 10);
    } else if (prop === 'picture_url') {
      tmp[prop] = value.picture_url;
      tmp.picture_name = value.picture_name;
    } else {
      tmp[prop] = e.target.value;
    }
    setDataVariants({ ...dataVariants, [uniqueID]: tmp });
  };

  const handleOnChangeBulkVariant = (e:any) => {
    const { name } = e.target;
    setBulkVariant({ ...bulkVariant, [name]: e.target.value });
  };

  const handleOnSubmitBulkVariant = () => {
    const tmp = { ...dataVariants };
    Object.keys(tmp).forEach((dataVariant:any) => {
      Object.keys(bulkVariant).forEach((item:any) => {
        let isNumber = false;
        if (item === 'stock' || item === 'price') {
          isNumber = true;
        }
        tmp[dataVariant][item] = isNumber ? Number(bulkVariant[item]) : bulkVariant[item];
      });
    });
    setDataVariants(tmp);
  };

  const cleanVariant = () => {
    setVariant1([]);
    setVariant2([]);
    handleChangeByName('variant_1_name', null);
    handleChangeByName('variant_2_name', null);
    setDataVariants({});
  };

  return (
    <div className="my-4">
      <h5 className="text-start"><b>Informasi Penjualan</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center">Batas Pembelian</label>
        <div className="col-9 p-0">
          <div className="d-flex flex-row gap-3 align-items-center p-0">
            <div className="p-0 m-0">
              <div className="input-group suffix small p-0">
                <input
                  name="min_quantity"
                  className="form__input p-2"
                  placeholder="Masukkan angka"
                  type="number"
                  onChange={handleOnChange}
                  value={product.min_quantity}
                  min={1}
                  max={10000}
                />
                <span className="input-group-addon">pcs</span>
              </div>
              <p className="input__caption">Minimal pembelian</p>
            </div>
            <span className="text-start text-secondary-blue">-</span>
            <div>
              <div className="input-group suffix small p-0">
                <input
                  name="max_quantity"
                  className="form__input p-2"
                  placeholder="Masukkan angka"
                  type="number"
                  onChange={handleOnChange}
                  value={product.max_quantity}
                  min={1}
                  max={10000}
                />
                <span className="input-group-addon">pcs</span>
              </div>
              <p className="input__caption">Maksimal pembelian</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="name">Tambah Produk Varian</label>
        <div className="col-9 p-0">
          <RadioBoolean
            name="enable_variant"
            data={showVariantTable}
            handleOnChange={() => {
              cleanVariant();
              handleChangeByName('default_price', '');
              handleChangeByName('default_stock', '');
              setShowVariantTable(!showVariantTable);
              setVariant1([]);
            }}
          />
        </div>
      </div>
      {!showVariantTable
        ? (
          <>
            <div className="row my-3">
              <label className="col-3 text-end align-self-center" htmlFor="default_price">
                <span className="text-accent">*</span>
                <span>Harga Produk</span>
              </label>
              <div className="col-9 p-0">
                <div className="row">
                  <div className="input-group prefix">
                    <span className="input-group-addon">Rp</span>
                    <input
                      name="default_price"
                      className="form__input"
                      placeholder="Masukkan angka"
                      type="number"
                      onChange={handleOnChange}
                      required={variant1.length === 0}
                      value={product.default_price}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-3">
              <label className="col-3 text-end align-self-center" htmlFor="default_stock">
                <span className="text-accent">*</span>
                <span>Stok Produk</span>
              </label>
              <div className="col-9 p-0">
                <div className="row">
                  <div className="input-group suffix">
                    <input
                      name="default_stock"
                      className="form__input"
                      placeholder="Masukkan angka"
                      type="number"
                      onChange={handleOnChange}
                      required={variant1.length === 0}
                      value={product.default_stock}
                    />
                    <span className="input-group-addon">Pcs</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
        : (
          <>
            <div className="row my-3">
              <label className="col-3 text-end align-self-center">
                <span className="text-accent">*</span>
                <span>Variasi 1</span>
              </label>
              <div className="col-9 variant__input-container">
                <div className="d-flex gap-3">
                  <input
                    ref={inputVariant1Ref}
                    name="variant_1_name"
                    className="form__input p-2 rounded"
                    placeholder="Masukkan nama variasi"
                    type="text"
                    onChange={handleOnChange}
                    value={product.variant_1_name || ''}
                    required
                  />
                  {product.variant_1_name !== null && (
                  <Button
                    buttonType="primary alt"
                    handleClickedButton={() => { setVariant1([...variant1, '']); }}
                    text="Tambah varian 1"
                  />
                  )}
                </div>
                <div className="row mt-3">
                  {variant1.map((item:any, index:number) => (
                    <div className="col-4">
                      <InputVariantName
                        variantRef={inputVariant1Ref}
                        variant={variant1}
                        setVariant={setVariant1}
                        index={index}
                        setDataVariants={setDataVariants}
                        removeVariantByIdx={() => removeVariantByIdx(true, index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {product.variant_1_name !== null && (
            <div className="row my-3">
              <label className="col-3 text-end align-self-center">Variasi 2</label>
              <div className="col-9 variant__input-container">
                <div className="d-flex gap-3">
                  <input
                    ref={inputVariant2Ref}
                    name="variant_2_name"
                    className="form__input p-2 rounded"
                    placeholder="Masukkan nama variasi"
                    type="text"
                    onChange={handleOnChange}
                    value={product.variant_2_name || ''}
                  />
                  {product.variant_2_name !== null && (
                    <>
                      <Button
                        buttonType="primary alt"
                        handleClickedButton={() => { setVariant2([...variant2, '']); }}
                        text="Tambah varian 2"
                      />
                      {React.createElement(IconClose, {
                        className: 'icon-remove',
                        onClick: () => {
                          setVariant2([]);
                          handleChangeByName('variant_2_name', null);
                          setDataVariants({});
                        },
                      })}
                    </>
                  )}
                </div>
                <div className="row mt-3">
                  {variant2.map((item:any, index:number) => (
                    <div className="col-4">
                      <InputVariantName
                        variantRef={inputVariant2Ref}
                        variant={variant2}
                        setVariant={setVariant2}
                        index={index}
                        setDataVariants={setDataVariants}
                        removeVariantByIdx={() => removeVariantByIdx(false, index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            )}
            {
              variant1.length !== 0 && (
                <div className="row my-3">
                  <label className="col-3 text-end align-self-center">Edit Masal Variasi</label>
                  <div className="col-9 p-0">
                    <BulkEditVariant
                      bulkData={bulkVariant}
                      setDataVariants={setDataVariants}
                      handleOnChange={handleOnChangeBulkVariant}
                      handleOnSubmit={handleOnSubmitBulkVariant}
                    />
                  </div>
                </div>
              )
            }
            <div className="row my-3">
              <label className="col-3 text-end align-self-center">Daftar Variasi</label>
              <div className="col-9 p-0 table-responsive">
                <table className="table border table-hover">
                  <thead>
                    <tr className="table-secondary">
                      <th className="text-start">{product.variant_1_name || 'Variasi'}</th>
                      {
                        product.variant_2_name
                          ? (
                            <th className="d-flex gap-3">
                              <div className="variant2">{product.variant_2_name || 'Variasi 2'}</div>
                              <div className="d-flex justify-content-between w-100">
                                <div className="cell-width large">Harga</div>
                                <div className="cell-width large">Stok</div>
                                <div className="cell-width">Kode Variasi</div>
                                <div className="cell-width">Foto</div>
                              </div>
                            </th>
                          )
                          : (
                            <th className="gap-3 cell-standard">
                              <div className="cell-standard__content cell-width large">Harga</div>
                              <div className="cell-standard__content cell-width large">Stok</div>
                              <div className="cell-standard__content cell-width">Kode Variasi</div>
                              <div className="cell-standard__content cell-width">Foto</div>
                            </th>
                          )
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      variant1.map((item:any, index:string) => (
                        <tr className="cell-content__row" key={`${item}${index + 1}`}>
                          <td className="border py-4 my-2">{item}</td>
                          { product.variant_2_name !== null ? (
                            <>
                              {
                            variant2.map((item2: any, index2: string) => (
                              <tr key={`${item2}${index + 1}`}>
                                {
                                  product.variant_2_name
                                  && (
                                    <td className="variant2 p-4 my-2">
                                      <span className="">{item2}</span>
                                    </td>
                                  )
                                }
                                <td className="py-3">
                                  {
                                    item !== '' && item2 !== '' && (
                                      <InputVariantRow
                                        index={index}
                                        index2={index2}
                                        setDataVariants={setDataVariants}
                                        dataVariants={dataVariants}
                                        handleChangeDataVariant={handleChangeDataVariant}
                                      />
                                    )
                                  }
                                </td>
                              </tr>
                            ))
                          }
                            </>
                          )
                            : (
                              <td>
                                {
                                  item !== '' && (
                                    <InputVariantRow
                                      index={index}
                                      setDataVariants={setDataVariants}
                                      dataVariants={dataVariants}
                                      handleChangeDataVariant={handleChangeDataVariant}
                                    />
                                  )
                                }
                              </td>
                            )}
                        </tr>
                      ))
}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default ProductVariantInfo;
