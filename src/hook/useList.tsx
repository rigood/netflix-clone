import { useRecoilState } from "recoil";
import { myMovieAtom, myTvAtom } from "../atom";
import { IContent } from "../api/interface";
import { toastMsg } from "../api/toast";

type useListType = [(id: number) => boolean | undefined, (id: number) => void];

function useList(section: string): useListType {
  const [myMovie, setMyMovie] = useRecoilState<number[]>(myMovieAtom);
  const [myTv, setMyTv] = useRecoilState<number[]>(myTvAtom);
  const MAX_NUM_OF_LIST = 8;

  const checkIsInList = (id: number) => {
    let isInList;
    if (section === "movie") {
      isInList = myMovie.some((prevId) => prevId === id);
    } else if (section === "tv") {
      isInList = myTv.some((prevId) => prevId === id);
    } else {
      return undefined;
    }
    return isInList;
  };

  const checkExceedLimit = () => {
    return section === "movie"
      ? myMovie.length >= MAX_NUM_OF_LIST
      : myTv.length >= MAX_NUM_OF_LIST;
  };

  const removeFromList = (id: number) => {
    if (section === "movie") {
      setMyMovie((prev) => prev.filter((prevId) => prevId !== id));
    } else if (section === "tv") {
      setMyTv((prev) => prev.filter((prevId) => prevId !== id));
    }
    toastMsg("WARN", `My List에서 삭제되었습니다.`);
  };

  const addToList = (id: number) => {
    if (checkExceedLimit()) {
      toastMsg("ERROR", `최대 ${MAX_NUM_OF_LIST}개까지 담을 수 있습니다.`);
      return;
    }
    if (section === "movie") {
      setMyMovie([id, ...myMovie]);
    } else if (section === "tv") {
      setMyTv([id, ...myTv]);
    }
    toastMsg("SUCCESS", `My List에 추가되었습니다.`);
  };

  const toggleList = (id: number) => {
    const isInList = checkIsInList(id);
    if (isInList === undefined) {
      toastMsg("ERROR", "잘못된 접근입니다.");
    }
    isInList ? removeFromList(id) : addToList(id);
  };

  return [checkIsInList, toggleList];
}

export default useList;
