import { atom } from "recoil";
import { IContent } from "./Api/interface";

export const modalState = atom({
  key: "modal",
  default: false,
});

export const myMovieAtom = atom<IContent[]>({
  key: "myMovie",
  default: [],
});

export const myTvAtom = atom<IContent[]>({
  key: "myTv",
  default: [],
});
