export interface Product {
  id?: number;
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
  quantity: number;
  isSeasonal?: boolean;
  isAvailable: boolean;
  productCategory: {
    id: number;
    categoryName?: string;
  };
}
