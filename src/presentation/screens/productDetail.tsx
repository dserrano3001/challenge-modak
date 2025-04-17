import React from "react";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";
import { getProductDetailsUseCase } from "../../core/usecases/getProductDetails";
import { Product } from "../../core/entities/product";
import { FontAwesome } from "@expo/vector-icons";
import ProductDetails from "../components/productDetailsCmp";
import { NativeModules } from "react-native";

interface RouteParam {
  productId: number;
}

const ProductDetailScreen = () => {
  const route = useRoute();
  const { productId } = route.params as RouteParam;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productDetail, setProductDetail] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductDetailsUseCase.execute(productId);
        setProductDetail(response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShare = () => {
    if (productDetail) {
      setTimeout(() => {
        if (NativeModules.SharedProduct) {
          NativeModules.SharedProduct.shareText(
            `Check out this product: <span class="math-inline">\{productDetail\.title\}\\n\\n</span>{productDetail.description}\nPrice: $${productDetail.price}`,
            `Share ${productDetail.title}`
          );
        } else {
          console.error("SharedProduct is still null after delay.");
        }
      }, 2000);
    }
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
        <FontAwesome name="exclamation-circle" size={64} color="#ff0000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {productDetail ? (
        <ScrollView style={styles.bodyContainer}>
          <Text style={styles.title}>{productDetail.title}</Text>
          {productDetail.images && productDetail.images.length > 0 && (
            <View style={styles.bodyImage}>
              <ScrollView horizontal style={styles.imagesCarousel}>
                {productDetail.images.map((image) => (
                  <Image
                    source={{ uri: image }}
                    key={image}
                    style={styles.image}
                  />
                ))}
              </ScrollView>
            </View>
          )}
          <ProductDetails product={productDetail} />
          <Button title="Share Product" onPress={handleShare} />
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Product not found.</Text>
        </View>
      )}
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
  bodyImage: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  imagesCarousel: {
    flexDirection: "row",
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default ProductDetailScreen;
