import { useCallback, useEffect, useState } from "react";

export interface CustomOptions extends RequestInit {
  url: string;
}

type CallApi = <TData>() => {
  data: TData | null;
  hasError: boolean;
  isLoading: boolean;
  clear: () => void;
  send: (options: CustomOptions) => void;
};

const useCallApi: CallApi = <TData>() => {
  const [options, setOptions] = useState<CustomOptions | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const [data, setData] = useState<TData | null>(null);

  const reset = () => {
    setLoading(false);
    setOptions(null);
  };

  const clear = () => {
    setData(null);
  };

  const makeRequest = useCallback(
    async ({ url, ...options }: CustomOptions) => {
      try {
        const response = await fetch(url, options);
        setData((await response.json()) as TData);
      } catch (error) {
        reset();
        setError(true);
        console.error(error);
      }
      reset();
    },
    []
  );

  useEffect(() => {
    if (!options) return;

    setError(false);
    setLoading(true);

    void makeRequest(options);
  }, [makeRequest, options]);

  return {
    data,
    hasError,
    isLoading,
    clear,
    send: (options: CustomOptions) => {
      setOptions(options);
    },
  };
};

export default useCallApi;
