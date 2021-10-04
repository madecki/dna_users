import { useEffect, useState } from "react";

export default function useFetch<T>(
  query: string,
  queryParams?: {
    page: number;
    limit: number;
  }
): {
  data: T | undefined;
  isLoading: boolean;
  headers: Headers | undefined;
  error: string;
} {
  const [data, setData] = useState();
  const [headers, setHeaders] = useState<Headers>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;
    let queryParamsString = "";

    if (queryParams) {
      Object.entries(queryParams).forEach(([param, value], index) => {
        queryParamsString += `${index === 0 ? "?" : "&"}_${param}=${value}`;
      });
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}${query}${queryParamsString}`
        );
        const reponseHeaders = response.headers;
        const responseData = await response.json();

        setData(responseData);
        setHeaders(reponseHeaders);
      } catch {
        setError("Error while fetching data");
      }
      setIsLoading(false);
    };

    fetchData();
  }, [query, queryParams]);

  return { data, isLoading, error, headers };
}
