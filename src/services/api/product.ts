import { api, handleApiError } from "../../utils/utils";
import { AxiosError } from "axios";
import { ProductItem, ProductResponse } from "../types/productType";
import { CategoryResponse } from "../types/categoryType";

const PRODUCTS_URL = "/products";
const CATEGORIES_URL = "/products/categories";

const fetchProducts = async (): Promise<Array<ProductItem>> => {
  const response = await api.get<ProductResponse>(PRODUCTS_URL);
  return response.data.products;
};

const fetchCategories = async (): Promise<Array<CategoryResponse>> => {
  try {
    const response = await api.get<Array<CategoryResponse>>(CATEGORIES_URL);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

const fetchProductDetails = async (productId: number): Promise<ProductItem> => {
  try {
    const response = await api.get<ProductItem>(`${PRODUCTS_URL}/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const productApi = {
  fetchProducts,
  fetchCategories,
  fetchProductDetails,
};
