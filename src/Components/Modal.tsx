import styled from "styled-components";

/* Data-fetching */
import { useQuery } from "@tanstack/react-query";

/* Fetcher function */
import { getCast, getDetails } from "../Api/api";
import { getBackdropPath } from "../Api/utils";

/* Interface */
import { ICast, IDetails, IModalProps } from "../Api/interface";

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

function Modal({ section, category, id }: IModalProps) {
  /* Modal Data-fectching */
  const { data: details, isLoading: loadingDetails } = useQuery<IDetails>(["details", { section, id }], () => getDetails(section, id));
  const { data: cast, isLoading: loadingCast } = useQuery<ICast[]>(["cast", { section, id }], () => getCast(section, id));

  const isModalLoading = loadingDetails || loadingCast;

  /* Routing */
  const navigate = useNavigate();
  const onOverlayClicked = () => {
    if (section === "movie") {
      navigate("/");
    } else {
      navigate("/tv");
    }
  };

  /* Motion */
  const { scrollY } = useScroll();

  return (
    <>
      {isModalLoading ? (
        <Loader>로딩중</Loader>
      ) : (
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
      )}
    </>
  );
}

export default Modal;
