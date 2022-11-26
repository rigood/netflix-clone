import { useParams } from "react-router-dom";
import Movie from "./Movie";
import Tv from "./Tv";
import NotFound from "./NotFound";

function Browse() {
  const { section } = useParams();
  switch (section) {
    case "movie":
      return <Movie />;
    case "tv":
      return <Tv />;
    default:
      return <NotFound />;
  }
}

export default Browse;
