import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { ICast, IContent, IVideo } from "../api/interface";
import { modalState } from "../atom";
import {
  getCast,
  getDetails,
  getRecommendations,
  getSimilar,
  getVideos,
} from "../api/queryFn";
import {
  getDate,
  getImgPath,
  getRating,
  getRuntimeOrEpisodes,
  noBackdrop,
} from "../api/utils";
import useList from "../hook/useList";
import CastGrid from "./CastGrid";
import MainVideo from "./MainVideo";
import Videos from "./Videos";
import ContentsGrid from "./ContentsGrid";
import { faCheck, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import useBodyScroll from "../hook/useBodyScroll";

function Modal() {
  // Extract section, id
  const { section } = useParams();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  // Open Modal
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  useEffect(() => {
    setIsModalOpen(id ? true : false);
  }, [location]);

  // Close Modal
  const navigate = useNavigate();
  const closeModal = () => {
    navigate(-1);
  };

  // Change body scroll as Modal changes
  const [stopBodyScroll, restoreBodyScroll] = useBodyScroll();
  useEffect(() => {
    isModalOpen ? stopBodyScroll() : restoreBodyScroll();
  }, [isModalOpen]);

  // Fetch data
  const { data: details, isLoading: detailsLoading } = useQuery<IContent>(
    ["detailsContent", id],
    () => getDetails(section!, id!),
    {
      enabled: !!id,
      onError: (error) => {
        setIsModalOpen(false);
        navigate(-1);
      },
    }
  );
  const {
    data: cast,
    isLoading: castLoading,
    isError,
  } = useQuery<ICast[]>(["castContent", id], () => getCast(section!, id!), {
    enabled: !!id,
  });
  const { data: videos, isLoading: videosLoading } = useQuery<IVideo[]>(
    ["videoContent", id],
    () => getVideos(section!, id!),
    { enabled: !!id }
  );
  const { data: reco, isLoading: recoLoading } = useQuery<IContent[]>(
    ["recoContent", id],
    () => getRecommendations(section!, id!),
    { enabled: !!id }
  );
  const { data: similar, isLoading: similarLoading } = useQuery<IContent[]>(
    ["similarContent", id],
    () => getSimilar(section!, id!),
    { enabled: !!id }
  );

  const mainVideoKey = videos?.[0]?.key;

  // Add/Remove content from MyList
  const [checkIsNewContent, addToList, removeFromList] = useList(section!);

  // Loading
  const isLoading =
    detailsLoading ||
    castLoading ||
    videosLoading ||
    recoLoading ||
    similarLoading;

  return (
    <>
      {isModalOpen && (
        <Overlay
          onClick={closeModal}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            <Loader>로딩중</Loader>
          ) : (
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
                    details?.backdrop_path
                      ? getImgPath(details?.backdrop_path)
                      : noBackdrop
                  }
                />
              )}
              <ContentWrapper>
                <Genres>
                  {details?.genres.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </Genres>
                <Title>
                  {details?.title ||
                    details?.name ||
                    "존재하지 않는 콘텐츠입니다."}
                </Title>
                <Row>
                  <div className="info">
                    <Number>
                      {getRuntimeOrEpisodes(
                        section!,
                        details?.runtime!,
                        details?.number_of_seasons!,
                        details?.number_of_episodes!
                      )}
                    </Number>
                    <DateAndRating>
                      <span>
                        {getDate(
                          section!,
                          details?.release_date!,
                          details?.first_air_date!
                        )}
                      </span>
                      <span>{getRating(details?.vote_average!)}</span>
                    </DateAndRating>
                  </div>
                  <div>
                    {!isError && checkIsNewContent(details?.id!) ? (
                      <Button
                        icon={faPlus}
                        onClick={() => addToList(details?.id!)}
                      />
                    ) : (
                      <Button
                        icon={faCheck}
                        onClick={() => removeFromList(details?.id!)}
                      />
                    )}
                  </div>
                </Row>
                <Overview>
                  {details?.overview || "등록된 줄거리 정보가 없습니다."}
                </Overview>
                <CastGrid title="출연진" cast={cast!} />
                <Videos title="관련 영상" videos={videos!} />
                <ContentsGrid
                  title="추천 콘텐츠"
                  contents={reco!}
                  section={section!}
                />
                <ContentsGrid
                  title="비슷한 콘텐츠"
                  contents={similar!}
                  section={section!}
                />
              </ContentWrapper>
              <CloseBtn icon={faClose} onClick={closeModal} />
            </Wrapper>
          )}
        </Overlay>
      )}
    </>
  );
}

export default Modal;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 50px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  overflow-y: scroll;
  z-index: 8;
  background-color: rgba(0, 0, 0, 0.5);
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
  width: 28px;
  height: 28px;
  padding: 5px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.8);
  color: rgba(255, 255, 255, 0.7);
  font-size: 28px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border-color: white;
    color: white;
  }
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
  font-size: 14px;
  font-weight: 400;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  .info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

const DateAndRating = styled.div`
  font-size: 16px;
  span:first-child {
    margin-right: 10px;
    color: ${(props) => props.theme.green};
  }
`;

const CloseBtn = styled(FontAwesomeIcon)`
  width: 28px;
  height: 28px;
  padding: 5px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.8);
  color: rgba(255, 255, 255, 0.7);
  font-size: 28px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border-color: white;
    color: white;
  }
  top: 20px;
  right: 20px;
`;

const Overview = styled.p``;
