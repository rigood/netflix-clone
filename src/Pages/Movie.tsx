import { useQuery } from "@tanstack/react-query";
import { IContent } from "../api/interface";
import { getMovieList } from "../api/queryFn";
import { getImgPath } from "../api/utils";
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import Slider from "../components/Slider";
import { BackgroundWrapper, SliderContainer } from "../styles/common";

function Home() {
  const { data: nowPlayingMovieList, isLoading: loadingNowPlaying } = useQuery<
    IContent[]
  >(["nowPlayingMovieList"], () => getMovieList("now_playing"));
  const { data: topRatedMovieList, isLoading: loadingTopRated } = useQuery<
    IContent[]
  >(["topRatedMovieList"], () => getMovieList("top_rated"));
  const { data: upcomingMovieList, isLoading: loadingUpcoming } = useQuery<
    IContent[]
  >(["upcomingMovieList"], () => getMovieList("upcoming"));

  const isLoading = loadingNowPlaying || loadingTopRated || loadingUpcoming;
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <BackgroundWrapper
        backdropBg={getImgPath(nowPlayingMovieList?.[0].backdrop_path!)}
        posterBg={getImgPath(nowPlayingMovieList?.[0].poster_path!)}
      >
        <Banner section="movie" content={nowPlayingMovieList?.[0]} />
        <SliderContainer>
          <Slider
            section="movie"
            title="현재 상영 중인 영화"
            list={nowPlayingMovieList}
            shouldCutFirstContent={true}
          />
          <Slider
            section="movie"
            title="최고 평점 영화"
            list={topRatedMovieList}
            shouldCutFirstContent={false}
          />
          <Slider
            section="movie"
            title="개봉 예정 영화"
            list={upcomingMovieList}
            shouldCutFirstContent={false}
          />
        </SliderContainer>
      </BackgroundWrapper>
    </>
  );
}

export default Home;
