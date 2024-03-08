import { useEffect, useState } from 'react';
import { Container } from '../../../utils/components/container/container';
import { Modal } from '../../../utils/components/modal/modal';
import { AppTemplate } from '../app-template';
import './inventory.scss';
import {
  PRODUCTS_CATEGORIES_URL as PRODUCT_CATEGORIES_URL,
  PRODUCTS_URL,
} from '../../../utils/data/api';
import { Product } from '../../../interfaces/product';
import { authorizedFetch } from '../../../utils/functions/authorized-fetch';
import { FormField } from '../../../utils/components/form/form-field';
import { Form, Formik } from 'formik';
import { productSchema } from '../../../schemas/product-schema';
import { FormSelect } from '../../../utils/components/form/form-select';
import { FormCheckbox } from '../../../utils/components/form/form-checkbox';
import MessageBox from '../../../utils/components/form/message-box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const initialValues = {
  name: '',
  description: '',
  price: '',
  quantity: '',
  imageUrl: '',
  productCategory: 1,
};

export function Inventory() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const [updating, setUpdating] = useState<boolean>(false);
  const [updateProductInitialValues, setUpdateProductInitialValues] =
    useState<Product>();

  const [fetchStatus, setFetchStatus] = useState({
    ok: null,
    error: '',
  });

  const resetFetchStatus = () => {
    setFetchStatus({
      ok: null,
      error: '',
    });
  };

  const deleteProduct = async (id: number) => {
    try {
      const res = await authorizedFetch(`${PRODUCTS_URL}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts(products.filter((product: Product) => product.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateProduct = (id: number) => {
    setUpdating(true);
    const employee = products.find((product: Product) => product.id === id);
    if (employee) {
      setUpdateProductInitialValues(employee);
    }
    setShowModal(true);
  };

  const actions = [
    {
      title: 'Add product',
      icon: 'gg-add-r',
      onClick: () => {
        setShowModal(true);
      },
    },
  ];

  const handleSubmit = async (values: any, actions: any) => {
    try {
      resetFetchStatus();
      const product: Product = {
        ...values,
        productCategory: {
          id: values.productCategory,
        },
      };
      const res = await authorizedFetch(
        updating ? `${PRODUCTS_URL}/${product.id}` : PRODUCTS_URL,
        {
          method: updating ? 'PUT' : 'POST',
          // Send the product data as JSON with productCategory as an object
          body: JSON.stringify(product),
        }
      );
      // if (res.status === 201) {
      //   setShowModal(false);
      // }
      setFetchStatus(
        res.ok
          ? { ok: true, error: '' }
          : { ok: false as any, error: 'Unexpected server error' }
      );
    } catch (e) {
      setFetchStatus({ ok: false as any, error: e as string });
    }
    actions.resetForm();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await authorizedFetch(PRODUCTS_URL);
        setProducts(await res.json());
      } catch (e) {
        console.error(e);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await authorizedFetch(PRODUCT_CATEGORIES_URL);
        setProductCategories(await res.json());
      } catch (e) {
        console.error(e);
      }
    };

    Promise.all([fetchProducts(), fetchCategories()]);

    return () => {};
  }, []);

  return (
    <AppTemplate appName='Inventory' className='inventory' actions={actions}>
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
              <th style={{ textAlign: 'center' }}>Actions</th>
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
                <td className='change'>
                  <button
                    className='change__button'
                    onClick={() => deleteProduct(product.id!)}
                  >
                    <div className='gg-trash'></div>
                  </button>
                  <button
                    className='change__button'
                    onClick={() => updateProduct(product.id!)}
                  >
                    <div className='gg-file'></div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      {/* ADD PRODUCT MODAL */}
      {showModal && (
        <Modal
          show={showModal}
          handleClose={() => {
            setShowModal(!showModal);
            window.location.reload();
          }}
        >
          <Formik
            initialValues={
              updating ? updateProductInitialValues : initialValues
            }
            onSubmit={handleSubmit}
            validationSchema={productSchema}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form
                // ensure that there are no unneeded re-renders
                onChange={() => {
                  fetchStatus.error || fetchStatus.ok
                    ? resetFetchStatus()
                    : null;
                }}
                className='form form--product'
              >
                <h3>{updating ? 'Update product info' : 'Add product'}</h3>
                <FormField
                  label='Name'
                  name='name'
                  type='text'
                  placeholder='Enter product name'
                />
                <FormField
                  label='Description'
                  name='description'
                  type='text'
                  placeholder='Enter product description'
                />
                <FormField
                  label='Price'
                  name='price'
                  type='number'
                  placeholder='Enter product price'
                />
                <FormField
                  label='Quantity'
                  name='quantity'
                  type='number'
                  placeholder='Enter product quantity'
                />
                <FormField
                  label='Image URL'
                  name='imageUrl'
                  type='text'
                  placeholder='Enter product image URL'
                />
                <FormSelect
                  label='Category'
                  name='productCategory'
                  options={productCategories.map(category => ({
                    label: category.categoryName,
                    value: category.id,
                  }))}
                />
                <FormCheckbox label='Available' name='isAvailable' />
                <FormCheckbox label='Seasonal' name='isSeasonal' />
                <button
                  type='submit'
                  disabled={
                    isSubmitting ||
                    Object.keys(errors).length > 0 ||
                    Object.keys(touched).length === 0
                  }
                  className={
                    isSubmitting
                      ? 'submit-but submit-but--submitting'
                      : 'submit-but'
                  }
                >
                  {isSubmitting && (
                    <FontAwesomeIcon
                      icon={faCircleNotch}
                      spin
                      className='submit-but__icon'
                    />
                  )}
                  Submit
                </button>
                {fetchStatus.error && (
                  <MessageBox
                    fetchStatus={fetchStatus}
                    setFetchStatus={setFetchStatus}
                  />
                )}
                {fetchStatus.ok && (
                  <MessageBox
                    fetchStatus={fetchStatus}
                    setFetchStatus={setFetchStatus}
                  />
                )}
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </AppTemplate>
  );
}
