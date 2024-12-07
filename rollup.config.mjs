import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import styles from "rollup-plugin-styler";
import { nodeResolve } from "@rollup/plugin-node-resolve";
//import jsx from "rollup-plugin-jsx";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "es",
  },
  external: ["preact", "preact/hooks", "preact/jsx-runtime", "clsx"],
  plugins: [
    json(),
    typescript(),
    styles({
      mode: "inject",
      modules: true,
    }),
    nodeResolve({ browser: true }),
    //jsx({ factory: "React.createElement" }),
  ],
};
