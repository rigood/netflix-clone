/* Data-fetching */
import { useQuery } from "@tanstack/react-query";

/* Fetcher function */
import { getCast, getDetails, getList } from "../Api/api";

/* Interface */
import { IContent, IDetails, ICast } from "../Api/interface";

/* Routing */
import { useMatch } from "react-router-dom";

/* Components */
import Slider from "../Components/Slider";

function Tv() {
  /* Slider Data-fectching */
  const { data: airingTodayTvList, isLoading: loadingAiringToday } = useQuery<IContent[]>(["airingTodayTvList"], () => getList("tv", "airing_today"));
  const { data: popularTvList, isLoading: loadingPopular } = useQuery<IContent[]>(["popularTvList"], () => getList("tv", "popular"));
  const { data: topRatedTvList, isLoading: loadingTopRated } = useQuery<IContent[]>(["topRatedTvList"], () => getList("tv", "top_rated"));

  const isLoading = loadingAiringToday || loadingPopular || loadingTopRated;

  /* Routing for Modal */
  const ModalMatch = useMatch("/:section/:category/:id");
  const id = ModalMatch?.params.id;

  /* Modal Data-fectching */
  const { data: tvDetails, isLoading: loadingTvDetails } = useQuery<IDetails>(["tvDetails", id], () => getDetails("tv", id!), { enabled: !!id });
  const { data: tvCast, isLoading: loadingTvCast } = useQuery<ICast>(["tvCast", id], () => getCast("tv", id!), { enabled: !!id });

  const isModalLoading = loadingTvDetails || loadingTvCast;

  return (
    <>
      <Slider section="tv" category="airingtoday" title="방영 중인 TV쇼" list={airingTodayTvList} />
      <Slider section="tv" category="popular" title="인기 TV 콘텐츠" list={popularTvList} />
      <Slider section="tv" category="toprated" title="최고 평점 TV쇼" list={topRatedTvList} />
    </>
  );
}

export default Tv;
