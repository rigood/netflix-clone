/* Routing */
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Components */
import Header from "./Components/Header";

/* Pages */
import Home from "./Pages/Home";
import Tv from "./Pages/Tv";
import Search from "./Pages/Search";
import MyList from "./Pages/MyList";
import NotFound from "./Pages/NotFound";

/* State-management for body-scroll */
import { useRecoilState } from "recoil";
import { modalState } from "./atom";
import { useEffect } from "react";

function App() {
  const [isModalOpen] = useRecoilState(modalState);

  const stopBodyScroll = () => {
    document.body.classList.add("no-scroll", "scroll-width");
    document.getElementsByTagName("nav")[0].classList.add("scroll-width");
  };
  const restoreBodyScroll = () => {
    document.body.classList.remove("no-scroll", "scroll-width");
    document.getElementsByTagName("nav")[0].classList.remove("scroll-width");
  };

  useEffect(() => {
    isModalOpen ? stopBodyScroll() : restoreBodyScroll();
  }, [isModalOpen]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:id" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:section/:id" element={<Search />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/mylist/:section/:id" element={<MyList />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
