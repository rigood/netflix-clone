import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovieSearch, getTvSearch } from "../api/queryFn";
import Loader from "../components/Loader";
import SearchGrid from "../components/SearchGrid";

function Search() {
  // Extract keyword and section
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q");
  const { section } = useParams();

  // Redirect when there's no keyword or movie/tv section
  const navigate = useNavigate();
  useEffect(() => {
    if (keyword === "" || (section !== "movie" && section !== "tv")) {
      navigate("/");
    }
  }, []);

  // Set Tab
  const [tab, setTab] = useState(section);
  const handleTabClick = (section: string) => {
    setTab(section);
    navigate(`/search/${section}?q=${keyword}`);
  };

  // Initialize tab and scroll as keyword changes
  useEffect(() => {
    setTab("movie");
    window.scrollTo({ top: 0 });
  }, [keyword]);

  // Fetch search-data
  const {
    data: movieData,
    isLoading: loadingMovie,
    hasNextPage: hasNextMoviePage,
    fetchNextPage: fetchNextMoviePage,
  } = useInfiniteQuery(
    ["movieSearch", keyword],
    ({ pageParam = 1 }) => getMovieSearch(keyword!, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return (
          lastPage.data.page < lastPage.data.total_pages &&
          lastPage.data.page + 1
        );
      },
      enabled: !!keyword,
    }
  );

  const {
    data: tvData,
    isLoading: loadingTv,
    hasNextPage: hasNextTvPage,
    fetchNextPage: fetchNextTvPage,
  } = useInfiniteQuery(
    ["TvSearch", keyword],
    ({ pageParam = 1 }) => getTvSearch(keyword!, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return (
          lastPage.data.page < lastPage.data.total_pages &&
          lastPage.data.page + 1
        );
      },
      enabled: !!keyword,
    }
  );

  // Filter search-results
  const movieSearch = movieData?.pages.flatMap((page) => page.data.results);
  const movieCount = movieData?.pages[0].data.total_results;
  const filteredMovieSearch = movieSearch?.filter((movie, i) => {
    return (
      movieSearch.findIndex((movie2, j) => {
        return movie.id === movie2.id;
      }) === i
    );
  });

  const tvSearch = tvData?.pages.flatMap((page) => page.data.results);
  const tvCount = tvData?.pages[0].data.total_results;
  const filteredTvSearch = tvSearch?.filter((tv, i) => {
    return (
      tvSearch.findIndex((tv2, j) => {
        return tv.id === tv2.id;
      }) === i
    );
  });

  // Infinite Scroll
  const isLoading = loadingMovie || loadingTv;
  const movieObserver = useRef<IntersectionObserver>();
  const movieRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (movieObserver.current) movieObserver.current.disconnect();
      movieObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasNextMoviePage) {
            fetchNextMoviePage();
          }
        }
      });
      if (node) movieObserver.current.observe(node);
    },
    [isLoading, keyword, movieData]
  );

  const tvObserver = useRef<IntersectionObserver>();
  const tvRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (tvObserver.current) tvObserver.current.disconnect();
      tvObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          hasNextTvPage && fetchNextTvPage();
        }
      });
      if (node) tvObserver.current.observe(node);
    },
    [isLoading, keyword, tvData]
  );

  // Loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Wrapper>
        <Title>
          <strong>{keyword}</strong> 에 대한 검색 결과
        </Title>
        <TabWrapper>
          <Tab
            isActive={tab === "movie"}
            onClick={() => handleTabClick("movie")}
          >
            영화({movieCount})
          </Tab>
          <Tab isActive={tab === "tv"} onClick={() => handleTabClick("tv")}>
            TV 프로그램({tvCount})
          </Tab>
        </TabWrapper>
        <SearchGrid
          keyword={keyword!}
          section={tab!}
          contents={tab === "movie" ? filteredMovieSearch! : filteredTvSearch!}
          ref={tab === "movie" ? movieRef : tvRef}
        />
      </Wrapper>
    </>
  );
}

export default Search;

const Wrapper = styled.div`
  padding: 130px 60px 60px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #808080;
  strong {
    font-size: 28px;
    font-weight: 700;
    color: ${(props) => props.theme.white.darker};
  }
`;

const TabWrapper = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 30px;
  margin-bottom: 60px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 3px;
  cursor: pointer;
  color: ${(props) => props.isActive && "#E51013"};
  border-bottom: ${(props) => props.isActive && "3px solid #E51013"};
`;
