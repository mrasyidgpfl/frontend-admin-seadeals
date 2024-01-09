import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import ProductAPI from '../../../../api/product';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Button from '../../../../components/Button/Button';
import Loading from '../../../../components/Loading/Loading';
import RowContent from './RowContent';
import InputPreSuffix from './InputPreSuffix';
import formatter from '../../../../utils/formatter';

const DetailProduct:FC<any> = () => {
  const navigate = useNavigate();
  const { productID } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [product, setProduct] = useState<any>({});
  const [productVariant, setProductVariant] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const findProductByID = async () => {
    await ProductAPI.FindProductByID(axiosPrivate, productID)
      .then((resp:any) => {
        const { data } = resp.data;
        setProduct(data.product_detail);
        setProductVariant(data.product_detail.product.product_variant_detail);
      })
      .catch((err:any) => toast.error(err.response?.data?.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (productID) {
      findProductByID().then();
    }
  }, []);

  console.log(product);
  return (
    <div className="product-form__container">
      <h3 className="mb-4 mt-2">Detail Produk</h3>
      <div className="product-form__content">
        {
          !loading && product ? (
            <div>
              <div className="mt-2 mb-4 text-start">
                <h5>Informasi Statistik</h5>
                <RowContent label="Penjualan" element="children">
                  <InputPreSuffix value={product.product.sold_count} unit="pcs" isSuffix />
                </RowContent>
                <RowContent label="Favorit" element="children">
                  <InputPreSuffix value={product.product.favorite_count} unit="user" isSuffix />
                </RowContent>
                <RowContent label="Penilaian" element="children">
                  <div className="d-flex gap-2 align-items-center">
                    <InputPreSuffix value={product.average_rating} unit="star" isSuffix />
                    <span>dari</span>
                    <InputPreSuffix value={product.rating_count} unit="reviews" isSuffix />
                  </div>
                </RowContent>
                <RowContent label="Total Stok" element="children">
                  <InputPreSuffix value={product.total_stock} unit="pcs" isSuffix />
                </RowContent>
              </div>
              <div className="mt-2 mb-4 text-start">
                <h5>Informasi Dasar</h5>
                <RowContent label="Foto" element="children">
                  <div className="d-flex gap-2">
                    {
                      product.product.product_photos.map((item:any) => (
                        <img className="img-fit product-form__image border rounded" src={item.photo_url} alt={item.name} />
                      ))
                    }
                  </div>
                </RowContent>
                <RowContent label="Nama" value={product.product.name} />
                <RowContent label="Kategori" value={product.product.category.name} />
                <RowContent label="Deskripsi" element="textarea" value={product.product.product_detail.description} />
                { productVariant[0].product_variant1 !== null
                  && (
                  <>
                    <RowContent label="Harga">
                      <InputPreSuffix value={productVariant[0].price} unit="Rp" />
                    </RowContent>
                    <RowContent label="Stok" element="children">
                      <InputPreSuffix value={productVariant[0].stock} unit="pcs" isSuffix />
                    </RowContent>
                  </>
                  )}
              </div>
              {
                productVariant[0].product_variant1 !== null
                && (
                  <div className="my-4 text-start">
                    <h5>Informasi Varian Produk</h5>
                    <RowContent label="Tabel Varian" element="children">
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                          <thead className="table-secondary">
                            <tr className="d-flex">
                              <td className="cell-width text-center">
                                {productVariant[0].product_variant1.name}
                              </td>
                              {productVariant[0].product_variant2 !== null
                              && (
                                <td className="cell-width text-center">
                                  {productVariant[0].product_variant2.name}
                                </td>
                              )}
                              <td className="cell-width text-center">Harga</td>
                              <td className="cell-width text-center">Stok</td>
                              <td className="cell-width text-center">Kode Varian</td>
                              <td className="cell-width text-center">Gambar</td>
                            </tr>
                          </thead>
                          <tbody>
                            {
                            productVariant.map((item:any) => (
                              <tr key={item.id} className="d-flex">
                                <td className="cell-width text-center">{item.variant1_value}</td>
                                {productVariant[0].product_variant2 !== null
                                  && (
                                    <td className="cell-width text-center">
                                      {item.variant2_value}
                                    </td>
                                  )}
                                <td className="cell-width text-end">{formatter.DisplayPrice(item.price)}</td>
                                <td className="cell-width text-center">{item.stock}</td>
                                <td className="cell-width text-center">{item.variant_code}</td>
                                <td className="cell-width text-center">
                                  { item.picture_url
                                    ? (
                                      <img
                                        className="img-fit product-form__image rounded m-0"
                                        src={item.picture_url}
                                        alt={`${item.variant1_value},${item.variant2_value}`}
                                      />
                                    ) : (
                                      <span>Tidak ada gambar</span>
                                    )}
                                </td>
                              </tr>
                            ))
                          }
                          </tbody>
                        </table>
                      </div>
                    </RowContent>
                  </div>
                )
              }
              <div className="my-4 text-start">
                <h5>Informasi Lainnya</h5>
                <RowContent label="Kondisi" value={product.product.product_detail.condition_status} />
                <RowContent label="Barang Berbahaya" element="boolean" value={product.product.product_detail.is_hazardous} />
                <RowContent label="Berat" element="children">
                  <InputPreSuffix value={product.product.product_detail.weight} unit="gr" isSuffix />
                </RowContent>
                <RowContent label="Ukuran (P*L*T)" element="children">
                  <div className="d-flex gap-2 align-items-center">
                    <InputPreSuffix value={product.product.product_detail.length} unit="cm" isSuffix />
                    <span>X</span>
                    <InputPreSuffix value={product.product.product_detail.width} unit="cm" isSuffix />
                    <span>X</span>
                    <InputPreSuffix value={product.product.product_detail.height} unit="cm" isSuffix />
                  </div>
                </RowContent>
              </div>
            </div>
          ) : (
            <Loading height={48} />
          )
        }
        <div className="d-flex flex-row-reverse gap-3">
          <Button buttonType="secondary alt" handleClickedButton={() => navigate('/seller/product/list')} text="Kembali" />
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
