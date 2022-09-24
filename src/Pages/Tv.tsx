/* Data-fetching */
import { useQuery } from "@tanstack/react-query";

/* Fetcher function */
import { getList } from "../Api/api";

/* Interface */
import { IContent } from "../Api/interface";

/* Routing */
import { useMatch } from "react-router-dom";

/* Components */
import Slider from "../Components/Slider";
import Modal from "../Components/Modal";

function Tv() {
  /* Slider Data-fectching */
  const { data: airingTodayTvList, isLoading: loadingAiringToday } = useQuery<IContent[]>(["airingTodayTvList"], () => getList("tv", "airing_today"));
  const { data: popularTvList, isLoading: loadingPopular } = useQuery<IContent[]>(["popularTvList"], () => getList("tv", "popular"));
  const { data: topRatedTvList, isLoading: loadingTopRated } = useQuery<IContent[]>(["topRatedTvList"], () => getList("tv", "top_rated"));

  const isLoading = loadingAiringToday || loadingPopular || loadingTopRated;

  /* Routing for Modal */
  const modalMatch = useMatch("/:section/:category/:id");
  const category = modalMatch?.params.category;
  const id = modalMatch?.params.id;

  console.log("아이디", id);
  console.log("모달매치", modalMatch);

  return (
    <>
      <Slider section="tv" category="airingtoday" title="방영 중인 TV쇼" list={airingTodayTvList} />
      <Slider section="tv" category="popular" title="인기 TV 콘텐츠" list={popularTvList} />
      <Slider section="tv" category="toprated" title="최고 평점 TV쇼" list={topRatedTvList} />
      {modalMatch ? <Modal section="tv" category={category!} id={id!} /> : null}
    </>
  );
}

export default Tv;
