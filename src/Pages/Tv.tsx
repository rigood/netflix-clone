import { useQuery } from "@tanstack/react-query";
import { IContent } from "../api/interface";
import { getTvList } from "../api/queryFn";
import { getImgPath } from "../api/utils";
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import Slider from "../components/Slider";
import { BackgroundWrapper, SliderContainer } from "../styles/common";

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
      <BackgroundWrapper
        backdropBg={getImgPath(airingTodayTvList?.[0].backdrop_path!)}
        posterBg={getImgPath(airingTodayTvList?.[0].poster_path!)}
      >
        <Banner section="tv" content={airingTodayTvList?.[0]} />
        <SliderContainer>
          <Slider
            section="tv"
            title="방영 중인 TV쇼"
            list={airingTodayTvList}
            hasBannerContent={true}
            zindex={3}
          />
          <Slider
            section="tv"
            title="인기 TV 콘텐츠"
            list={popularTvList}
            hasBannerContent={false}
            zindex={2}
          />
          <Slider
            section="tv"
            title="최고 평점 TV쇼"
            list={topRatedTvList}
            hasBannerContent={false}
            zindex={1}
          />
        </SliderContainer>
      </BackgroundWrapper>
    </>
  );
}

export default Tv;
