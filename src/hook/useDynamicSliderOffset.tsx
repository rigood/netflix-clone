import useWindowWidth from "./useWindowWidth";

function useDynamicSliderOffset() {
  const windowWidth = useWindowWidth();
  if (windowWidth <= 320) return 1;
  else if (windowWidth <= 768) return 2;
  else if (windowWidth <= 1024) return 3;
  else if (windowWidth <= 1440) return 4;
  else return 6;
}

export default useDynamicSliderOffset;
