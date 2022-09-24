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

function Home() {
  /* Slider Data-fectching */
  const { data: nowPlayingMovieList, isLoading: loadingNowPlaying } = useQuery<IContent[]>(["nowPlayingMovieList"], () => getList("movie", "now_playing"));
  const { data: topRatedMovieList, isLoading: loadingTopRated } = useQuery<IContent[]>(["topRatedMovieList"], () => getList("movie", "top_rated"));
  const { data: upcomingMovieList, isLoading: loadingUpcoming } = useQuery<IContent[]>(["upcomingMovieList"], () => getList("movie", "upcoming"));

  const isLoading = loadingNowPlaying || loadingTopRated || loadingUpcoming;

  /* Routing for Modal */
  const ModalMatch = useMatch("/:section/:category/:id");
  const id = ModalMatch?.params.id;

  /* Modal Data-fectching */
  const { data: movieDetails, isLoading: loadingMovieDetails } = useQuery<IDetails>(["movieDetails", id], () => getDetails("movie", id!), { enabled: !!id });
  const { data: movieCast, isLoading: loadingMovieCast } = useQuery<ICast>(["movieCast", id], () => getCast("movie", id!), { enabled: !!id });

  const isModalLoading = loadingMovieDetails || loadingMovieCast;

  return (
    <>
      <Slider section="movie" category="nowplaying" title="현재 상영 중인 영화" list={nowPlayingMovieList} />
      <Slider section="movie" category="toprated" title="최고 평점 영화" list={topRatedMovieList} />
      <Slider section="movie" category="upcoming" title="개봉 예정 영화" list={upcomingMovieList} />
    </>
  );
}

export default Home;
