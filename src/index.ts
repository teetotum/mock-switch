import { initUI } from "./initUI";
import { setItem_choicesOffered, getItem_choicesMade } from "./storage";

if (document.readyState === "loading") {
  const onReadystatechange = () => {
    if (document.readyState !== "loading") {
      document.removeEventListener("readystatechange", onReadystatechange);
      initUI();
    }
  };
  document.addEventListener("readystatechange", onReadystatechange);
} else {
  initUI();
}

export const mockSwitch = (
  qualifier: string,
  choices: Array<string>
): string => {
  if (!qualifier) throw new Error('must provide argument "qualifier"');
  if (!choices) throw new Error('must provide argument "choices"');
  if (choices.length === 0)
    throw new Error('argument "choices" cannot be empty');

  setItem_choicesOffered(qualifier, choices);
  const storedChoice = getItem_choicesMade(qualifier);
  return choices.includes(storedChoice) ? storedChoice : choices[0];
};
