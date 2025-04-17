import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../presentation/screens/home";
import ProductDetailScreen from "../presentation/screens/productDetail";
import { Text } from "react-native";

export type RootStackParamList = {
  HomeScreen: undefined;
  ProductDetail: { productId: number } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      HomeScreen: "home",
      ProductDetail: "product/:productId",
    },
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Products" }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: "Product Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
