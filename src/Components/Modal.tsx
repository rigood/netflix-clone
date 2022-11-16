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
`;

const Backdrop = styled.div<{ bg: string }>`
  width: 100%;
  padding-top: 56.25%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
`;

function Modal({ section, category, details, cast }: IModalProps) {
  /* State-management for Modal scroll */
  const setIsModalOpen = useSetRecoilState(modalState);

  /* Routing */
  const navigate = useNavigate();
  const onOverlayClicked = () => {
    setIsModalOpen(false);
    if (section === "movie") {
      navigate("/");
    } else if (section === "tv") {
      navigate("/tv");
    }
  };

  /* Default Background */
  const defaultBg = process.env.PUBLIC_URL + "/assets/no-image-landscape.png";

  return (
    <>
      <Overlay
        onClick={onOverlayClicked}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Wrapper
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Backdrop bg={getBackdropPath(details?.backdrop_path)} />
          <h1>
            {" "}
            제목 : {section === "movie" ? details?.title : details?.name}
          </h1>
          <p> 줄거리 : {details?.overview}</p>
          <ul>
            {cast?.map((actor, index) => (
              <li key={index}>
                {actor.name} - {actor.character}
              </li>
            ))}
          </ul>
        </Wrapper>
      </Overlay>
    </>
  );
}

export default Modal;
