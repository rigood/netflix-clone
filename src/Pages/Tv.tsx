import styled from "styled-components";

/* Data-fetching */
import { useQuery } from "@tanstack/react-query";

/* Fetcher function */
import {
  getCast,
  getDetails,
  getList,
  getRecommendations,
  getSimilar,
  getVideos,
} from "../api/queryFn";
import { getImgPath } from "../api/utils";

/* Interface */
import { ICast, IContent, IVideo } from "../api/interface";

/* Routing */
import { useLocation, useMatch, useParams } from "react-router-dom";

/* State-management for Modal */
import { useRecoilState } from "recoil";
import { modalState } from "../atom";

/* Components */
import Slider from "../components/Slider";
import Modal from "../components/Modal";
import Banner from "../components/Banner";
import { useEffect } from "react";

/* Styling */
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 50px;
`;

const Background = styled.div<{ bg: string }>`
  width: 100%;
  height: 56.25vw;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bg});
  background-size: cover;
`;

const SliderWrapper = styled.div`
  padding-block: 5vw;
`;

function Tv() {
  /* Slider Data-fectching */
  const { data: airingTodayTvList, isLoading: loadingAiringToday } = useQuery<
    IContent[]
  >(["airingTodayTvList"], () => getList("tv", "airing_today"));
  const { data: popularTvList, isLoading: loadingPopular } = useQuery<
    IContent[]
  >(["popularTvList"], () => getList("tv", "popular"));
  const { data: topRatedTvList, isLoading: loadingTopRated } = useQuery<
    IContent[]
  >(["topRatedTvList"], () => getList("tv", "top_rated"));

  /* Loading */
  const isLoading = loadingAiringToday || loadingPopular || loadingTopRated;
  if (isLoading) {
    return <Loader>로딩중</Loader>;
  }

  return (
    <>
      <Background bg={getImgPath(airingTodayTvList?.[0].backdrop_path!)}>
        <Banner section="tv" title="TV" content={airingTodayTvList?.[0]} />
        <SliderWrapper>
          <Slider
            section="tv"
            title="방영 중인 TV쇼"
            list={airingTodayTvList}
            isFirst={true}
          />
          <Slider
            section="tv"
            title="인기 TV 콘텐츠"
            list={popularTvList}
            isFirst={false}
          />
          <Slider
            section="tv"
            title="최고 평점 TV쇼"
            list={topRatedTvList}
            isFirst={false}
          />
        </SliderWrapper>
      </Background>
    </>
  );
}

export default Tv;
