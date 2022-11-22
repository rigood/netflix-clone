import styled from "styled-components";

/* Fetcher function */
import { getImgPath, getRating } from "../Api/utils";

/* Interface */
import { IModalProps } from "../Api/interface";

/* Routing */
import { useNavigate } from "react-router-dom";

/* Motion */
import { motion } from "framer-motion";

/* Modal-scroll */
import { useSetRecoilState } from "recoil";
import { modalState } from "../atom";

/* Default BgImg */
import { noBackdrop } from "../Api/utils";

/* Close Btn */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import MainVideo from "./MainVideo";
import ContentsGrid from "./ContentsGrid";
import CastGrid from "./CastGrid";
import Videos from "./Videos";

/* Styling */

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  overflow-y: scroll;
  z-index: 8;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;

const Wrapper = styled(motion.div)`
  width: min(90%, 900px);
  margin: 30px auto;
  padding-bottom: 30px;
  background-color: black;
  z-index: 9999;
  position: relative; // CloseBtn 배치
  border-radius: 20px;
  overflow: hidden;
`;

const Backdrop = styled.div<{ bg: string }>`
  width: 100%;
  padding-top: 56.25%;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1)
    ),
    url(${(props) => props.bg});
  background-size: cover;
`;

const Button = styled(FontAwesomeIcon)`
  position: absolute;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  margin: 0 30px;
  padding-bottom: 50px;
`;

const Genres = styled.div`
  margin-bottom: 10px;
  span {
    margin-right: 10px;
    padding: 3px 6px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.red};
    font-size: 14px;
    font-weight: 400;
  }
`;

const Number = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 400;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const DateAndRating = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
  span:first-child {
    margin-right: 10px;
    color: ${(props) => props.theme.green};
  }
`;

const Overview = styled.p``;

const CloseBtn = styled(Button)`
  top: 20px;
  right: 20px;
`;

function Modal({ section, details, cast, videos, reco, similar }: IModalProps) {
  /* State-management for Modal scroll */

  const mainVideoKey = videos?.[0]?.key;

  /* Routing */
  const navigate = useNavigate();
  const closeModal = () => {
    navigate(-1);
  };

  return (
    <>
      {details && (
        <Overlay
          onClick={closeModal}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Wrapper
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            {mainVideoKey ? (
              <MainVideo videoKey={mainVideoKey} />
            ) : (
              <Backdrop
                bg={
                  details.backdrop_path
                    ? getImgPath(details.backdrop_path)
                    : noBackdrop
                }
              />
            )}

            <ContentWrapper>
              <Genres>
                {details.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </Genres>
              <Title>{details.title || details.name}</Title>
              <Number>
                {section === "movie"
                  ? `상영시간 : ${details.runtime}분`
                  : `시즌 ${details.number_of_seasons}개 에피소드 ${details.number_of_episodes}개`}
              </Number>
              <DateAndRating>
                <span>
                  {section === "movie"
                    ? `개봉일 : ${details.release_date}`
                    : `첫방영 : ${details.first_air_date}`}
                </span>
                <span>{getRating(details.vote_average)}</span>
              </DateAndRating>
              <Overview>
                {details.overview
                  ? details.overview
                  : "줄거리 정보 준비중입니다."}
              </Overview>
              <CastGrid title="출연진" cast={cast} />
              <Videos title="관련 영상" videos={videos} />
              <ContentsGrid
                title="추천 콘텐츠"
                contents={reco}
                section={section}
              />
              <ContentsGrid
                title="비슷한 콘텐츠"
                contents={similar}
                section={section}
              />
            </ContentWrapper>
            <CloseBtn icon={faClose} onClick={closeModal} />
          </Wrapper>
        </Overlay>
      )}
    </>
  );
}

export default Modal;
