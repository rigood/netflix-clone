import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { myMovieAtom, myTvAtom } from "../atom";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { getDetails } from "../api/api";
import MyListGrid from "../components/MyListGrid";

const Wrapper = styled.div`
  padding: 100px 60px 60px 60px;
  display: flex;
  flex-direction: column;
`;

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

  console.log(myMovieData);

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
