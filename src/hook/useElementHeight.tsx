import { useState, useEffect, useRef } from "react";

type useElementHeightType = [React.RefObject<HTMLDivElement>, number];

function useElementHeight(): useElementHeightType {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    function updateHeight() {
      if (!ref.current) return;
      setHeight(ref.current?.getBoundingClientRect().height!);
    }

    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return [ref, height];
}

export default useElementHeight;
