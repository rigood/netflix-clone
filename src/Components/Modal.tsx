import styled from "styled-components";

import { useState } from "react";

/* Fetcher function */
import { getBackdropPath } from "../Api/utils";

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
import { noImg } from "../Api/utils";

/* Close Btn */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faVolumeOff,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

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
  background-color: black;
  z-index: 9999;
  position: relative; // CloseBtn 배치
  border-radius: 20px;
  overflow: hidden;
`;

const Backdrop = styled.div<{ bg: string }>`
  width: 100%;
  padding-top: 56.25%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
`;

const Button = styled(FontAwesomeIcon)`
  position: absolute;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;

const CloseBtn = styled(Button)`
  top: 20px;
  right: 20px;
`;

const VolumeBtn = styled(Button)`
  bottom: 90px;
  right: 30px;
`;

const MainVideo = styled.div`
  position: relative;
  iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
`;

function Modal({ section, category, details, cast, videos }: IModalProps) {
  /* State-management for Modal scroll */
  const setIsModalOpen = useSetRecoilState(modalState);

  const mainVideoKey = videos?.[0]?.key;

  const [mute, setMute] = useState(1);

  /* Routing */
  const navigate = useNavigate();
  const closeModal = () => {
    setIsModalOpen(false);
    if (section === "movie") {
      navigate("/");
    } else if (section === "tv") {
      navigate("/tv");
    }
  };

  const toggleMute = () => {
    setMute((prev) => (prev === 1 ? 0 : 1));
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
            {mainVideoKey && (
              <MainVideo>
                <iframe
                  src={`https://www.youtube.com/embed/${mainVideoKey}?autoplay=1&controls=0&showinfo=0&rel=0&mute=${mute}`}
                  frameBorder="0"
                  allow="autoplay;"
                ></iframe>
                <VolumeBtn
                  icon={mute === 1 ? faVolumeXmark : faVolumeOff}
                  onClick={toggleMute}
                />
              </MainVideo>
            )}
            <Backdrop
              bg={
                details.backdrop_path
                  ? getBackdropPath(details.backdrop_path)
                  : noImg
              }
            />

            <h1>
              {" "}
              제목 : {section === "movie" ? details.title : details.name}
            </h1>
            <p> 줄거리 : {details.overview}</p>
            <ul>
              {cast?.map((actor, index) => (
                <li key={index}>
                  {actor.name} - {actor.character}
                </li>
              ))}
            </ul>
            <CloseBtn icon={faClose} onClick={closeModal} />
          </Wrapper>
        </Overlay>
      )}
    </>
  );
}

export default Modal;
