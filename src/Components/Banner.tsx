import styled from "styled-components";

/* Interface */
import { IBannerProps } from "../Api/interface";

/* Styling */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 40%;
  height: 34vw;
  padding-inline: ${(props) => props.theme.px};
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
`;

const Overview = styled.p`
  margin-bottom: 1vw;
  font-size: 1.2vw;
  font-weight: 400;
  word-wrap: break-word;
  word-break: keep-all;
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
`;

function Banner({ section, title, content }: IBannerProps) {
  return (
    <Container>
      <Title>{section === "movie" ? content?.title : content?.name}</Title>
      <Ranking>
        <img src={process.env.PUBLIC_URL + "/assets/logo.png"} alt="Netflix logo" />
        <h2>오늘의 {title} 순위 1위</h2>
      </Ranking>
      <Overview>{content?.overview ? (content?.overview.length! > 100 ? `${content?.overview.slice(0, 100)}... 더보기` : content?.overview) : "등록된 Overview 정보가 없습니다."}</Overview>
      <DateAndRating>
        <span>{section === "movie" ? `개봉일 : ${content?.release_date}` : `첫방영 : ${content?.first_air_date}`}</span>
        <span>평점 : ⭐{content?.vote_average} 점</span>
      </DateAndRating>
    </Container>
  );
}

export default Banner;
