import styled from "styled-components";

import { useLocation, useMatch } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getCast,
  getDetails,
  getVideos,
  getRecommendations,
  getSimilar,
  getMovieSearch,
  getTvSearch,
} from "../Api/api";
import { ICast, IContent, IDetails, ISearch, IVideo } from "../Api/interface";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchGrid from "../Components/SearchGrid";
import Modal from "../Components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atom";
import axios from "axios";

/* Styling */
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 50px;
`;

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

function Search() {
  // Extract keyword
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const section = new URLSearchParams(location.search).get("section");
  const id = new URLSearchParams(location.search).get("id");

  // Open Modal
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  useEffect(() => {
    setIsModalOpen(id ? true : false);
  }, [location]);

  // Open Tab
  const [isMovieTab, setIsMovieTab] = useState(true);

  // Search data fetching
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
    }
  );

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

  const isLoading = loadingMovie || loadingTv;

  // Infinite Scroll
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

  // Modal data fetching
  // const { data: detailsContent } = useQuery<IDetails>(
  //   ["detailsContent", id],
  //   () => getDetails(section!, id!),
  //   { enabled: !!id }
  // );
  // const { data: castContent } = useQuery<ICast[]>(
  //   ["castContent", id],
  //   () => getCast(section!, id!),
  //   { enabled: !!id }
  // );
  // const { data: videoContent } = useQuery<IVideo[]>(
  //   ["videoContent", id],
  //   () => getVideos(section!, id!),
  //   { enabled: !!id }
  // );
  // const { data: recoContent } = useQuery<IContent[]>(
  //   ["recoContent", id],
  //   () => getRecommendations(section!, id!),
  //   { enabled: !!id }
  // );
  // const { data: similarContent } = useQuery<IContent[]>(
  //   ["similarContent", id],
  //   () => getSimilar(section!, id!),
  //   { enabled: !!id }
  // );

  // Loading
  if (isLoading) {
    return <Loader>로딩중</Loader>;
  }

  return (
    <>
      <Wrapper>
        <Title>
          <strong>{keyword}</strong> 에 대한 검색 결과
        </Title>
        <TabWrapper>
          <Tab isActive={isMovieTab} onClick={() => setIsMovieTab(true)}>
            영화({movieCount})
          </Tab>
          <Tab isActive={!isMovieTab} onClick={() => setIsMovieTab(false)}>
            TV 프로그램({tvCount})
          </Tab>
        </TabWrapper>
        <SearchGrid
          keyword={keyword!}
          section={isMovieTab ? "movie" : "tv"}
          contents={isMovieTab ? filteredMovieSearch! : filteredTvSearch!}
          ref={isMovieTab ? movieRef : tvRef}
        />
      </Wrapper>
      {/* {isModalOpen && (
        <Modal
          section={isMovieTab ? "movie" : "tv"}
          details={detailsContent!}
          cast={castContent!}
          videos={videoContent!}
          reco={recoContent!}
          similar={similarContent!}
        />
      )} */}
    </>
  );
}

export default Search;
