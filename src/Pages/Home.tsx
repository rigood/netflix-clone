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
} from "../Api/api";
import { getImgPath } from "../Api/utils";

/* Interface */
import { ICast, IContent, IDetails, IVideo } from "../Api/interface";

/* Routing */
import { useLocation, useMatch } from "react-router-dom";

/* State-management for Modal */
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState } from "../atom";

/* Components */
import Slider from "../Components/Slider";
import Modal from "../Components/Modal";
import Banner from "../Components/Banner";
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
  >(["nowPlayingMovieList"], () => getList("movie", "now_playing"));
  const { data: topRatedMovieList, isLoading: loadingTopRated } = useQuery<
    IContent[]
  >(["topRatedMovieList"], () => getList("movie", "top_rated"));
  const { data: upcomingMovieList, isLoading: loadingUpcoming } = useQuery<
    IContent[]
  >(["upcomingMovieList"], () => getList("movie", "upcoming"));

  /* Routing for Modal */
  const modalMatch = useMatch("/:section/:id");
  const id = modalMatch?.params.id;
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  const location = useLocation();

  useEffect(() => {
    setIsModalOpen(id ? true : false);
  }, [location]);

  /* Modal Data-fectching */
  const { data: detailsContent } = useQuery<IDetails>(
    ["detailsContent", id],
    () => getDetails("movie", id!),
    { enabled: !!id }
  );
  const { data: castContent } = useQuery<ICast[]>(
    ["castContent", id],
    () => getCast("movie", id!),
    { enabled: !!id }
  );
  const { data: videoContent } = useQuery<IVideo[]>(
    ["videoContent", id],
    () => getVideos("movie", id!),
    { enabled: !!id }
  );
  const { data: recoContent } = useQuery<IContent[]>(
    ["recoContent", id],
    () => getRecommendations("movie", id!),
    { enabled: !!id }
  );
  const { data: similarContent } = useQuery<IContent[]>(
    ["similarContent", id],
    () => getSimilar("movie", id!),
    { enabled: !!id }
  );

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
      {isModalOpen && (
        <Modal
          section="movie"
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

export default Home;
