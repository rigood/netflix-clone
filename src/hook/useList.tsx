import { useRecoilState } from "recoil";
import { myMovieAtom, myTvAtom } from "../atom";
import { IContent } from "../Api/interface";

type useListType = [(id: number) => boolean, (content: IContent) => void];

function useList(section: string): useListType {
  const [myMovie, setMyMovie] = useRecoilState<IContent[]>(myMovieAtom);
  const [myTv, setMyTv] = useRecoilState<IContent[]>(myTvAtom);

  const checkDuplicate = (id: number) => {
    let isDuplicate;
    if (section === "movie") {
      isDuplicate = myMovie.some((movie) => movie.id === id);
    } else {
      isDuplicate = myTv.some((tv) => tv.id === id);
    }
    return isDuplicate;
  };

  const removeFromList = (content: IContent) => {
    if (section === "movie") {
      setMyMovie((prev) => prev.filter((movie) => movie.id !== content.id));
    } else if (section === "tv") {
      setMyTv((prev) => prev.filter((tv) => tv.id !== content.id));
    }
    alert(`My List에서 삭제되었습니다!`);
  };

  const addToList = (content: IContent) => {
    if (section === "movie") {
      setMyMovie([content, ...myMovie]);
    } else if (section === "tv") {
      setMyTv([content, ...myTv]);
    }
    alert(`My List에 추가되었습니다!`);
  };

  const onPosterClick = (content: IContent) =>
    checkDuplicate(content.id) ? removeFromList(content) : addToList(content);

  return [checkDuplicate, onPosterClick];
}

export default useList;
