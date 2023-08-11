import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export interface CustomOptions extends RequestInit {
  url: string;
}

type CallApi = <TData>(raw?: boolean) => {
  data: TData | null;
  hasError: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  clear: () => void;
  send: (options: CustomOptions) => void;
};

const useCallApi: CallApi = <TData>(raw?: boolean) => {
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

  const makeRequest = useCallback(async () => {
    const { url, ...rest } = options!;
    try {
      const response = await fetch(url, rest);
      setData((await (raw ? response.blob() : response.json())) as TData);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      reset();
    }
  }, [options, raw]);

  useEffect(() => {
    if (!options) return;

    setError(false);
    setLoading(true);

    void makeRequest();
  }, [makeRequest, options]);

  return {
    data,
    hasError,
    setError,
    isLoading,
    setLoading,
    clear,
    send: (options: CustomOptions) => {
      setOptions(options);
    },
  };
};

export default useCallApi;
