import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { windowWidthState } from "../atom";

type useThumbnailHeightType = [React.RefObject<HTMLDivElement>, number];

function useThumbnailHeight(): useThumbnailHeightType {
  const [thumbnailHeight, setThumbnailHeight] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useRecoilState(windowWidthState);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      if (!thumbnailRef.current) return;
      setThumbnailHeight(
        thumbnailRef.current?.getBoundingClientRect().width * (9 / 16)!
      );
    }

    handleResize();
  }, [windowWidth]);

  return [thumbnailRef, thumbnailHeight];
}

export default useThumbnailHeight;
