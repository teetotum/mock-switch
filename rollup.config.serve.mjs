import baseConfig from "./rollup.config.mjs";
import serve from "rollup-plugin-serve";

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    serve({
      open: true,
      openPage: "/proof.html",
    }),
  ],
};
