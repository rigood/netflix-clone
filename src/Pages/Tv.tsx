import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";
import { myLangAtom } from "../atom";
import { IContent } from "../api/interface";
import { getTvList } from "../api/queryFn";
import { getImgPath } from "../api/utils";
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import Slider from "../components/Slider";
import { BackgroundWrapper, SliderContainer } from "../styles/common";

function Tv() {
  // language translation
  const { t } = useTranslation();

  const lang = useRecoilValue(myLangAtom);

  const { data: airingTodayTvList, isLoading: loadingAiringToday } = useQuery<
    IContent[]
  >(["airingTodayTvList", lang], () => getTvList("airing_today", lang));

  const { data: popularTvList, isLoading: loadingPopular } = useQuery<
    IContent[]
  >(["popularTvList", lang], () => getTvList("popular", lang));

  const { data: topRatedTvList, isLoading: loadingTopRated } = useQuery<
    IContent[]
  >(["topRatedTvList", lang], () => getTvList("top_rated", lang));

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
            title={t("category.tv.airingtoday")}
            list={airingTodayTvList}
            zindex={3}
          />
          <Slider
            section="tv"
            title={t("category.tv.popular")}
            list={popularTvList}
            zindex={2}
          />
          <Slider
            section="tv"
            title={t("category.tv.topRated")}
            list={topRatedTvList}
            zindex={1}
          />
        </SliderContainer>
      </BackgroundWrapper>
    </>
  );
}

export default Tv;
