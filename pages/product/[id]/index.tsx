import { useRouter } from 'next/router';
import { Field, Formik } from 'formik';
import { useState } from 'react';
import Error from 'next/error';

import { Loader } from '../../../components/Loader/Loader';
import { Product } from '../../../model/product';
import ProductAPI from '../../../api/product/product';
import InputField from '../../../components/Fields/InputField';
import { productSchema } from '../../../validations/productSchema';

const UpdateProduct = (
  errCode: any,
  message: any,
  { product }: { product: Product },
) => {
  const [error, setError] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  if (errCode === 500) return <Error statusCode={errCode} message={message} />;
  else {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <Formik
            onSubmit={async (data: Product) => {
              try {
                const productId = parseInt(id as string);
                setLoading(true);
                const response = await ProductAPI.updateProduct(
                  productId,
                  data,
                );
                setLoading(false);
                if (!response) setError('Server did not respond');
              } catch (error: any) {
                setError(error);
              }
            }}
            validationSchema={productSchema}
            initialValues={{
              productId: product.productId,
              categoryId: product.categoryId,
              name: product.name,
              price: product.price,
              rating: product.rating,
              createdBy: product.createdBy,
              createdAt: product.createdAt,
              updatedAt: product.updatedAt,
              description: product.description,
              image: product.image,
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <p> Product Name: </p>
                <Field
                  componenet={InputField}
                  type='name'
                  name='name'
                  placeholder='Enter name'
                  required
                />

                <p> Product Price: </p>
                <Field
                  componenet={InputField}
                  type='text'
                  name='price'
                  placeholder='Enter price'
                />

                <p> Product Rating: </p>
                <Field
                  componenet={InputField}
                  type='text'
                  name='rating'
                  placeholder='Enter Rating'
                />

                <p> Product Image: </p>
                <Field
                  componenet={InputField}
                  type='text'
                  name='image'
                  placeholder='Enter description'
                />

                <p> Product Image: </p>
                <Field
                  componenet={InputField}
                  type='file'
                  name='image'
                  placeholder='Upload image'
                />
                <button type='submit'> Update Product </button>
                {error}
              </form>
            )}
          </Formik>
        )}
      </>
    );
  }
};

export const getStaticProps = async (context: any) => {
  try {
    const response = await ProductAPI.getProduct(context.params.id);

    const product: Product = await response.json();

    return {
      props: {
        product,
      },
    };
  } catch (error: any) {
    return {
      props: { errCode: 500, message: error },
    };
  }
};

export const getStaticPaths = async () => {
  try {
    const response = await ProductAPI.getAllProducts();

    const products = await response.json();

    const ids = products.map((product: any) => product.productId);

    const paths = ids.map((id: any) => {
      return {
        params: { id: id.toString() },
      };
    });

    return {
      ...paths,
      fallback: false,
    };
  } catch (error: any) {
    return {
      props: { errCode: 500, message: error },
    };
  }
};
export default UpdateProduct;
