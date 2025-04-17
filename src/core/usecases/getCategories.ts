import { productApi } from "../../services/api/product";
import { mapCategory } from "../../services/mappers/categoryMapper";
import { Category } from "../entities/category";

class GetCategoriesUseCase {
  async execute(): Promise<Array<Category>> {
    try {
      const categoryResponses = await productApi.fetchCategories();
      return categoryResponses.map(mapCategory);
    } catch (error: any) {
      console.error("Error fetching and mapping categories:", error.message);
      throw error;
    }
  }
}

export const getCategoriesUseCase = new GetCategoriesUseCase();
