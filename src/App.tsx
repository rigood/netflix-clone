/* Routing */
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Components */
import Header from "./Components/Header";

/* Pages */
import Home from "./Pages/Home";
import Tv from "./Pages/Tv";
import Search from "./Pages/Search";

function App() {
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
