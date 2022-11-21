import { Formik, Field } from 'formik';
import { useState } from 'react';

import { Product } from '../../model/product';
import ProductAPI from '../../api/product/product';
import InputField from '../../components/Fields/InputField';
import { productSchema } from '../../validations/productSchema';

const CreateProduct = ({ product }: { product: Product }) => {
  const [errors, setErrors] = useState<any>();

  return (
    <>
      <Formik
        validationSchema={productSchema}
        onSubmit={async (data: Product) => {
          try {
            const response = await ProductAPI.createProduct(data);
            setErrors('');
          } catch (error: any) {
            setErrors(error.message);
          }
        }}
        initialValues={{
          productId: 0,
          categoryId: 0,
          name: '',
          price: 0,
          rating: 0,
          createdBy: '',
          createdAt: 0,
          updatedAt: 0,
          description: '',
          image: '',
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <p> Product Name: </p>
            <Field
              component={InputField}
              type='name'
              name='name'
              placeholder='Enter name'
            />

            <p> Product Price: </p>
            <Field
              componet={InputField}
              type='text'
              name='price'
              placeholder='Enter price'
            />

            <p> Product Rating: </p>
            <Field
              component={InputField}
              type='text'
              name='rating'
              placeholder='Enter Rating'
            />

            <p> Product Description: </p>
            <Field
              component={InputField}
              type='text'
              name='description'
              placeholder='Enter description'
            />

            <p> Product Image: </p>
            <Field
              component={InputField}
              type='file'
              name='image'
              placeholder='Upload image'
            />
            <button type='submit'> Create Product </button>
            {errors}
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateProduct;
