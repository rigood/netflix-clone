import useWindowWidth from "./useWindowWidth";

type useSliderOffset = number;

function useDynamicSliderOffset() {
  const windowWidth = useWindowWidth();
  if (windowWidth <= 320) return 1;
  else if (windowWidth <= 480) return 2;
  else if (windowWidth <= 768) return 3;
  else if (windowWidth <= 1024) return 4;
  else return 6;
}

export default useDynamicSliderOffset;
