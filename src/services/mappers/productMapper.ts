import { Product } from "../../core/entities/product";
import { ProductItem } from "../types/productType";

export const mapProduct = (productResponse: ProductItem): Product => {
  return {
    id: productResponse.id,
    title: productResponse.title,
    description: productResponse.description,
    price: productResponse.price,
    discountPercentage: productResponse.discountPercentage,
    rating: productResponse.rating,
    stock: productResponse.stock,
    brand: productResponse.brand,
    category: productResponse.category,
    thumbnail: productResponse.thumbnail,
    images: productResponse.images,
  };
};
