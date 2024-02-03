import { useEffect, useState } from 'react';
import { Container } from '../../../utils/components/container/container';
import { Modal } from '../../../utils/components/modal/modal';
import { AppTemplate } from '../app-template';
import './inventory.scss';
import { PRODUCTS_URL } from '../../constants/api';
import { Product } from '../../../interfaces/product';

export function Inventory() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: '',
  });

  const actions = [
    {
      title: 'Add product',
      icon: 'gg-add-r',
      onClick: () => {
        setShowModal(true);
      },
    },
  ];

  const handleChangeProduct = (e: React.ChangeEvent<any>) => {
    setProduct({ ...product, [e.target.placeholder]: e.target.value });
  };

  const addProduct = () => {
    fetch(PRODUCTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addProduct();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(PRODUCTS_URL);
        setProducts(await res.json());
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <AppTemplate appName='Inventory' className='inventory' actions={actions}>
      <h3>All products</h3>
      <Container display='flex' flexDirection='row' flexWrap='wrap'>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product, index: number) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.imageUrl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <Modal
        show={showModal}
        handleClose={() => {
          setShowModal(!showModal);
        }}
      >
        <form className='employees-form' onSubmit={handleFormSubmit}>
          <h2>Add product</h2>
          <input
            type='text'
            placeholder='name'
            value={product.name}
            onChange={handleChangeProduct}
          />
          <input
            type='text'
            placeholder='description'
            value={product.description}
            onChange={handleChangeProduct}
          />
          <input
            type='number'
            placeholder='price'
            value={product.price}
            onChange={handleChangeProduct}
          />
          <input
            type='number'
            placeholder='stock'
            value={product.stock}
            onChange={handleChangeProduct}
          />
          <input
            type='text'
            placeholder='image'
            value={product.image}
            onChange={handleChangeProduct}
          />
          <button type='submit'>Add product</button>
        </form>
      </Modal>
    </AppTemplate>
  );
}
