const linking = {
  prefixes: ["testmodakapp://"],
  config: {
    screens: {
      HomeScreen: "home",
      ProductDetail: "product/:productId",
    },
  },
};

export default linking;
