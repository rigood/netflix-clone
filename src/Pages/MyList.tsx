import { useQueries } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { myMovieAtom, myTvAtom } from "../atom";
import { getDetails } from "../api/queryFn";
import Loader from "../components/Loader";
import MyListGrid from "../components/MyListGrid";

function MyList() {
  const myMovie = useRecoilValue(myMovieAtom);
  const myTv = useRecoilValue(myTvAtom);

  const myMovieQuery = useQueries({
    queries: myMovie.map((movieId) => {
      return {
        queryKey: ["myMovie", String(movieId)],
        queryFn: () => getDetails("movie", String(movieId)),
      };
    }),
  });

  const myTvQuery = useQueries({
    queries: myTv.map((tvId) => {
      return {
        queryKey: ["myTv", String(tvId)],
        queryFn: () => getDetails("tv", String(tvId)),
      };
    }),
  });

  const myMovieData = myMovieQuery?.map((myMovie) => myMovie.data);
  const myTvData = myTvQuery?.map((myTv) => myTv.data);

  const isMyMovieLoading = myMovieQuery.some((myMovie) => myMovie.isLoading);
  const isMyTvLoading = myTvQuery.some((myTv) => myTv.isLoading);
  const isLoading = isMyMovieLoading || isMyTvLoading;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Wrapper>
        <MyListGrid title="영화" contents={myMovieData} section="movie" />
        <MyListGrid title="TV Show" contents={myTvData} section="tv" />
      </Wrapper>
    </>
  );
}

export default MyList;

const Wrapper = styled.div`
  padding: 100px 60px 60px 60px;
  display: flex;
  flex-direction: column;
`;
