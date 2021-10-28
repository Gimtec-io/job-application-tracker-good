import { useCallback, useState } from 'react';

type Info<T> = {
  data?: T,
  error?: string,
  isLoading: boolean,
};

type ReturnValue<T> = [
  (body?: any) => void,
  Info<T>,
];

type Options = {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  onCompleted?: () => void,
};

const baseUrl = 'http://localhost:8000';

// Following the Apollo client pattern
// https://www.apollographql.com/docs/react/api/react/hooks/#useMutation
// We centralize the business logic of baseUrl, managing errors, loading states, etc
export const useAPI = <R>(path: string, { method, onCompleted }: Options = { method: 'GET' }): ReturnValue<R> => {
  const [data, setData] = useState<R | undefined>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const makeRequest = useCallback(async (body?: any) => {
    setLoading(true);
    fetch(`${baseUrl}${path}`, {
      method: method || 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
      }),
      body: body ? JSON.stringify(body) : undefined,
    })
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
        if (onCompleted) {
          onCompleted();
        }
      })
      .catch((error) => {
        // Maybe also use a central logger for frontend errors
        console.error(`Error querying ${path}`);
        console.error(error);
        setError(`Error making request to ${path}`);
        setLoading(false);
      })
  }, [path, method, onCompleted]);

  return [
    makeRequest,
      {
      error,
      data,
      isLoading,
    }
  ];
};
