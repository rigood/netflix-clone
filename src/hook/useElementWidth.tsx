import { useState, useEffect, useRef } from "react";

type useElementWidthType = [React.RefObject<HTMLDivElement>, number];

function useElementWidth(): useElementWidthType {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    function updateWidth() {
      if (!ref.current) return;
      setWidth(ref.current?.getBoundingClientRect().width!);
    }

    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return [ref, width];
}

export default useElementWidth;
