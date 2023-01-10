import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useRecoilValue } from "recoil";
import { ICast, IContent, IVideo } from "../api/interface";
import { modalState, myLangAtom } from "../atom";
import {
  getCast,
  getDetails,
  getRecommendations,
  getSimilar,
  getVideos,
} from "../api/queryFn";
import { getImgPath, noBackdrop } from "../api/utils";
import useBodyScroll from "../hook/useBodyScroll";
import Loader from "../components/Loader";
import Details from "../components/Details";
import CastGrid from "../components/CastGrid";
import MainVideo from "../components/MainVideo";
import Videos from "../components/Videos";
import ContentsGrid from "../components/ContentsGrid";
import { DefaultButton } from "../styles/common";
import { faClose } from "@fortawesome/free-solid-svg-icons";

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
  const lang = useRecoilValue(myLangAtom);
  const {
    data: details,
    isLoading: detailsLoading,
    isError,
  } = useQuery<IContent>(
    ["detailsContent", id, lang],
    () => getDetails(section!, id!, lang),
    {
      enabled: !!id,
      onError: (error) => {
        setIsModalOpen(false);
        navigate(-1);
      },
    }
  );

  const { data: cast, isLoading: castLoading } = useQuery<ICast[]>(
    ["castContent", id, lang],
    () => getCast(section!, id!, lang),
    {
      enabled: !!id,
    }
  );

  const { data: videos, isLoading: videosLoading } = useQuery<IVideo[]>(
    ["videoContent", id, lang],
    () => getVideos(section!, id!, lang),
    { enabled: !!id }
  );

  const { data: reco, isLoading: recoLoading } = useQuery<IContent[]>(
    ["recoContent", id, lang],
    () => getRecommendations(section!, id!, lang),
    { enabled: !!id }
  );

  const { data: similar, isLoading: similarLoading } = useQuery<IContent[]>(
    ["similarContent", id, lang],
    () => getSimilar(section!, id!, lang),
    { enabled: !!id }
  );

  // Loading
  const isLoading =
    detailsLoading ||
    castLoading ||
    videosLoading ||
    recoLoading ||
    similarLoading;

  // Define main video
  const mainVideoKey = videos?.[0]?.key;

  // language translation
  const { t } = useTranslation();

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
            <Loader />
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
              <ContentContainer>
                <Details
                  section={section!}
                  details={details!}
                  isError={isError}
                />
                <CastGrid
                  title={t("modal.cast")}
                  cast={cast!}
                  altText={t("modal.altText.info")}
                />
                <Videos
                  title={t("modal.video")}
                  videos={videos!}
                  altText={t("modal.altText.info")}
                />
                <ContentsGrid
                  title={t("modal.recommend")}
                  contents={reco!}
                  section={section!}
                  altText={t("modal.altText.prep")}
                />
                <ContentsGrid
                  title={t("modal.similar")}
                  contents={similar!}
                  section={section!}
                  altText={t("modal.altText.prep")}
                />
              </ContentContainer>
              <CloseButton icon={faClose} onClick={closeModal} />
            </Wrapper>
          )}
        </Overlay>
      )}
    </>
  );
}

export default Modal;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  overflow-y: scroll;
  z-index: 9998; // Wrapper 밑에 위치
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Wrapper = styled(motion.div)`
  width: min(90%, 900px);
  margin: 30px auto;
  padding-bottom: 50px;
  background-color: black;
  z-index: 9999;
  position: relative; // CloseBtn 배치
  border-radius: 8px;
  overflow: hidden;
  @media (max-width: 767px) {
    width: 100%;
    margin: 0 auto;
  }
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

const ContentContainer = styled.div`
  margin: 0 30px;
`;

const CloseButton = styled(FontAwesomeIcon)`
  ${DefaultButton}
  position: absolute;
  top: 20px;
  right: 20px;
`;
