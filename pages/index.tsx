import type { NextPage } from 'next';
import { PayPal } from '../components/PayPal/PayPal';
import { Stripe } from '../components/Stripe/Stripe';
import { Wrapper } from '../components/Wrapper/Wrapper';
import { mockCart, mockOrder } from '../utils/mock';

const Home: NextPage = () => (
  <Wrapper>
    <>
      <PayPal order={mockOrder} />

      <div style={{ width: '30%', marginLeft: '10px' }}>
        <Stripe currencySymbol='$' cart={mockCart} />
      </div>
    </>
  </Wrapper>
);
export default Home;
