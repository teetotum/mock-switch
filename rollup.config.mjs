import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import styles from "rollup-plugin-styler";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import packagejson from "./package.json" assert { type: "json" };
//import jsx from "rollup-plugin-jsx";

export default {
  input: "src/index.ts",
  output: [
    {
      file: packagejson.main,
      format: "cjs",
    },
  ],
  external: ["preact", "preact/hooks", "preact/jsx-runtime", "clsx"],
  plugins: [
    del({ targets: "dist/*" }),
    copy({
      targets: [{ src: "types.d.ts", dest: "dist" }],
    }),
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
