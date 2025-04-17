const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      HomeScreen: "home",
      ProductDetail: "product/:productId",
    },
  },
};

export default linking;
