import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay = 300) => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounced;
};

export default useDebounce;
