import { Category } from "../../core/entities/category";
import { CategoryResponse } from "../types/categoryType";

export const mapCategory = (categoryResponse: CategoryResponse): Category => {
  return {
    slug: categoryResponse.slug,
    name: categoryResponse.name,
    url: categoryResponse.url,
  };
};
