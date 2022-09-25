import styled from "styled-components";

/* Fetcher function */
import { getBackdropPath } from "../Api/utils";

/* Interface */
import { IModalProps } from "../Api/interface";

/* Routing */
import { useNavigate } from "react-router-dom";

/* Motion */
import { motion, useScroll, AnimatePresence } from "framer-motion";

/* Styling */

const Loader = styled.div``;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0; // for animation
  cursor: pointer;
`;

const Container = styled(motion.div)<{ scroll: number }>`
  position: absolute;
  top: ${(props) => props.scroll + 100}px;
  left: 0;
  right: 0;
  width: min(90%, 900px);
  margin-inline: auto;
  background-color: teal;
`;

const Backdrop = styled.div<{ bg: string }>`
  width: 100%;
  padding-top: 56.25%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
`;

function Modal({ section, category, details, cast }: IModalProps) {
  /* Routing */
  const navigate = useNavigate();
  const onOverlayClicked = () => {
    if (section === "movie") {
      navigate("/");
    } else if (section === "tv") {
      navigate("/tv");
    }
  };

  /* Motion */
  const { scrollY } = useScroll();

  return (
    <>
      <AnimatePresence>
        <Overlay key="overlay" onClick={onOverlayClicked} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        <Container scroll={scrollY.get()}>
          <Backdrop bg={getBackdropPath(details?.backdrop_path)} />
          <h1> 제목 : {section === "movie" ? details?.title : details?.name}</h1>
          <p> 줄거리 : {details?.overview}</p>
          <ul>
            {cast?.map((actor, index) => (
              <li key={index}>
                {actor.name} - {actor.character}
              </li>
            ))}
          </ul>
        </Container>
      </AnimatePresence>
    </>
  );
}

export default Modal;
