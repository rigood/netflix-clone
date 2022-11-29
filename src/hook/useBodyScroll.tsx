import useScrollbarSize from "react-scrollbar-size";

function useBodyScroll() {
  const { width } = useScrollbarSize();

  function stopBodyScroll() {
    document.body.style.overflowY = "hidden";
    document.body.style.width = `calc(100% - ${width}px)`;
    document.getElementsByTagName(
      "nav"
    )[0].style.width = `calc(100% - ${width}px)`;
  }

  function restoreBodyScroll() {
    document.body.style.overflowY = "visible";
    document.body.style.width = "unset";
    document.getElementsByTagName("nav")[0].style.width = `100%`;
  }

  return [stopBodyScroll, restoreBodyScroll];
}

export default useBodyScroll;
