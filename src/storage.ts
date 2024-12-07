const storageKey_choicesMade =
  "mock-switch::choices-made | f75b1c42-32d2-433b-8af0-8cf73c490129";
const storageKey_choicesOffered =
  "mock-switch::choices-offered | f75b1c42-32d2-433b-8af0-8cf73c490129";

const getStore_choicesMade = (): Record<string, string> => {
  try {
    const serialized = sessionStorage.getItem(storageKey_choicesMade);
    return serialized ? (JSON.parse(serialized) as Record<string, string>) : {};
  } catch {
    return {};
  }
};

const setStore_choicesMade = (store: Record<string, string>) => {
  sessionStorage.setItem(storageKey_choicesMade, JSON.stringify(store));
};

const getStore_choicesOffered = (): Record<
  string,
  [Array<string>, EpochTimeStamp]
> => {
  try {
    const serialized = sessionStorage.getItem(storageKey_choicesOffered);
    return serialized
      ? (JSON.parse(serialized) as Record<
          string,
          [Array<string>, EpochTimeStamp]
        >)
      : {};
  } catch {
    return {};
  }
};

const setStore_choicesOffered = (
  store: Record<string, [Array<string>, EpochTimeStamp]>
) => {
  sessionStorage.setItem(storageKey_choicesOffered, JSON.stringify(store));
};

export const getItem_choicesMade = (key: string) => getStore_choicesMade()[key];

export const setItem_choicesMade = (key: string, value: string) => {
  const store = getStore_choicesMade();
  store[key] = value;
  setStore_choicesMade(store);
};

const getItem_choicesOffered = (key: string) => getStore_choicesOffered()[key];

export const getChoicesOffered = () =>
  Object.entries(getStore_choicesOffered());
export const getChoicesMade = () => Object.entries(getStore_choicesMade());

export const setItem_choicesOffered = (key: string, values: Array<string>) => {
  const store = getStore_choicesOffered();
  store[key] = [values, Date.now()];
  setStore_choicesOffered(store);
};
