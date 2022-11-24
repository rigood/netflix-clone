import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { IContent } from "./Api/interface";

const { persistAtom } = recoilPersist({
  key: "myList",
});

export const modalState = atom({
  key: "modal",
  default: false,
});

export const myMovieAtom = atom<IContent[]>({
  key: "myMovie",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const myTvAtom = atom<IContent[]>({
  key: "myTv",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
