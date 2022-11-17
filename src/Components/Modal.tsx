import styled from "styled-components";

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
import { faClose } from "@fortawesome/free-solid-svg-icons";

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
`;

const Backdrop = styled.div<{ bg: string }>`
  width: 100%;
  padding-top: 56.25%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
`;

const CloseBtn = styled(FontAwesomeIcon)`
  position: absolute;
  top: 20px;
  right: 20px;

  font-size: 20px;
  padding: 4px 8px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
`;

function Modal({ section, category, details, cast }: IModalProps) {
  /* State-management for Modal scroll */
  const setIsModalOpen = useSetRecoilState(modalState);

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
