import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Error from 'next/error';

import { Category } from '../../model/category';
import { Product } from '../../model/product';
import CategoryAPI from '../../api/category/category';

const Categories = (
  errCode: any,
  message: any,
  { categories }: { categories: Category[] },
) => {
  const handleDeleteCategory = async (id: number) => {
    const response = await CategoryAPI.deleteCategory(id);
  };

  if (errCode === 500) return <Error statusCode={errCode} message={message} />;
  else {
    return (
      <>
        <h1> Categories </h1>

        {categories &&
          categories.map((category: Category) => {
            return (
              <>
                <div key={category.category_id}></div>
                <p> {category.name} </p>

                {category.image && (
                  <Image src={category.image} alt='Category Image' />
                )}
                {category.products.map((product: Product) => {
                  return <div key={product.productId}></div>;
                })}

                <button
                  type='button'
                  onClick={() => handleDeleteCategory(category.category_id)}
                >
                  Delete this Category
                </button>

                <Link href={`/category/${category.category_id}`}>
                  Update this Category
                </Link>
              </>
            );
          })}
      </>
    );
  }
};

// export const getStaticProps: GetStaticProps = async () => {
//   try{

//     const response = await CategoryAPI.getAllCategories();
//     const categories: Category[] = await response.json();

//     return {

//       props: { categories },

//     };

//   }catch(error : any){

//     return{
//       props: {errCode: 500, message: error}
//     }

//   }
// };

export default Categories;
