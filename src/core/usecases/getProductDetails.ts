import { productApi } from "../../services/api/product";
import { mapProduct } from "../../services/mappers/productMapper";
import { Product } from "../entities/product";

class GetProductDetailsUseCase {
  async execute(productId: number): Promise<Product> {
    try {
      const productResponse = await productApi.fetchProductDetails(productId);
      return mapProduct(productResponse);
    } catch (error: any) {
      console.error(
        `Error fetching and mapping product with ID ${productId}:`,
        error.message
      );
      throw error;
    }
  }
}

export const getProductDetailsUseCase = new GetProductDetailsUseCase();
