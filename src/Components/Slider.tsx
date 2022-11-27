import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IContent } from "../api/interface";
import useWindowDimensions from "../hook/useWindowDimensions";
import { getImgPath, noBackdrop } from "../api/utils";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface ISliderProps {
  section: string;
  title: string;
  list?: IContent[];
  isFirst: boolean;
}

interface IRowVariantsProps {
  movingBack: boolean;
  windowWidth: number;
}

function Slider({ section, title, list, isFirst }: ISliderProps) {
  // Remove Banner content from Slider
  let sliceIndex;
  if (isFirst) {
    sliceIndex = 1;
  } else {
    sliceIndex = 0;
  }

  // Slider List
  const offset = 6;
  const [index, setIndex] = useState(0);
  const listLength = list?.length!;
  const maxIndex = Math.floor(listLength / offset) - 1;

  // Slider Height
  const windowWidth = useWindowDimensions();
  const [rowWrapperHeight, setRowWrapperHeight] = useState(0);

  const rowRef = useRef<any>();
  useEffect(() => {
    setRowWrapperHeight(rowRef?.current?.clientHeight);
  }, [windowWidth]);

  // Slider Moving
  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(true);
  const [moving, setMoving] = useState(false);
  const [movingBack, setMovingBack] = useState(false);

  const decreaseIndex = () => {
    if (list) {
      if (moving) return;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      setMoving(true);
      setMovingBack(true);
    }
  };

  const increaseIndex = () => {
    if (list) {
      if (moving) return;
      setIsPrevBtnDisabled(false);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setMoving(true);
    }
  };

  const toggleMoving = () => {
    setMoving((prev) => !prev);
    setMovingBack(false);
  };

  const navigate = useNavigate();
  const onBoxClick = (id: number) => {
    navigate(`?id=${id}`);
  };

  return (
    <Container>
      <Title>{title}</Title>
      <RowWrapper height={rowWrapperHeight}>
        <PrevBtn onClick={decreaseIndex} disabled={isPrevBtnDisabled}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </PrevBtn>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleMoving}
          custom={{ movingBack, windowWidth }}
        >
          <Row
            key={index}
            variants={rowVariants}
            initial="enter"
            animate="show"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            ref={rowRef}
            custom={{ movingBack, windowWidth }}
          >
            {list
              ?.slice(sliceIndex)
              .slice(offset * index, offset * index + offset)
              .map((content) => (
                <React.Fragment key={content.id}>
                  <Box
                    bg={
                      content.backdrop_path
                        ? getImgPath(content.backdrop_path, "w500")
                        : noBackdrop
                    }
                    onClick={() => onBoxClick(content.id)}
                    variants={boxVariants}
                    whileHover="hover"
                    initial="initial"
                  >
                    <BoxInfo variants={infoVariants}>
                      <p>
                        {section === "movie" ? content.title : content.name}
                      </p>
                    </BoxInfo>
                  </Box>
                </React.Fragment>
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
  opacity: 0;
  z-index: 6;
  ${(props) =>
    !props.disabled &&
    css`
      color: white;
      font-size: 1.5vw;
      opacity: 0.5;
      &:hover {
        font-size: 1.8vw;
        opacity: 1;
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
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const BoxInfo = styled(motion.div)`
  display: none;
  width: 100%;
  padding: 5%;
  border-bottom-left-radius: 0.2vw;
  border-bottom-right-radius: 0.2vw;
  background-color: ${(props) => props.theme.black.lighter};
  color: white;
`;

const rowVariants = {
  enter: ({ movingBack, windowWidth }: IRowVariantsProps) => ({
    x: movingBack ? -windowWidth + 10 : windowWidth - 10,
  }),
  show: {
    x: 0,
  },
  exit: ({ movingBack, windowWidth }: IRowVariantsProps) => ({
    x: movingBack ? windowWidth - 10 : -windowWidth + 10,
  }),
};

const boxVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween", // default
    },
  },
};

const infoVariants = {
  hover: {
    display: "block",
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween", // default
    },
  },
};
