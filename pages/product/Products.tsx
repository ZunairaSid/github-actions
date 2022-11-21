import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Error from 'next/error';

import { Product } from '../../model/product';
import ProductAPI from '../../api/product/product';

const Products = (
  errCode: any,
  message: any,
  { products }: { products: Product[] },
) => {
  const handleDeleteProduct = async (id: number) => {
    const response = await ProductAPI.deleteProduct(id);
  };
  if (errCode === 500) return <Error statusCode={errCode} message={message} />;
  else {
    return (
      <>
        <h1> Products </h1>

        {products &&
          products.map((product: Product) => {
            return (
              <>
                <div key={product.productId}></div>
                <p> {product.name} </p>
                <p> {product.description} </p>
                <p> {product.price} </p>
                <p> {product.rating} </p>

                {product.image && (
                  <Image src={product.image} alt='Product Image' />
                )}

                <button
                  type='button'
                  onClick={() => handleDeleteProduct(product.productId)}
                >
                  Delete this Product
                </button>

                <Link href={`/product/${product.productId}`}>
                  Update this Product
                </Link>
              </>
            );
          })}
      </>
    );
  }
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await ProductAPI.getAllProducts();
    const products: Product[] = await response.json();

    return {
      props: { products },
    };
  } catch (error: any) {
    return {
      props: { errCode: 500, message: error },
    };
  }
};

export default Products;
