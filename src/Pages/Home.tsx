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

function Home() {
  /* Slider Data-fectching */
  const { data: nowPlayingMovieList, isLoading: loadingNowPlaying } = useQuery<IContent[]>(["nowPlayingMovieList"], () => getList("movie", "now_playing"));
  const { data: topRatedMovieList, isLoading: loadingTopRated } = useQuery<IContent[]>(["topRatedMovieList"], () => getList("movie", "top_rated"));
  const { data: upcomingMovieList, isLoading: loadingUpcoming } = useQuery<IContent[]>(["upcomingMovieList"], () => getList("movie", "upcoming"));

  const isLoading = loadingNowPlaying || loadingTopRated || loadingUpcoming;

  /* Routing for Modal */
  const modalMatch = useMatch("/:section/:category/:id");
  const category = modalMatch?.params.category;
  const id = modalMatch?.params.id;

  console.log("아이디", id);
  console.log("모달매치", modalMatch);
  return (
    <>
      <Slider section="movie" category="nowplaying" title="현재 상영 중인 영화" list={nowPlayingMovieList} />
      <Slider section="movie" category="toprated" title="최고 평점 영화" list={topRatedMovieList} />
      <Slider section="movie" category="upcoming" title="개봉 예정 영화" list={upcomingMovieList} />
      {modalMatch ? <Modal section="movie" category={category!} id={id!} /> : null}
    </>
  );
}

export default Home;
