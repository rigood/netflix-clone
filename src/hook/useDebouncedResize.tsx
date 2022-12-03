import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { windowWidthState } from "../atom";

const DELAY_MS = 250;

function debounce(cb: () => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb();
    }, delay);
  };
}

function useDebouncedResize() {
  const [windowWidth, setWindowWidth] = useRecoilState(windowWidthState);

  useEffect(() => {
    const handleResizeDebounced = debounce(() => {
      console.log("resize event handler enter");
      setWindowWidth(window.innerWidth);
      console.log("resize event handler leave");
    }, DELAY_MS);

    window.addEventListener("resize", handleResizeDebounced);
    return () => window.removeEventListener("resize", handleResizeDebounced);
  }, []);

  return windowWidth;
}

export default useDebouncedResize;
