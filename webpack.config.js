module.exports = {
  module : {
    rules: [
      // explicit name "fibonacci.wasm" is referred to c and c++ implementations. 
      // Wasm file generated from rust are much better and doesn't require webpack customizations in order to work!
      {
        test: /fibonacci\.wasm$/,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          publicPath: "dist/"
        }
      }
    ]
  }
};