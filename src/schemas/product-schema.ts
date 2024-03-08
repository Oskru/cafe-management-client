import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  price: Yup.number().min(1).required('price is required'),
  description: Yup.string(),
  imageUrl: Yup.string(),
  quantity: Yup.number().min(1).required('quantity is required'),
  isSeasonal: Yup.boolean(),
  isAvailable: Yup.boolean(),
  productCategory: Yup.number(),
});
