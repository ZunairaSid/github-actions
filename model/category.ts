import { Product } from './product';
export interface Category {
  category_id: number;
  name: string;
  image: string;
  products: Product[];
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}
