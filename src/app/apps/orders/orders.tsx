import { useEffect, useState } from 'react';
import { AppTemplate } from '../app-template';
import { ORDERS_URL } from '../../constants/api';

interface Orders {
  orderId: number;
  supplierId: number;
  totalAmount: number;
  orderDateTime: string;
}
export function Orders() {
  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(ORDERS_URL);
        setOrders(await res.json());
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();

    return () => {};
  }, []);
  return (
    <AppTemplate appName='Orders' actions={[]} className='orders'>
      <h1>All orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Supplier ID</th>
            <th>Total amount</th>
            <th>Order date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderId}</td>
              <td>{order.supplierId}</td>
              <td>{order.totalAmount}</td>
              <td>{order.orderDateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppTemplate>
  );
}
