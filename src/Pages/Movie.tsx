import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { IContent } from "../api/interface";
import { getMovieList } from "../api/queryFn";
import { getImgPath } from "../api/utils";
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import Slider from "../components/Slider";

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
    </>
  );
}

export default Home;

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
