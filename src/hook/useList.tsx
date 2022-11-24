import { useRecoilState } from "recoil";
import { myMovieAtom, myTvAtom } from "../atom";
import { IContent } from "../Api/interface";
import { toastMsg } from "../Api/toast";

type useListType = [
  (id: number) => boolean | undefined,
  (content: IContent) => void
];

function useList(section: string): useListType {
  const [myMovie, setMyMovie] = useRecoilState<IContent[]>(myMovieAtom);
  const [myTv, setMyTv] = useRecoilState<IContent[]>(myTvAtom);
  const MAX_NUM_OF_LIST = 8;

  const checkDuplicate = (id: number) => {
    let isDuplicate;
    if (section === "movie") {
      isDuplicate = myMovie.some((movie) => movie.id === id);
    } else if (section === "tv") {
      isDuplicate = myTv.some((tv) => tv.id === id);
    } else {
      return undefined;
    }
    return isDuplicate;
  };

  const checkExceedLimit = () => {
    return section === "movie"
      ? myMovie.length >= MAX_NUM_OF_LIST
      : myTv.length >= MAX_NUM_OF_LIST;
  };

  const removeFromList = (content: IContent) => {
    if (section === "movie") {
      setMyMovie((prev) => prev.filter((movie) => movie.id !== content.id));
    } else if (section === "tv") {
      setMyTv((prev) => prev.filter((tv) => tv.id !== content.id));
    }
    toastMsg("WARN", `My List에서 삭제되었습니다.`);
  };

  const addToList = (content: IContent) => {
    if (checkExceedLimit()) {
      toastMsg("ERROR", `최대 ${MAX_NUM_OF_LIST}개까지 담을 수 있습니다.`);
      return;
    }
    if (section === "movie") {
      setMyMovie([content, ...myMovie]);
    } else if (section === "tv") {
      setMyTv([content, ...myTv]);
    }
    toastMsg("SUCCESS", `My List에 추가되었습니다.`);
  };

  const onPosterClick = (content: IContent) => {
    const isDuplicate = checkDuplicate(content.id);
    if (isDuplicate === undefined) {
      toastMsg("ERROR", "잘못된 접근입니다.");
    }
    checkDuplicate(content.id) ? removeFromList(content) : addToList(content);
  };

  return [checkDuplicate, onPosterClick];
}

export default useList;
