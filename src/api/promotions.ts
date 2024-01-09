class PromotionsAPI {
  static GetPromotions(ax:any, filter:any) {
    return ax.get(`/promotions?${filter}`);
  }

  static AddPromotion(ax:any, body:any) {
    return ax.post('/promotions', body);
  }

  static ViewPromotionDetail(ax:any, id:any = '') {
    return ax.get(`/view-detail-promotion/${id}`);
  }

  static UpdatePromotion(ax:any, id:any = '') {
    return ax.patch(`/promotions/${id}`);
  }
}

export default PromotionsAPI;
