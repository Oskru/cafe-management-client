import { useEffect, useState } from 'react';
import { AppTemplate } from '../app-template';
import { authorizedFetch } from '../../../utils/functions/authorized-fetch';
import {
  EMPLOYEES_ACTIVE_URL,
  PRODUCTS_LOW_STOCK_URL,
} from '../../../utils/data/api';
import { Employee } from '../../../interfaces/employee';
import { Product } from '../../../interfaces/product';
import { Container } from '../../../utils/components/container/container';

export function Dashboard() {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [activeEmployees, setActiveEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    const fetchLowStockProducts = async () => {
      const res = await authorizedFetch(PRODUCTS_LOW_STOCK_URL);
      setLowStockProducts(await res.json());
    };

    const fetchActiveEmployees = async () => {
      const res = await authorizedFetch(EMPLOYEES_ACTIVE_URL);
      setActiveEmployees(await res.json());
    };

    Promise.all([fetchLowStockProducts(), fetchActiveEmployees()]);
  }, []);
  return (
    <AppTemplate appName='Dashboard'>
      <p>
        <h3>Low stock products</h3>
        <Container display='flex' flexDirection='row' flexWrap='wrap'>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map((product: Product, index: number) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </p>
      <p>
        <h3>Active employees</h3>
        <Container display='flex' flexDirection='row' flexWrap='wrap'>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Position</th>
                <th>Contact number</th>
              </tr>
            </thead>
            <tbody>
              {activeEmployees.map((employee: Employee, index: number) => (
                <tr key={index}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.position}</td>
                  <td>{employee.contactNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </p>
    </AppTemplate>
  );
}
