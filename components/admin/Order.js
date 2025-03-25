"use client"
import React, { useState } from 'react';
import OrderForm from '@/components/admin/OrderForm';
import '@/styles/admin/Order.css';

const Order = () => {
  const [orders, setOrders] = useState([
    { id: 1, orderId: 'order_id#1234', date: '2023-01-01', amount: 150.50, orderStatus: 'paid', deliveryStatus: 'delivered' },
    { id: 2, orderId: 'order_id#1235', date: '2023-02-05', amount: 200.75, orderStatus: 'unpaid', deliveryStatus: 'in progress' }
  ]);

  const [orderIdFilter, setOrderIdFilter] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('');
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const openForm = (order) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingOrder(null);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter(order => order.id !== id));
    setPopupMessage('Order deleted successfully.');
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleCreateOrUpdateOrder = (order) => {
    if (editingOrder) {
      setOrders(orders.map(o => o.id === order.id ? order : o));
      setPopupMessage('Order updated successfully.');
    } else {
      setOrders([...orders, { ...order, id: orders.length + 1 }]);
      setPopupMessage('Order created successfully.');
    }
    closeForm();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const filteredOrders = orders.filter(order => {
    return (
      (orderIdFilter ? order.orderId.toLowerCase().includes(orderIdFilter.toLowerCase()) : true) &&
      (orderStatusFilter ? order.orderStatus === orderStatusFilter : true) &&
      (deliveryStatusFilter ? order.deliveryStatus === deliveryStatusFilter : true)
    );
  });

  return (
    <div className="content">
      <h2>Order Management</h2>
      <div className="order-controls">
        <input
          type="text"
          placeholder="Search by Order ID..."
          value={orderIdFilter}
          onChange={(e) => setOrderIdFilter(e.target.value)}
        />
        <select onChange={(e) => setOrderStatusFilter(e.target.value)} value={orderStatusFilter}>
          <option value="">All Statuses</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
        <select onChange={(e) => setDeliveryStatusFilter(e.target.value)} value={deliveryStatusFilter}>
          <option value="">All Delivery Status</option>
          <option value="in progress">In Progress</option>
          <option value="delivered">Delivered</option>
        </select>
        <button onClick={() => openForm()} className="create-order">Create Order</button>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Order Status</th>
            <th>Delivery Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderId}</td>
              <td>{order.date}</td>
              <td>{order.amount}</td>
              <td>{order.orderStatus}</td>
              <td>{order.deliveryStatus}</td>
              <td>
                <button onClick={() => openForm(order)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(order.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && (
        <OrderForm
          onClose={closeForm}
          onSubmit={handleCreateOrUpdateOrder}
          editingOrder={editingOrder}
        />
      )}

      {showPopup && !isFormOpen && <div className="popup">{popupMessage}</div>}
    </div>
  );
};

export default Order;
