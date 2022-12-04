import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IContent } from "../api/interface";
import { getImgPath } from "../api/utils";
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

  // language translation
  const { t } = useTranslation();

  return (
    <>
      {content && (
        <Container
          backdropBg={getImgPath(content.backdrop_path)}
          posterBg={getImgPath(content.poster_path)}
        >
          <RankingContainer>
            <RankingLogo
              src={process.env.PUBLIC_URL + "/assets/logo.png"}
              alt="Netflix logo"
            />
            <RankingText>
              {section === "movie" ? t("banner.movie") : t("banner.tv")}
            </RankingText>
          </RankingContainer>

          <Title>{section === "movie" ? content.title : content.name}</Title>

          <DateAndRatingContainer>
            <Date>
              {section === "movie"
                ? t("label.release") + ": " + content.release_date ??
                  t("label.none")
                : t("label.firstAir") + ": " + content.first_air_date ??
                  t("label.none")}
            </Date>
            <Rating>
              {content.vote_average
                ? t("label.rating") + ": ⭐" + content.vote_average
                : t("label.rating") + ": ⭐" + t("label.none")}
            </Rating>
          </DateAndRatingContainer>

          <Overview>{content.overview || t("banner.altText")}</Overview>

          <MoreBtn onClick={() => onMoreButtonClick(content.id)}>
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>{t("banner.button")}</span>
          </MoreBtn>
        </Container>
      )}
    </>
  );
}

export default Banner;

const Container = styled.div<{ backdropBg: string; posterBg: string }>`
  width: 100%;
  height: 56.25vw;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.backdropBg});

  @media (max-width: 1024px) {
    height: 90vw;
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    align-items: center;
    height: 150vw;
    padding: 0 20px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
      url(${(props) => props.posterBg});
  }
`;

const RankingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RankingLogo = styled.img`
  width: 1.6vw;
  margin-right: 5px;

  @media (max-width: 1024px) {
    width: 20px;
  }
`;

const RankingText = styled.h1`
  font-size: 1.6vw;
  font-weight: 700;
  ${({ theme }) => theme.textShadow};

  @media (max-width: 1024px) {
    font-size: 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.6vw;
  font-weight: 700;
  margin-bottom: 20px;
  ${({ theme }) => theme.textShadow};

  @media (max-width: 1024px) {
    font-size: 32px;
  }
`;

const DateAndRatingContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 10px;
  font-size: 0.9vw;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

const Date = styled.span`
  color: ${({ theme }) => theme.green};
`;

const Rating = styled.span`
  margin-left: 10px;
`;

const Overview = styled.p`
  width: 40%;
  margin-bottom: 20px;
  font-size: 1.2vw;
  word-wrap: break-word;
  word-break: keep-all;
  ${({ theme }) => theme.textShadow};
  ${({ theme }) => theme.MaxLines(3)};

  @media (max-width: 1024px) {
    width: 60%;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const MoreBtn = styled.div`
  width: fit-content;
  padding: 10px 30px;
  border-radius: 4px;
  font-size: 1.2vw;
  font-weight: 700;
  color: black;
  span {
    margin-left: 10px;
  }
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: rgba(255, 255, 255, 0.9);

  @media (hover: hover) {
    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }

  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;
