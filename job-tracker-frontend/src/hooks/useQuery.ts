import { useEffect, useState } from 'react';

type ReturnValue<T> = {
  data?: T,
  error?: string,
  isLoading: boolean,
};

const baseUrl = 'http://localhost:8000';

// Following the Apollo client pattern
// https://www.apollographql.com/docs/react/api/react/hooks/#usequery
export const useQuery = <R>(path: string): ReturnValue<R> => {
  const [data, setData] = useState<R | undefined>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    fetch(`${baseUrl}${path}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError(`Error making request to ${path}`);
          setLoading(false);
        }
      })
      .then((responseBody) => {
        setData(responseBody as R);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error querying ${path}`);
        console.error(path);
        setError(`Error making request to ${path}`);
        setLoading(false);
      })
  }, [path]);

  return {
    error,
    data,
    isLoading,
  };
};
