import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieSearch, getTvSearch } from "../api/queryFn";
import Loader from "../components/Loader";
import SearchGrid from "../components/SearchGrid";
import useInfiniteSearchQuery from "../hook/useInfiniteSearchQuery";

function Search() {
  // Extract keyword and section
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q");
  const { section } = useParams();

  // Redirect when there's no keyword or movie/tv section
  const navigate = useNavigate();
  useEffect(() => {
    if (keyword === "" || (section !== "movie" && section !== "tv")) {
      navigate("/");
    }
  }, []);

  // Set Tab
  const [tab, setTab] = useState(section);
  const handleTabClick = (section: string) => {
    setTab(section);
    navigate(`/search/${section}?q=${keyword}`);
  };

  // Initialize tab and scroll as keyword changes
  useEffect(() => {
    setTab("movie");
    window.scrollTo({ top: 0 });
  }, [keyword]);

  // Fetch data
  const [movieLoading, movieCount, filteredMovieSearch, movieRef] =
    useInfiniteSearchQuery("movie", keyword!, getMovieSearch);

  const [tvLoading, tvCount, filteredTvSearch, tvRef] = useInfiniteSearchQuery(
    "tv",
    keyword!,
    getTvSearch
  );

  // Loading
  const isLoading = movieLoading || tvLoading;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Wrapper>
        <Title>
          <strong>{keyword}</strong> 에 대한 검색 결과
        </Title>
        <TabWrapper>
          <Tab
            isActive={tab === "movie"}
            onClick={() => handleTabClick("movie")}
          >
            영화({movieCount})
          </Tab>
          <Tab isActive={tab === "tv"} onClick={() => handleTabClick("tv")}>
            TV 프로그램({tvCount})
          </Tab>
        </TabWrapper>
        <SearchGrid
          keyword={keyword!}
          section={tab!}
          contents={tab === "movie" ? filteredMovieSearch! : filteredTvSearch!}
          ref={tab === "movie" ? movieRef : tvRef}
        />
      </Wrapper>
    </>
  );
}

export default Search;

const Wrapper = styled.div`
  padding: 130px 60px 60px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #808080;
  strong {
    font-size: 28px;
    font-weight: 700;
    color: white;
  }
`;

const TabWrapper = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 30px;
  margin-bottom: 60px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 3px;
  cursor: pointer;
  color: ${(props) => props.isActive && "#E51013"};
  border-bottom: ${(props) => props.isActive && "3px solid #E51013"};
`;
