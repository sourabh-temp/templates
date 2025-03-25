"use client";
import React, { useState, useEffect } from 'react';
import '@/styles/admin/OrderForm.css';

function OrderForm({ onClose, onSubmit, editingOrder }) {
  const [order, setOrder] = useState({
    id: 0,
    orderId: '',
    date: '',
    amount: 0,
    orderStatus: 'unpaid',
    deliveryStatus: 'in progress',
  });

  useEffect(() => {
    if (editingOrder) {
      setOrder(editingOrder);
    }
  }, [editingOrder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(order);
  };

  const handleOrderStatusChange = (e) => {
    const newOrderStatus = e.target.value; // Removed TypeScript type assertion
    setOrder({ ...order, orderStatus: newOrderStatus });
  };

  const handleDeliveryStatusChange = (e) => {
    const newDeliveryStatus = e.target.value; // Removed TypeScript type assertion
    setOrder({ ...order, deliveryStatus: newDeliveryStatus });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{editingOrder ? 'Edit Order' : 'Create Order'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={order.orderId}
            onChange={(e) => setOrder({ ...order, orderId: e.target.value })}
            placeholder="Order ID"
          />
          <input
            type="text"
            value={order.date}
            onChange={(e) => setOrder({ ...order, date: e.target.value })}
            placeholder="Order Date"
          />
          <input
            type="number"
            value={order.amount}
            onChange={(e) => setOrder({ ...order, amount: parseFloat(e.target.value) })}
            placeholder="Amount"
          />
          <select
            value={order.orderStatus}
            onChange={handleOrderStatusChange}
          >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <select
            value={order.deliveryStatus}
            onChange={handleDeliveryStatusChange} // Updated handler here
          >
            <option value="in progress">In Progress</option>
            <option value="delivered">Delivered</option>
          </select>
          <button type="submit">{editingOrder ? 'Update' : 'Create'} Order</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
