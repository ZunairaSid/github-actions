import Link from 'next/link';
import React from 'react';
import { Wrapper } from '../components/Wrapper/Wrapper';

export default function StripeSuccess() {
  return (
    <Wrapper>
      <h1>Thank you for shopping with us!</h1>
      <Link href='/'>{'<<< Go to home page'}</Link>
    </Wrapper>
  );
}
