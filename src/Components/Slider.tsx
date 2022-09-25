import styled from "styled-components";

/* Routing */
import { useNavigate } from "react-router-dom";

/* Interface */
import { ISliderProps } from "../Api/interface";

/* Motion */
import { motion, AnimatePresence } from "framer-motion";

/* Data-fetching */
import { getBackdropPath } from "../Api/utils";

/* State-management */
import { useSetRecoilState } from "recoil";
import { modalState } from "../atom";

/* Styling */

const Container = styled.div`
  margin: 3vw 0;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  padding-inline: 4%;
`;

const Title = styled.h3`
  margin-bottom: 1vw;
  padding-inline: 4%;
  font-size: 1.4vw;
`;

const Box = styled(motion.div)<{ bg: string }>`
  width: 100%;
  padding-top: 56.25%;
  border-radius: 0.2vw;
  background-image: url(${(props) => props.bg});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

function Slider({ section, category, title, list }: ISliderProps) {
  /* State-management for Modal scroll */
  const setIsModalActive = useSetRecoilState(modalState);

  /* Routing */
  const navigate = useNavigate();
  const onBoxClick = (id: number) => {
    navigate(`/${section}/${category}/${id}`);
    setIsModalActive(true);
  };

  /* Remove content from Slider for Banner */
  let sliceIndex;
  if (category === "nowplaying") {
    sliceIndex = 1;
  } else {
    sliceIndex = 0;
  }

  return (
    <Container>
      <Title>{title}</Title>
      <AnimatePresence>
        <Row>
          {list
            ?.slice(sliceIndex)
            .slice(0, 6)
            .map((content) => (
              <Box key={content.id} bg={getBackdropPath(content.backdrop_path, "w500")} onClick={() => onBoxClick(content.id)} />
            ))}
        </Row>
      </AnimatePresence>
    </Container>
  );
}

export default Slider;
