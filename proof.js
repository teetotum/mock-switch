import { mockSwitch } from "./dist/bundle.js";

const result = mockSwitch("/some/path", ["option #1", "option #2"]);
console.log(result);
