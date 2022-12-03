import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "netflix",
});

export const modalState = atom({
  key: "modal",
  default: false,
});

export const myMovieAtom = atom<number[]>({
  key: "myMovie",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const myTvAtom = atom<number[]>({
  key: "myTv",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const myLangAtom = atom<string>({
  key: "myLang",
  default: "ko",
  effects_UNSTABLE: [persistAtom],
});

export const windowWidthState = atom({
  key: "windowWidth",
  default: window.innerWidth,
});
