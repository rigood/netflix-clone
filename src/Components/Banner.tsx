import styled from "styled-components";

/* Interface */
import { IBannerProps } from "../api/interface";

/* Routing */
import { useNavigate } from "react-router-dom";

/* State-management */
import { useSetRecoilState } from "recoil";
import { modalState } from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { getDate, getRating } from "../api/utils";

/* Styling */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 40%;
  height: 34vw;
  padding-inline: 60px;
  @media screen and (max-width: 1024px) {
    width: 50%;
  }
  @media screen and (max-width: 576px) {
    width: 80%;
  }
`;

const Title = styled.h1`
  margin-bottom: 1vw;
  font-size: 2.5vw;
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.7);
`;

const Ranking = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1vw;
  img {
    width: 1.6vw;
    margin-right: 0.5vw;
  }
  h2 {
    font-size: 1.6vw;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.7);
  }
  @media screen and (max-width: 576px) {
    display: none;
  }
`;

const Overview = styled.p`
  margin-bottom: 1vw;
  font-size: 1.2vw;
  font-weight: 400;
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.7);
  word-wrap: break-word;
  word-break: keep-all;
  --max-lines: 4;
  display: -webkit-box;
  -webkit-line-clamp: var(--max-lines);
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.8vw;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const DateAndRating = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  flex-wrap: wrap;
  font-size: 1vw;
  font-weight: 500;
  span {
    padding: 0.2vw 0.6vw;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.3);
  }
  span:first-child {
    margin-right: 0.5vw;
    color: ${(props) => props.theme.green};
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.div`
  width: fit-content;
  padding: 0.6vw 1.8vw;
  margin-top: 20px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.9);
  color: ${(props) => props.theme.black.darker};
  cursor: pointer;
  font-size: 1.2vw;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
  span {
    margin-left: 0.4vw;
  }
`;

function Banner({ section, title, content }: IBannerProps) {
  /* State-management for Modal scroll */

  /* Routing */
  const navigate = useNavigate();
  const onButtonClick = (id: number) => {
    navigate(`?id=${id}`);
  };

  return (
    <>
      {content && (
        <Container>
          <Title>{section === "movie" ? content.title : content.name}</Title>
          <Ranking>
            <img
              src={process.env.PUBLIC_URL + "/assets/logo.png"}
              alt="Netflix logo"
            />
            <h2>오늘의 {title} 순위 1위</h2>
          </Ranking>
          <Overview>{content.overview}</Overview>
          <DateAndRating>
            <span>
              {getDate(section, content.release_date, content.first_air_date)}
            </span>
            <span>{getRating(content.vote_average)}</span>
          </DateAndRating>
          <Button onClick={() => onButtonClick(content.id)}>
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>자세히 보기</span>
          </Button>
        </Container>
      )}
    </>
  );
}

export default Banner;
