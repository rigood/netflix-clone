import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { IContent, IContentsGridProps } from "../Api/interface";
import { getDate, getImgPath, getRating, noPoster } from "../Api/utils";
import { useNavigate } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { myMovieAtom, myTvAtom } from "../atom";
import { useState } from "react";
import useList from "../hook/useList";

const Title = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  margin-top: 3rem;
`;

const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  position: relative;
`;

const ContentWrapper = styled.div``;

const PosterButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 36px;
  height: 36px;
  padding: 10px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.8);
  color: rgba(255, 255, 255, 0.7);
  font-size: 36px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border-color: white;
    color: white;
  }
  display: none;
`;

const PosterOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
`;

const Poster = styled.div<{ bg: string }>`
  width: 100%;
  aspect-ratio: 2 / 3;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  &:hover ${PosterOverlay} {
    display: block;
  }
  &:hover ${PosterButton} {
    display: block;
  }
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  padding-top: 10px;
  h1 {
    font-size: 14px;
    text-align: center;
    --max-lines: 1;
    display: -webkit-box;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 28px;
  }
  div {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const MoreButton = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 20px;
  height: 20px;
  padding: 5px;
  border-radius: 50%;
  border: 3px solid lightgray;
  color: lightgray;
  cursor: pointer;
  &:hover {
    background-color: gray;
    border-color: white;
    color: white;
  }
`;

function ContentsGrid({ title, contents, section }: IContentsGridProps) {
  const [checkDuplicate, onPosterClick] = useList(section);

  const offset = 8;
  const [index, setIndex] = useState(offset);

  return (
    <>
      <Title>{title}</Title>
      <GridWrapper>
        {contents?.slice(0, index).map((content) => (
          <ContentWrapper key={content.id}>
            <Poster
              bg={
                content.poster_path
                  ? getImgPath(content.poster_path, "w500")
                  : noPoster
              }
              onClick={() => onPosterClick(content)}
            >
              <PosterOverlay />
              <PosterButton
                icon={checkDuplicate(content.id) ? faCheck : faPlus}
              />
            </Poster>
            <Info>
              <h1>{section === "movie" ? content.title : content.name}</h1>
              <div>
                {getDate(section, content.release_date, content.first_air_date)}
              </div>
              <div>{getRating(content.vote_average)}</div>
            </Info>
          </ContentWrapper>
        ))}
        {index < contents?.length ? (
          <MoreButton
            icon={faChevronDown}
            onClick={() => setIndex((prev) => prev + offset)}
          />
        ) : null}
      </GridWrapper>
      {contents?.length === 0 ? "준비중입니다." : null}
    </>
  );
}

export default ContentsGrid;
