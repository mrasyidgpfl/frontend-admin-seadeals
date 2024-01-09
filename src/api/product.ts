class ProductAPI {
  static FindProductBySellerID(ax:any, filter:any) {
    return ax.get(`/sellers/products?${filter}`);
  }

  static FindProductByID(ax:any, id:any = '') {
    return ax.get(`/products/detail/${id}`);
  }

  static DeleteProductByID(ax:any, id:any = '') {
    return ax.delete(`/sellers/${id}/delete-product`);
  }

  static FindAllCategories(ax:any, filter:any) {
    return ax.get(`/categories?${filter}`);
  }
}

export default ProductAPI;
