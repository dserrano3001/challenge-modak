import { productApi } from "../../services/api/product";
import { mapProduct } from "../../services/mappers/productMapper";
import { ProductItem } from "../../services/types/productType";
import { Product } from "../entities/product";

class GetProductsUseCase {
  async execute(): Promise<Array<Product>> {
    try {
      const productItemResponses = await productApi.fetchProducts();
      return productItemResponses.map((response: ProductItem) =>
        mapProduct(response)
      );
    } catch (error: any) {
      console.error("Error fetching and mapping products:", error.message);
      throw error;
    }
  }
}

export const getProductsUseCase = new GetProductsUseCase();
