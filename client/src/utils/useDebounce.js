import { useEffect, useState } from "react";

const useDebounce = (value) => {
  const [debouncedValues, setDebounceValues] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValues(value);
    }, 500);

    return () => {
      clearTimeout(id);
    };
  }, [value]);
  return debouncedValues;
};

export default useDebounce;
