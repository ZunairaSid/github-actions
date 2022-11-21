import Image from 'next/image';
import React from 'react';
import PaymentAPI from '../../api/payment/payment';
import { Cart } from '../../model/cart';

interface IProps {
  cart: Cart;
  currencySymbol: string;
}

export const Stripe = ({ cart, currencySymbol }: IProps) => {
  const stripePay = () =>
    PaymentAPI.stripePay({ cart })
      .then((resp) =>
        resp.text().then((redirectUrl) => {
          const url = redirectUrl.replaceAll('"', '');
          window.location.assign(url);
        }),
      )
      .catch((err) => console.log(err));

  return (
    <>
      <section className='stripe'>
        <h1 className='stripe-title'>Checkout with Stripe</h1>
        {cart.products.map((p, k) => (
          <div key={`product-${p.name}`} className='product'>
            <div className='header'>
              <Image
                src={p.image}
                alt={p.name}
                width={80}
                height={100}
                className='image'
              />
              <div className='main-info'>
                <h4 className='name'>{p.name}</h4>
                <h5>
                  {currencySymbol}
                  {p.price}
                </h5>
                <div>{p.description}</div>
              </div>
            </div>
          </div>
        ))}
        <button
          className='btn btn-primary stripe-submit'
          type='submit'
          onClick={stripePay}
        >
          Checkout
        </button>
      </section>
      <style>{`
            .stripe {
                justify-contents: center;
                border: solid 1px black;
                border-radius: 10px;
                background-color: whitesmoke;
            }

            .stripe-title {
                font-style: italic;
                color: darkblue;
                text-align: center;
            }

            .product {
                margin: 10px;
                border-bottom: 1px solid black;
            }

            .header {
                display: flex;
                flex-direction: row;
            }

            .image {
                border-radius: 4px;
                margin-right: 6px;
            }

            .stripe-submit {
                width: 100%;
                border-radius: 10px;
            }
        `}</style>
    </>
  );
};
