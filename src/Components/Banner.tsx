import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IContent } from "../api/interface";
import { getDate, getRating } from "../api/utils";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface IBannerProps {
  section: string;
  content?: IContent;
}

function Banner({ section, content }: IBannerProps) {
  const navigate = useNavigate();
  const onMoreButtonClick = (id: number) => {
    navigate(`?id=${id}`);
  };

  return (
    <>
      {content && (
        <Container>
          <RankingContainer>
            <RankingLogo
              src={process.env.PUBLIC_URL + "/assets/logo.png"}
              alt="Netflix logo"
            />
            <RankingText>
              오늘의 {section === "movie" ? "영화" : "TV 쇼"} 순위 1위
            </RankingText>
          </RankingContainer>
          <Title>{section === "movie" ? content.title : content.name}</Title>
          <DateAndRatingContainer>
            <Date>
              {getDate(section, content.release_date, content.first_air_date)}
            </Date>
            <Rating>{getRating(content.vote_average)}</Rating>
          </DateAndRatingContainer>
          <Overview hasText={Boolean(content.overview)}>
            {content.overview}
          </Overview>
          <MoreBtn onClick={() => onMoreButtonClick(content.id)}>
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>자세히 보기</span>
          </MoreBtn>
        </Container>
      )}
    </>
  );
}

export default Banner;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  // 반응형
  padding-top: 15vw;
  padding-left: 60px;
  @media (max-width: 1024px) {
    padding-top: 25vw;
    padding-left: 60px;
  }
  @media (max-width: 768px) {
    padding-top: 25vw;
    padding-left: 40px;
  }
  @media (max-width: 480px) {
    width: 100%;
    align-items: center;
    padding-top: 35vw;
    padding-left: 0;
  }
`;

const RankingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RankingLogo = styled.img`
  // 반응형
  width: 32px;
  margin-right: 5px;
  @media (max-width: 1024px) {
    width: 24px;
    margin-right: 3px;
  }
  @media (max-width: 768px) {
    width: 20px;
    margin-right: 3px;
  }
  @media (max-width: 480px) {
    width: 16px;
    margin-right: 2px;
  }
`;

const RankingText = styled.h1`
  ${({ theme }) => theme.textShadow};
  // 반응형
  font-size: 32px;
  @media (max-width: 1024px) {
    font-size: 24px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Title = styled.h1`
  // 반응형
  width: 60%;
  font-size: 72px;
  margin-bottom: 10px;
  @media (max-width: 1024px) {
    width: 70%;
    font-size: 48px;
    margin-bottom: 5px;
  }
  @media (max-width: 768px) {
    width: 80%;
    font-size: 36px;
    margin-bottom: 5px;
  }
  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
    font-size: 32px;
    margin-bottom: 3px;
  }
  ${({ theme }) => theme.textShadow};
  ${({ theme }) => theme.MaxLines(1)}
`;

const DateAndRatingContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  font-weight: 500;
  // 반응형
  font-size: 16px;
  margin-bottom: 10px;
  @media (max-width: 1024px) {
    font-size: 15px;
    margin-bottom: 10px;
  }
  @media (max-width: 1024px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    font-size: 13px;
    margin-bottom: 8px;
  }
`;

const Date = styled.span`
  color: ${({ theme }) => theme.green};
`;

const Rating = styled.span`
  margin-left: 10px;
`;

const Overview = styled.p<{ hasText: boolean }>`
  font-weight: 500;
  word-wrap: break-word;
  word-break: keep-all;
  ${({ theme }) => theme.textShadow};
  ${({ theme }) => theme.MaxLines(3)};
  // 반응형
  width: 50%;
  font-size: 24px;
  margin-bottom: 20px;
  @media (max-width: 1024px) {
    width: 60%;
    font-size: 18px;
    margin-bottom: 15px;
  }
  @media (max-width: 768px) {
    width: 70%;
    font-size: 14px;
    margin-bottom: 10px;
  }
  @media (max-width: 480px) {
    width: 80%;
    text-align: center;
    font-size: 13px;
    margin-bottom: 15px;
  }
`;

const MoreBtn = styled.div`
  width: fit-content;
  border-radius: 6px;
  color: black;
  span {
    margin-left: 5px;
  }
  // 반응형
  font-size: 24px;
  padding: 12px 36px;
  @media (max-width: 1024px) {
    font-size: 18px;
    padding: 10px 30px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 24px;
  }
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 24px;
  }
  // hover
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: rgba(255, 255, 255, 0.9);
  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;
