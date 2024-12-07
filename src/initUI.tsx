import { render } from "preact";
import { UI } from "./UI";
import {
  getChoicesOffered,
  setItem_choicesMade,
  getChoicesMade,
} from "./storage";

export const initUI = () => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  render(
    <UI
      getChoicesOffered={getChoicesOffered}
      setChoiceMade={setItem_choicesMade}
      getChoicesMade={getChoicesMade}
    />,
    div
  );
};
