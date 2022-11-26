import styled from "styled-components";
import { useRecoilState } from "recoil";
import { myMovieAtom, myTvAtom } from "../atom";
import MyListGrid from "../components/MyListGrid";
import Modal from "../components/Modal";

const Wrapper = styled.div`
  padding: 100px 60px 60px 60px;
  display: flex;
  flex-direction: column;
`;

function MyList() {
  const [myMovie, setMyMovie] = useRecoilState(myMovieAtom);
  const [myTv, setMyTv] = useRecoilState(myTvAtom);

  return (
    <>
      <Wrapper>
        <MyListGrid title="영화" contents={myMovie} section="movie" />
        <MyListGrid title="TV Show" contents={myTv} section="tv" />
      </Wrapper>
    </>
  );
}

export default MyList;
