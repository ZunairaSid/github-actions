import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required('Name is Required'),
  price: yup.number().required('Price is required'),
  rating: yup.number().required('Rating is required'),
  description: yup.string().required('Description is required'),
});
