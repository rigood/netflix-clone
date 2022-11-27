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
import { useRecoilState, useSetRecoilState } from "recoil";
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

function Home() {
  /* Slider Data-fectching */
  const { data: nowPlayingMovieList, isLoading: loadingNowPlaying } = useQuery<
    IContent[]
  >(["movie", "nowplaying"], () => getList("movie", "now_playing"));
  const { data: topRatedMovieList, isLoading: loadingTopRated } = useQuery<
    IContent[]
  >(["movie", "toprated"], () => getList("movie", "top_rated"));
  const { data: upcomingMovieList, isLoading: loadingUpcoming } = useQuery<
    IContent[]
  >(["movie", "upcoming"], () => getList("movie", "upcoming"));

  /* Loading */
  const isLoading = loadingNowPlaying || loadingTopRated || loadingUpcoming;
  if (isLoading) {
    return <Loader>로딩중</Loader>;
  }

  return (
    <>
      <Background bg={getImgPath(nowPlayingMovieList?.[0].backdrop_path!)}>
        <Banner
          section="movie"
          title="영화"
          content={nowPlayingMovieList?.[0]}
        />
        <SliderWrapper>
          <Slider
            section="movie"
            title="현재 상영 중인 영화"
            list={nowPlayingMovieList}
            isFirst={true}
          />
          <Slider
            section="movie"
            title="최고 평점 영화"
            list={topRatedMovieList}
            isFirst={false}
          />
          <Slider
            section="movie"
            title="개봉 예정 영화"
            list={upcomingMovieList}
            isFirst={false}
          />
        </SliderWrapper>
      </Background>
    </>
  );
}

export default Home;
