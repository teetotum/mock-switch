import { useEffect, useRef } from "preact/hooks";

interface Options {
  ref?: any;
  useCapture?: boolean;
}

const defaultOptions: Options = {
  useCapture: true,
};

export const useClickOutside = (
  callback: (e: MouseEvent) => void,
  op?: Options
): { ref: any } => {
  const options = { ...defaultOptions, ...op };
  const storedCallback = useRef<(e: MouseEvent) => void>();
  storedCallback.current = callback;
  const ref = useRef();
  const activeRef = options.ref || ref;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (activeRef.current && !activeRef.current.contains(e.target)) {
        storedCallback.current?.(e);
      }
    };
    document.addEventListener("click", handleClick, options.useCapture);
    return () =>
      document.removeEventListener("click", handleClick, options.useCapture);
  }, [activeRef, options.useCapture]);

  return { ref };
};
