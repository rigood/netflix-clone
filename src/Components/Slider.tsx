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

/* Set slider-height */
import { useRef, useEffect } from "react";
import useWindowDimensions from "../useWindowDimensions";

/* Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

/* Styling */

const Container = styled.div`
  width: 100%;
  margin: 3vw 0;
`;

const Title = styled.h3`
  margin-bottom: 1vw;
  padding-inline: 60px;
  font-size: 1.4vw;
`;

const RowWrapper = styled.div<{ height: number }>`
  position: relative;
  width: 100%;
  height: ${(props) => `${props.height}px`};
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 60px;
  padding: 0;
  border: none;
  background: none;
  color: white;
  z-index: 6;
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

const PrevBtn = styled(Btn)`
  left: 0;
`;
const NextBtn = styled(Btn)`
  right: 0;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
  padding: 0 60px;
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

const rowVariants = {
  enter: {
    x: "100vw",
  },
  show: {
    x: 0,
  },
  exit: {
    x: "-100vw",
  },
};

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
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };
  const increaseIndex = () => {
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  /* Set slider-height */
  const windowWidth = useWindowDimensions();
  const [rowWrapperHeight, setRowWrapperHeight] = useState(0);
  const rowRef = useRef<any>();
  useEffect(() => {
    setRowWrapperHeight(rowRef?.current?.clientHeight);
  }, [windowWidth]);

  return (
    <Container>
      <Title>{title}</Title>
      <RowWrapper height={rowWrapperHeight}>
        <PrevBtn onClick={decreaseIndex}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </PrevBtn>
        <AnimatePresence initial={false}>
          <Row key={index} variants={rowVariants} initial="enter" animate="show" exit="exit" transition={{ type: "tween", duration: 5 }} ref={rowRef}>
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
