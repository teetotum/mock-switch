import { useState } from "preact/hooks";

const storageKey_state =
  "mock-switch::state | f75b1c42-32d2-433b-8af0-8cf73c490129";

const get = <TValue>(fallback: TValue): TValue => {
  try {
    const serialized = sessionStorage.getItem(storageKey_state);
    return serialized ? (JSON.parse(serialized) as TValue) : fallback;
  } catch {
    return fallback;
  }
};

const set = <TValue>(value: TValue) => {
  sessionStorage.setItem(storageKey_state, JSON.stringify(value));
};

export const useSessionStorage = <TValue>(fallback: TValue) => {
  const [value, setBackingValue] = useState<TValue>(() => get(fallback));
  const setValue = (val: TValue) => {
    set(val);
    setBackingValue(val);
  };
  return [value, setValue] as const;
};
