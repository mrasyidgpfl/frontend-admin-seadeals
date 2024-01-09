import React, { FC } from 'react';
import OrdersListHeader from './OrdersListHeader';
import OrderItem from './OrderItem';

interface OrderListProps {
  orders: any[],
  viewOrder: (order:any)=>void,
}

const OrdersList:FC<OrderListProps> = ({ orders, viewOrder }) => (
  <div className="container bg-white text-start border-bottom pb-4">
    <OrdersListHeader />
    {
      orders.length > 0
        ? orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            viewOrder={() => viewOrder(order)}
          />
        ))
        : <div className="text-center text-secondary"><p>Belum ada pesanan!</p></div>
  }
  </div>
);

export default OrdersList;
