import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IContent } from "../api/interface";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { getDate, getImgPath, getRating, noPoster } from "../api/utils";

interface IContentProps {
  section: string;
  content: IContent;
  icon: IconDefinition;
  onClick: (id: number) => void;
}

function Content({ section, content, icon, onClick }: IContentProps) {
  return (
    <>
      <Poster
        bg={
          content.poster_path
            ? getImgPath(content.poster_path, "w500")
            : noPoster
        }
        onClick={() => onClick(content.id)}
      >
        <PosterOverlay />
        <PosterButton icon={icon} />
      </Poster>
      <Info>
        <h1>{section === "movie" ? content.title : content.name}</h1>
        <div className="date">
          {getDate(section, content.release_date, content.first_air_date)}
        </div>
        <div className="rating">{getRating(content.vote_average)}</div>
      </Info>
    </>
  );
}

export default Content;

const PosterButton = styled(FontAwesomeIcon)`
  display: none;
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
  @media (hover: hover) {
    &:hover {
      border-color: white;
      color: white;
    }
  }
  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
    font-size: 24px;
  }
`;

const PosterOverlay = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  @media (hover: hover) {
    &:hover {
      transform: scale(1.05);
    }
    &:hover ${PosterOverlay} {
      display: block;
    }
    &:hover ${PosterButton} {
      display: block;
    }
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
    font-weight: 700;
    text-align: center;
    margin: 5px 0;
  }
  div {
    font-size: 12px;
    opacity: 0.8;
    text-align: center;
  }
  .date {
    color: ${({ theme }) => theme.green};
  }
`;
