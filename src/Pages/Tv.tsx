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
import { useRecoilState } from "recoil";
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
    () => getDetails("tv", id!),
    { enabled: !!id }
  );
  const { data: castContent } = useQuery<ICast[]>(
    ["castContent", id],
    () => getCast("tv", id!),
    { enabled: !!id }
  );
  const { data: videoContent } = useQuery<IVideo[]>(
    ["videoContent", id],
    () => getVideos("tv", id!),
    { enabled: !!id }
  );
  const { data: recoContent } = useQuery<IContent[]>(
    ["recoContent", id],
    () => getRecommendations("tv", id!),
    { enabled: !!id }
  );
  const { data: similarContent } = useQuery<IContent[]>(
    ["similarContent", id],
    () => getSimilar("tv", id!),
    { enabled: !!id }
  );

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
      {isModalOpen && (
        <Modal
          section="tv"
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

export default Tv;
