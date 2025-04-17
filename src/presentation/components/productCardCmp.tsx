import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Product } from "../../core/entities/product";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/navigation";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate("ProductDetail", { productId: product.id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        {product.discountPercentage && (
          <View style={styles.itemContainer}>
            <Text style={styles.itemValue}>Discount: </Text>
            <Text style={styles.discount}>
              {product.discountPercentage.toFixed(2)}%
            </Text>
          </View>
        )}
        {product.rating && (
          <View style={styles.itemContainer}>
            <FontAwesome name="star" size={14} color="#FFD700" />
            <Text style={styles.itemValue}>{product.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    width: "43%",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    gap: "2px",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "contain",
    backgroundColor: "#f2f2f2",
  },
  iconStart: {},
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    flexWrap: "wrap",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "green",
  },
  discount: {
    fontSize: 13,
    color: "red",
  },
  itemValue: {
    fontSize: 13,
    color: "#888",
  },
});

export default ProductCard;
