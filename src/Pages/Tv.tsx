import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { IContent } from "../api/interface";
import { getTvList } from "../api/queryFn";
import { getImgPath } from "../api/utils";
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import Slider from "../components/Slider";

function Tv() {
  const { data: airingTodayTvList, isLoading: loadingAiringToday } = useQuery<
    IContent[]
  >(["airingTodayTvList"], () => getTvList("airing_today"));
  const { data: popularTvList, isLoading: loadingPopular } = useQuery<
    IContent[]
  >(["popularTvList"], () => getTvList("popular"));
  const { data: topRatedTvList, isLoading: loadingTopRated } = useQuery<
    IContent[]
  >(["topRatedTvList"], () => getTvList("top_rated"));

  const isLoading = loadingAiringToday || loadingPopular || loadingTopRated;
  if (isLoading) {
    return <Loader />;
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
