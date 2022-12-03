import { useState, useRef, useEffect } from "react";

type useThumbnailHeightType = [React.RefObject<HTMLDivElement>, number];

function useThumbnailHeight(): useThumbnailHeightType {
  const [thumbnailHeight, setThumbnailHeight] = useState<number>(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateThumbnailHeight() {
      if (!thumbnailRef.current) return;
      setThumbnailHeight(
        thumbnailRef.current?.getBoundingClientRect().width * (9 / 16)
      );
    }

    updateThumbnailHeight();

    window.addEventListener("resize", updateThumbnailHeight);
    return () => window.removeEventListener("resize", updateThumbnailHeight);
  }, []);

  return [thumbnailRef, thumbnailHeight];
}

export default useThumbnailHeight;
