import { useQueries } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { myLangAtom, myMovieAtom, myTvAtom } from "../atom";
import { getDetails } from "../api/queryFn";
import Loader from "../components/Loader";
import MyListGrid from "../components/MyListGrid";

function MyList() {
  // language translation
  const { t } = useTranslation();

  const lang = useRecoilValue(myLangAtom);
  const myMovie = useRecoilValue(myMovieAtom);
  const myTv = useRecoilValue(myTvAtom);

  const myMovieQuery = useQueries({
    queries: myMovie.map((movieId) => {
      return {
        queryKey: ["myMovie", String(movieId), lang],
        queryFn: () => getDetails("movie", String(movieId), lang),
      };
    }),
  });

  const myTvQuery = useQueries({
    queries: myTv.map((tvId) => {
      return {
        queryKey: ["myTv", String(tvId), lang],
        queryFn: () => getDetails("tv", String(tvId), lang),
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
        <MyListGrid
          title={t("mylist.movie")}
          contents={myMovieData}
          section="movie"
          altText={t("mylist.altText")}
        />
        <MyListGrid
          title={t("mylist.tv")}
          contents={myTvData}
          section="tv"
          altText={t("mylist.altText")}
        />
      </Wrapper>
    </>
  );
}

export default MyList;

const Wrapper = styled.div`
  padding: 60px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1023px) {
    padding: 40px;
  }
  @media (max-width: 479px) {
    padding: 40px 20px;
  }
`;
