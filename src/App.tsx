/* Routing */
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Components */
import Header from "./Components/Header";

/* Pages */
import Home from "./Pages/Home";
import Tv from "./Pages/Tv";
import Search from "./Pages/Search";

/* State-management for body-scroll */
import { useRecoilState } from "recoil";
import { modalState } from "./atom";
import { useEffect } from "react";

function App() {
  const [isModalActive] = useRecoilState(modalState);

  const stopBodyScroll = () => {
    document.body.classList.add("no-scroll", "scroll-width");
    document.getElementsByTagName("nav")[0].classList.add("scroll-width");
  };
  const restoreBodyScroll = () => {
    document.body.classList.remove("no-scroll", "scroll-width");
    document.getElementsByTagName("nav")[0].classList.remove("scroll-width");
  };

  useEffect(() => {
    isModalActive ? stopBodyScroll() : restoreBodyScroll();
  }, [isModalActive]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:category/:id" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:category/:id" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
