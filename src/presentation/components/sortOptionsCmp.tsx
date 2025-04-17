import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SortType } from "../../core/entities/product";
import { FontAwesome } from "@expo/vector-icons";

interface SortOptionsProps {
  onSelectSort: (sortBy: SortType | null) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSelectSort }) => {
  const [selectedSort, setSelectedSort] = useState<SortType | null>(null);

  const handleSelect = (type: SortType | null) => {
    setSelectedSort(type);
    onSelectSort(type);
  };

  return (
    <View style={styles.container}>
      <FontAwesome name="sort" size={20} color="#000" />
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedSort === "price" && styles.selectedSort,
          ]}
          onPress={() =>
            handleSelect(selectedSort === "price" ? null : "price")
          }
        >
          <Text
            style={[
              styles.optionText,
              selectedSort === "price" && styles.selectedTextSort,
            ]}
          >
            Price <FontAwesome name="sort-amount-desc" size={12} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedSort === "rating" && styles.selectedSort,
          ]}
          onPress={() =>
            handleSelect(selectedSort === "rating" ? null : "rating")
          }
        >
          <Text
            style={[
              styles.optionText,
              selectedSort === "rating" && styles.selectedTextSort,
            ]}
          >
            Rating <FontAwesome name="sort-amount-asc" size={12} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
    justifyContent: "center",
  },
  optionsContainer: {
    flexDirection: "row",
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  optionText: {
    color: "#333",
    fontWeight: "500",
  },
  selectedSort: {
    backgroundColor: "#3B82F6",
  },
  selectedTextSort: {
    color: "#fff",
  },
});

export default SortOptions;
