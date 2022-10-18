import styled from "styled-components";

/* Fetcher function */
import { getBackdropPath } from "../Api/utils";

/* Interface */
import { IModalProps } from "../Api/interface";

/* Routing */
import { useNavigate } from "react-router-dom";

/* Motion */
import { motion, useScroll, AnimatePresence } from "framer-motion";

/* Modal-scroll */
import { useSetRecoilState } from "recoil";
import { modalState } from "../atom";

/* Styling */
const Loader = styled.div``;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0; // for animation
  cursor: pointer;
`;

const Wrapper = styled(motion.div)<{ scroll: number }>`
  overflow-y: auto;
  position: absolute;
  top: ${(props) => props.scroll + 30}px;
  left: 0;
  right: 0;
  z-index: 9999;
  width: min(90%, 900px);
  height: fit-content;
  margin-inline: auto;
  background-color: black;
  opacity: 0; // for animation
  /* ::-webkit-scrollbar {
    display: none;
  } */
`;

const Backdrop = styled.div<{ bg: string }>`
  width: 100%;
  padding-top: 56.25%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
`;

function Modal({ section, category, details, cast }: IModalProps) {
  /* State-management for Modal scroll */
  const setIsModalActive = useSetRecoilState(modalState);

  /* Routing */
  const navigate = useNavigate();
  const onOverlayClicked = () => {
    setIsModalActive(false);
    if (section === "movie") {
      navigate("/");
    } else if (section === "tv") {
      navigate("/tv");
    }
  };

  /* Motion */
  const { scrollY } = useScroll();

  /* Default Background */
  const defaultBg = process.env.PUBLIC_URL + "/assets/no-image-landscape.png";

  return (
    <>
      <AnimatePresence>
        <Container>
          <Overlay key="overlay" onClick={onOverlayClicked} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
          <Wrapper scroll={scrollY.get()} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Backdrop bg={getBackdropPath(details?.backdrop_path) || defaultBg} />
            <h1> 제목 : {section === "movie" ? details?.title : details?.name}</h1>
            <p> 줄거리 : {details?.overview}</p>
            <ul>
              {cast?.map((actor, index) => (
                <li key={index}>
                  {actor.name} - {actor.character}
                </li>
              ))}
            </ul>
          </Wrapper>
        </Container>
      </AnimatePresence>
    </>
  );
}

export default Modal;
