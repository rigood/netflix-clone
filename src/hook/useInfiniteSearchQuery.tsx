import { useCallback, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IContent } from "../api/interface";

type queryFnType = (
  kewyword: string,
  pageParam: number
) => Promise<AxiosResponse<any, any>>;

type useInfiniteSearchQueryType = (
  section: string,
  keyword: string,
  queryFn: queryFnType
) => [boolean, number, IContent[], (node: any) => void];

const useInfiniteSearchQuery: useInfiniteSearchQueryType = (
  section,
  keyword,
  queryFn
) => {
  // Fetch search-data
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [section, keyword],
    ({ pageParam = 1 }) => queryFn(keyword!, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return (
          lastPage.data.page < lastPage.data.total_pages &&
          lastPage.data.page + 1
        );
      },
      enabled: Boolean(section && keyword),
    }
  );

  // Filter search-results
  const search = data?.pages.flatMap((page) => page.data.results);
  const count = data?.pages[0].data.total_results;
  const filteredSearch = search?.filter((content, i) => {
    return (
      search.findIndex((content2, j) => {
        return content2.id === content.id;
      }) === i
    );
  });

  // Infinite Scroll
  const observer = useRef<IntersectionObserver>();
  const ref = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasNextPage) {
            fetchNextPage();
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, keyword, data]
  );

  return [isLoading, count, filteredSearch!, ref];
};

export default useInfiniteSearchQuery;
