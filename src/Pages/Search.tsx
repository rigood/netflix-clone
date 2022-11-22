import styled from "styled-components";

import { useLocation, useMatch } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getCast,
  getDetails,
  getRecommendations,
  getSearch,
  getSimilar,
  getVideos,
} from "../Api/api";
import { ICast, IContent, IDetails, ISearch, IVideo } from "../Api/interface";
import { useEffect, useState } from "react";
import SearchGrid from "../Components/SearchGrid";
import Modal from "../Components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atom";

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

  // Tab
  const [isMovieTab, setIsMovieTab] = useState(true);

  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  useEffect(() => {
    setIsModalOpen(id ? true : false);
  }, [location]);

  // Data-fectching
  const { data: movieSearch, isLoading: loadingMovie } = useQuery<ISearch>(
    ["movieSearch", keyword],
    () => getSearch("movie", keyword!)
  );

  const { data: tvSearch, isLoading: loadingTv } = useQuery<ISearch>(
    ["tvSearch", keyword],
    () => getSearch("tv", keyword!)
  );

  const { data: detailsContent } = useQuery<IDetails>(
    ["detailsContent", id],
    () => getDetails(section!, id!),
    { enabled: !!id }
  );
  const { data: castContent } = useQuery<ICast[]>(
    ["castContent", id],
    () => getCast(section!, id!),
    { enabled: !!id }
  );
  const { data: videoContent } = useQuery<IVideo[]>(
    ["videoContent", id],
    () => getVideos(section!, id!),
    { enabled: !!id }
  );
  const { data: recoContent } = useQuery<IContent[]>(
    ["recoContent", id],
    () => getRecommendations(section!, id!),
    { enabled: !!id }
  );
  const { data: similarContent } = useQuery<IContent[]>(
    ["similarContent", id],
    () => getSimilar(section!, id!),
    { enabled: !!id }
  );

  console.log("movie", movieSearch);

  // Loading
  const isLoading = loadingMovie || loadingTv;
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
            영화
          </Tab>
          <Tab isActive={!isMovieTab} onClick={() => setIsMovieTab(false)}>
            TV 프로그램
          </Tab>
        </TabWrapper>
        <SearchGrid
          keyword={keyword!}
          section={isMovieTab ? "movie" : "tv"}
          contents={isMovieTab ? movieSearch?.results : tvSearch?.results}
        />
      </Wrapper>
      {isModalOpen && (
        <Modal
          section={isMovieTab ? "movie" : "tv"}
          details={detailsContent!}
          cast={castContent!}
          videos={videoContent!}
          reco={recoContent!}
          similar={similarContent!}
        />
      )}
    </>
  );
}

export default Search;
