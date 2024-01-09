import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ROLES from '../constants/roles';
import Layout from '../layouts/Layout';
import SellerLayout from '../layouts/SellerLayout';
import AdminLayout from '../layouts/AdminLayout';
import PersistLogin from '../components/PersistLogin';
import RequireAuth from '../components/RequireAuth';
import SellerRegister from '../pages/Seller/Register/SellerRegister';
import AdminHome from '../pages/Admin/AdminHome';
import Login from '../pages/Public/Login/Login';
import FormVoucher from '../pages/Seller/Voucher/FormVoucher';
import Register from '../pages/Public/Register/Register';
import DashboardVoucher from '../pages/Seller/Voucher/DashboardVoucher';
import DeliverySettings from '../pages/Seller/Settings/Delivery/DeliverySettings';
import Couriers from '../pages/Seller/Register/Couriers/Couriers';
import PageNotFound from '../pages/PageNotFound';
import DashboardProduct from '../pages/Seller/Product/DashboardProduct';
import FormProduct from '../pages/Seller/Product/FormProduct';
import PromotionsDashboard from '../pages/Seller/Promotion/PromotionsDashboard';
import PromotionForm from '../pages/Seller/Promotion/PromotionForm';
import Orders from '../pages/Seller/Orders/List/Orders';
import DetailProduct from '../pages/Seller/Product/DetailProduct/DetailProduct';

const AppRoutes = () => (
  <Routes>
    <Route path="" element={<Layout />}>
      <Route path="" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PersistLogin />}>
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/register/couriers" element={<Couriers />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.Seller]} />}>
          <Route path="seller" element={<SellerLayout />}>
            <Route path="" element={<Navigate to="/seller/order" replace />} />
            <Route path="voucher/">
              <Route path="list" element={<DashboardVoucher title="Voucher Toko" />} />
              <Route path="new" element={<FormVoucher formType="create" title="Buat Voucher Toko" />} />
              <Route path="show/:voucherID" element={<FormVoucher formType="show" title="Detail Voucher Toko" />} />
              <Route path="update/:voucherID" element={<FormVoucher formType="update" title="Update Voucher Toko" />} />
            </Route>
            <Route path="settings">
              <Route path="delivery" element={<DeliverySettings />} />
            </Route>
            <Route path="order/">
              <Route path="" element={<Orders />} />
            </Route>
            <Route path="promotions/">
              <Route path="list" element={<PromotionsDashboard title="Promosi Toko" />} />
              <Route path="new" element={<PromotionForm formType="create" title="Buat Promosi Toko" />} />
            </Route>
            <Route path="product/">
              <Route path="list" element={<DashboardProduct />} />
              <Route path="new" element={<FormProduct title="Buat Produk" />} />
              <Route path="show/:productID" element={<DetailProduct />} />
            </Route>
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin/" element={<AdminLayout />}>
            <Route path="" element={<AdminHome />} />
          </Route>
        </Route>

      </Route>
    </Route>
    <Route path="*" element={<PageNotFound />} />

  </Routes>
);

export default AppRoutes;
