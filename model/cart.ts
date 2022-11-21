import { Product } from './product';

export interface Cart {
  id: number;
  userId: string;
  products: Product[];
  price: number;
  createdAt: number;
  updatedAt: number;
}
