export type TProduct = {
  title: string;
  author: string;
  price: number;
  imgURL: string;
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
};
