import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieSearch, getTvSearch } from "../api/queryFn";
import Loader from "../components/Loader";
import SearchGrid from "../components/SearchGrid";
import useInfiniteSearchQuery from "../hook/useInfiniteSearchQuery";
import { useTranslation } from "react-i18next";

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

  // language translation
  const { t } = useTranslation();

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
          <strong>"{keyword}"</strong>
          <span>{t("search.title")}</span>
        </Title>
        <TabWrapper>
          <Tab
            isActive={tab === "movie"}
            onClick={() => handleTabClick("movie")}
          >
            {t("menu.movie")}({movieCount})
          </Tab>
          <Tab isActive={tab === "tv"} onClick={() => handleTabClick("tv")}>
            {t("menu.tv")}({tvCount})
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
  padding: 120px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1023px) {
    padding: 100px 40px;
  }
  @media (max-width: 479px) {
    padding: 80px 20px;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  color: #808080;
  text-align: center;
  strong {
    font-size: 24px;
    font-weight: 700;
    color: white;
  }
  @media (max-width: 479px) {
    font-size: 18px;
    strong {
      font-size: 20px;
    }
  }
`;

const TabWrapper = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 30px;
  margin-bottom: 60px;
  @media (max-width: 479px) {
    margin-bottom: 30px;
  }
`;

const Tab = styled.span<{ isActive: boolean }>`
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 3px;
  cursor: pointer;
  color: ${(props) => props.isActive && "#E51013"};
  border-bottom: ${(props) => props.isActive && "3px solid #E51013"};
  @media (max-width: 479px) {
    font-size: 20px;
  }
`;
