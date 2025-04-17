import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Product, SortType } from "../../core/entities/product";
import { Category } from "../../core/entities/category";
import { getProductsUseCase } from "../../core/usecases/getProducts";
import { getCategoriesUseCase } from "../../core/usecases/getCategories";
import CategoryFilter from "../components/categoryFilterCmp";
import SortOptions from "../components/sortOptionsCmp";
import ProductCard from "../components/productCardCmp";
import useDebounce from "../../hooks/useDebounce";

const HomeScreen = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortType | null>(null);
  const debouncedCategory = useDebounce(selectedCategory, 300);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const productsData = await getProductsUseCase.execute();
        setProducts(productsData);
        const categoriesData = await getCategoriesUseCase.execute();
        setCategories(categoriesData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = debouncedCategory
    ? products.filter(
        (product) =>
          product.category?.toLowerCase() === debouncedCategory.toLowerCase()
      )
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") {
      return (a.price || 0) - (b.price || 0);
    } else if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSortSelect = (sortOption: "price" | "rating" | null) => {
    setSortBy(sortOption);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading products...</Text>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>Error loading products: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CategoryFilter
        categories={categories}
        onSelectCategory={handleCategorySelect}
      />
      <SortOptions onSelectSort={handleSortSelect} />
      <FlatList
        data={sortedProducts}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "center" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: "#fff",
    gap: "2px",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: "24px",
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#FF0000",
    gap: "24px",
  },
});

export default HomeScreen;
