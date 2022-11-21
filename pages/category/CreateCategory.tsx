import { Formik, Field } from 'formik';
import { useState } from 'react';

import { Category } from '../../model/category';
import CategoryAPI from '../../api/category/category';
import InputField from '../../components/Fields/InputField';
import { categorySchema } from '../../validations/categorySchema';

const CreateCategory = ({ category }: { category: Category }) => {
  const [errors, setErrors] = useState<any>();
  return (
    <>
      <Formik
        onSubmit={async (data: Category) => {
          try {
            const response = await CategoryAPI.createCategory(data);
            setErrors('');
          } catch (error: any) {
            setErrors(error.message);
          }
        }}
        validationSchema={categorySchema}
        initialValues={{
          name: '',
          category_id: 0,
          products: [],
          updatedAt: 0,
          createdAt: 0,
          createdBy: '',
          image: '',
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <p> Category Name: </p>
            <Field
              component={InputField}
              type='name'
              name='name'
              placeholder='Enter name'
            />

            <p> Category Image: </p>
            <Field
              component={InputField}
              type='file'
              name='image'
              placeholder='Upload image'
            />

            <button type='submit'> Create Category </button>
            {errors}
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateCategory;
