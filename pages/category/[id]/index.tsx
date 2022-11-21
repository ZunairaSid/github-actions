import { useRouter } from 'next/router';
import { Field, Formik } from 'formik';
import { useState } from 'react';
import Error from 'next/error';

import { Category } from '../../../model/category';
import CategoryAPI from '../../../api/category/category';
import InputField from '../../../components/Fields/InputField';
import { categorySchema } from '../../../validations/categorySchema';
import { Loader } from '../../../components/Loader/Loader';

const UpdateCategory = (
  errCode: any,
  message: any,
  { category }: { category: Category },
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
            onSubmit={async (data: Category) => {
              const categoryId = parseInt(id as string);
              try {
                setLoading(true);
                const response = await CategoryAPI.updateCategory(
                  categoryId,
                  data,
                );
                if (!response) setError('Server did not respond');
                setLoading(false);
              } catch (error: any) {
                setError(error);
              }
            }}
            validationSchema={categorySchema}
            initialValues={{
              category_id: category.category_id,
              name: category.name,
              image: category.image,
              products: category.products,
              createdBy: category.createdBy,
              createdAt: category.createdAt,
              updatedAt: category.updatedAt,
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <p> Category Name: </p>
                <Field
                  componenet={InputField}
                  type='name'
                  name='name'
                  placeholder='Enter name'
                  required
                />

                <p> Category Image: </p>
                <Field
                  componenet={InputField}
                  type='file'
                  name='image'
                  placeholder='Upload image'
                />
                <button type='submit'> Update Category </button>
                {error}
              </form>
            )}
          </Formik>
        )}
      </>
    );
  }
};

export const getStatciProps = async (context: any) => {
  try {
    const response = await CategoryAPI.getCategory(context.params.id);

    const category: Category = await response.json();

    return {
      props: {
        category,
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
    const response = await CategoryAPI.getAllCategories();

    const categories = await response.json();

    const ids = categories.map((category: any) => category.category_id);

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

export default UpdateCategory;
