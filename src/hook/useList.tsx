import { useRecoilState } from "recoil";
import { myMovieAtom, myTvAtom } from "../atom";
import { toastMsg } from "../toast";

type useListType = [
  (id: number) => boolean,
  (id: number) => void,
  (id: number) => void
];

function useList(section: string): useListType {
  const [myMovie, setMyMovie] = useRecoilState<number[]>(myMovieAtom);
  const [myTv, setMyTv] = useRecoilState<number[]>(myTvAtom);
  const MAX_NUM_OF_LIST = 8;

  const checkIsNewContent = (id: number): boolean => {
    return section === "movie"
      ? myMovie.every((prevId) => prevId !== id)
      : myTv.every((prevId) => prevId !== id);
  };

  const checkExceedLimit = () => {
    return section === "movie"
      ? myMovie.length >= MAX_NUM_OF_LIST
      : myTv.length >= MAX_NUM_OF_LIST;
  };

  const addToList = (id: number) => {
    const isExceedLimit = checkExceedLimit();
    if (isExceedLimit) {
      toastMsg("ERROR", `최대 ${MAX_NUM_OF_LIST}개까지 담을 수 있습니다.`);
      return;
    }
    section === "movie" ? setMyMovie([id, ...myMovie]) : setMyTv([id, ...myTv]);
    toastMsg("SUCCESS", `My List에 추가되었습니다.`);
  };

  const removeFromList = (id: number) => {
    section === "movie"
      ? setMyMovie((prev) => prev.filter((prevId) => prevId !== id))
      : setMyTv((prev) => prev.filter((prevId) => prevId !== id));
    toastMsg("WARN", `My List에서 삭제되었습니다.`);
  };

  return [checkIsNewContent, addToList, removeFromList];
}

export default useList;
