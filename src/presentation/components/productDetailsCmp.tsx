import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Product } from "../../core/entities/product";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const {
    price,
    discountPercentage,
    rating,
    brand,
    category,
    stock,
    description,
  } = product;
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.containerText}>
        <Text style={styles.textTitle}>Price:</Text>
        <Text style={styles.textValue}>${price}</Text>
      </View>
      {discountPercentage && (
        <View style={styles.containerText}>
          <Text style={styles.textTitle}>Discount:</Text>
          <Text style={styles.textValueDiscount}>
            {discountPercentage}% off
          </Text>
        </View>
      )}
      {rating && (
        <View style={styles.containerText}>
          <Text style={styles.textTitle}>Rating:</Text>
          <Text style={styles.textValue}>{rating.toFixed(1)}</Text>
        </View>
      )}
      <View style={styles.containerText}>
        <Text style={styles.textTitle}>Brand:</Text>
        <Text style={styles.textValue}>{brand}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.textTitle}>Category:</Text>
        <Text style={styles.textValue}>{category}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.textTitle}>Stock Availability:</Text>
        <Text style={styles.textValue}>{stock} units</Text>
      </View>
      <Text style={styles.textTitle}>Description:</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    gap: "8px",
  },
  containerText: {
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  textValue: {
    fontSize: 16,
    color: "#333",
  },
  textValueDiscount: {
    fontSize: 16,
    color: "orange",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 16,
  },
});
export default ProductDetails;
