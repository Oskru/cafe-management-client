import React, { useEffect, useState } from 'react';
import { AppTemplate } from '../app-template';
import { ORDERS_URL } from '../../../utils/data/api';
import { authorizedFetch } from '../../../utils/functions/authorized-fetch';
import { Modal } from '../../../utils/components/modal/modal';

export interface Orders {
  orderId: number;
  supplier: {
    id: number;
    name: string;
    contactPerson: string;
    contactNumber: string;
    email: string;
  };
  totalAmount: number;
  orderDateTime: string;
  // productList: [];
}
export function Orders() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState({
    orderId: '',
    supplier: {
      id: '',
      name: '',
      contactPerson: '',
      contactNumber: '',
      email: '',
    },
    totalAmount: '',
    orderDateTime: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'orderId') {
      setOrder({ ...order, orderId: value });
    } else if (name === 'supplierId') {
      setOrder({ ...order, supplier: { ...order.supplier, id: value } });
    } else if (name === 'supplierName') {
      setOrder({ ...order, supplier: { ...order.supplier, name: value } });
    } else if (name === 'supplierContactPerson') {
      setOrder({
        ...order,
        supplier: { ...order.supplier, contactPerson: value },
      });
    } else if (name === 'supplierContactNumber') {
      setOrder({
        ...order,
        supplier: { ...order.supplier, contactNumber: value },
      });
    } else if (name === 'supplierEmail') {
      setOrder({ ...order, supplier: { ...order.supplier, email: value } });
    } else if (name === 'totalAmount') {
      setOrder({ ...order, totalAmount: value });
    }
  };

  const addOrder = async () => {
    await authorizedFetch(ORDERS_URL, {
      method: 'POST',
      body: JSON.stringify(order),
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addOrder();
  };

  const actions = [
    {
      title: 'Add order',
      icon: 'gg-add-r',
      onClick: () => {
        setShowModal(true);
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authorizedFetch(ORDERS_URL);
        setOrders(await res.json());
        console.log('orders', orders);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();

    return () => {};
  }, [orders]);
  return (
    <AppTemplate appName='Orders' actions={actions} className='orders'>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Supplier ID</th>
            <th>Supplier name</th>
            <th>Supplier contact person</th>
            <th>Supplier contact number</th>
            <th>Supplier email</th>
            <th>Total amount</th>
            <th>Order date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderId}</td>
              <td>{order.supplier.id}</td>
              <td>{order.supplier.name}</td>
              <td>{order.supplier.contactPerson}</td>
              <td>{order.supplier.contactPerson}</td>
              <td>{order.supplier.email}</td>
              <td>{order.totalAmount}</td>
              <td>{order.orderDateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        show={showModal}
        handleClose={() => {
          setShowModal(!showModal);
        }}
      >
        <form className='employees-form' onSubmit={handleFormSubmit}>
          <h2>Add product</h2>
          <label htmlFor='orderId'>Order ID</label>
          <input
            type='text'
            id='orderId'
            name='orderId'
            value={order.orderId}
            onChange={handleInputChange}
          />
          <label htmlFor='supplierId'>Supplier ID</label>
          <input
            type='text'
            id='supplierId'
            name='supplierId'
            value={order.supplier.id}
            onChange={handleInputChange}
          />
          <label htmlFor='supplierName'>Supplier name</label>
          <input
            type='text'
            id='supplierName'
            name='supplierName'
            value={order.supplier.name}
            onChange={handleInputChange}
          />
          <label htmlFor='supplierContactPerson'>Supplier contact person</label>
          <input
            type='text'
            id='supplierContactPerson'
            name='supplierContactPerson'
            value={order.supplier.contactPerson}
            onChange={handleInputChange}
          />
          <label htmlFor='supplierContactNumber'>Supplier contact number</label>
          <input
            type='text'
            id='supplierContactNumber'
            name='supplierContactNumber'
            value={order.supplier.contactNumber}
            onChange={handleInputChange}
          />
          <label htmlFor='supplierEmail'>Supplier email</label>
          <input
            type='text'
            id='supplierEmail'
            name='supplierEmail'
            value={order.supplier.email}
            onChange={handleInputChange}
          />
          <label htmlFor='totalAmount'>Total amount</label>
          <input
            type='text'
            id='totalAmount'
            name='totalAmount'
            value={order.totalAmount}
            onChange={handleInputChange}
          />
          <label htmlFor='orderDateTime'>Order date</label>
          <input
            type='text'
            id='orderDateTime'
            name='orderDateTime'
            value={Date.now().toString()}
            disabled
          />
          <button type='submit'>Add product</button>
        </form>
      </Modal>
    </AppTemplate>
  );
}
