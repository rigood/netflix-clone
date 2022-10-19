import styled, { css } from "styled-components";

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

/* Slice list */
import { useState } from "react";

/* Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

/* Styling */

const Container = styled.div`
  margin: 3vw 0;
`;

const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: 60px auto 60px;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  border: none;
  background: none;
  ${(props) =>
    !props.disabled &&
    css`
      color: white;
      opacity: 0.5;
      font-size: 1.5vw;
      &:hover {
        opacity: 1;
        font-size: 1.8vw;
        border: none;
        outline: none;
        cursor: pointer;
      }
    `}
`;

const PrevBtn = styled(Btn)``;
const NextBtn = styled(Btn)``;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
`;

const Title = styled.h3`
  margin-bottom: 1vw;
  padding-inline: 60px;
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

  /* Slice list */
  const offset = 6;
  const [index, setIndex] = useState(0);
  const listLength = list?.length!;
  const maxIndex = Math.floor(listLength / offset) - 1;

  /* Prev, Next */
  const decreaseIndex = () => {
    setIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };
  const increaseIndex = () => {
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <Container>
      <Title>{title}</Title>
      <RowWrapper>
        <PrevBtn onClick={decreaseIndex} disabled={index === 0}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </PrevBtn>
        <AnimatePresence>
          <Row>
            {list
              ?.slice(sliceIndex)
              .slice(offset * index, offset * index + offset)
              .map((content) => (
                <Box key={content.id} bg={getBackdropPath(content.backdrop_path, "w500")} onClick={() => onBoxClick(content.id)} />
              ))}
          </Row>
        </AnimatePresence>
        <NextBtn onClick={increaseIndex}>
          <FontAwesomeIcon icon={faAngleRight} />
        </NextBtn>
      </RowWrapper>
    </Container>
  );
}

export default Slider;
