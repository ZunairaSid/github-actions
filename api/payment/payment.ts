import { Order, OrderCart } from '../../model/order';
import { fullUrl } from '../api';

export const paymentRoute = '/api/order';

const PaymentAPI = Object.freeze({
  paypalCreateOrder: (order: Order) => paypalCreateOrder(order),
  paypalCheckout: (id: string) => paypalCheckout(id),
  stripePay: (order: OrderCart) => stripePay(order),
});

const paypalCreateOrder = (order: Order) =>
  fetch(`${fullUrl}${paymentRoute}/paypal/createOrder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

const paypalCheckout = (id: string) =>
  fetch(`${fullUrl}${paymentRoute}/paypal/checkout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'text/plain',
    },
    body: id,
  });

const stripePay = (order: OrderCart) =>
  fetch(`${fullUrl}${paymentRoute}/stripe/createOrder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

export default PaymentAPI;
