import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Category } from "../../core/entities/category";

interface CategoryFilterProps {
  categories: Category[];
  onSelectCategory: (categoryName: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelect = (category: string | null) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.chip,
            selectedCategory === null && styles.selectedChip,
          ]}
          onPress={() => handleSelect(null)}
        >
          <Text
            style={[
              styles.chipText,
              selectedCategory === null && styles.selectedChipText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <TouchableOpacity
              key={cat.name}
              onPress={() => handleSelect(cat.name)}
              style={[styles.chip, isSelected && styles.selectedChip]}
            >
              <Text
                style={[styles.chipText, isSelected && styles.selectedChipText]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  selectedChip: {
    backgroundColor: "#007aff",
  },
  chipText: {
    color: "#333",
    fontWeight: "500",
  },
  selectedChipText: {
    color: "#fff",
  },
});

export default CategoryFilter;
