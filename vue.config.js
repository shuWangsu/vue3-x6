const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("less").oneOf(type))
    );
  },
  transpileDependencies: true,
  devServer: {
    port: 9099,
  },
  configureWebpack: (config) => {
    plugins: {
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, "./public/images"), to: "public" },
        ],
      });
    }
  },
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/less/public.less")],
    });
}
