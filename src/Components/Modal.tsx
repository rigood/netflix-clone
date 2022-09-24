import styled from "styled-components";

/* Data-fetching */
import { useQuery } from "@tanstack/react-query";

/* Fetcher function */
import { getCast, getDetails } from "../Api/api";

/* Interface */
import { ICast, IDetails, IModalProps } from "../Api/interface";

/* Routing */
import { useNavigate } from "react-router-dom";

/* Motion */
import { motion, useScroll } from "framer-motion";

/* Styling */
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0; // for animation
`;

const Container = styled(motion.div)<{ scrollY: number }>`
  position: absolute;
  top: ${(props) => props.scrollY + 100}px;
  left: 0;
  right: 0;
  width: min(90%, 900px);
  margin-inline: auto;
  background-color: teal;
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
      <Overlay onClick={onOverlayClicked} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <Container scrollY={scrollY.get()}>
        <h1> 제목 : {section === "movie" ? details?.title : details?.name}</h1>
        <p> 줄거리 : </p>
        <ul>
          {cast?.map((actor, index) => (
            <li key={index}>
              {actor.name} - {actor.character}
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export default Modal;
