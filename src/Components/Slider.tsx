import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IContent } from "../api/interface";
import useDynamicSliderOffset from "../hook/useDynamicSliderOffset";
import useWindowWidth from "../hook/useWindowWidth";
import useElementHeight from "../hook/useElementHeight";
import { getImgPath, noBackdrop } from "../api/utils";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface ISliderProps {
  section: string;
  title: string;
  list?: IContent[];
  shouldCutFirstContent: boolean;
}

interface IRowVariantsProps {
  movingBack: boolean;
  windowWidth: number;
}

function Slider({ section, title, list, shouldCutFirstContent }: ISliderProps) {
  // Remove Banner content from Slider
  const sliceIndex = shouldCutFirstContent ? 1 : 0;

  // Slider List
  const offset = useDynamicSliderOffset();
  const [index, setIndex] = useState(0);
  const listLength = list?.length!;
  const maxIndex = Math.floor(listLength / offset) - 1;

  // Slider css
  const windowWidth = useWindowWidth();
  const [thumbnailRef, thumbnailHeight] = useElementHeight();

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
      <RowWrapper height={thumbnailHeight}>
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
            custom={{ movingBack, windowWidth }}
            offset={offset}
          >
            {list
              ?.slice(sliceIndex)
              .slice(offset * index, offset * index + offset)
              .map((content) => (
                <BoxWrapper key={content.id}>
                  <Box
                    bg={
                      content.backdrop_path
                        ? getImgPath(content.backdrop_path, "w500")
                        : noBackdrop
                    }
                    onClick={() => onBoxClick(content.id)}
                    ref={thumbnailRef!}
                    variants={boxVariants}
                    whileHover="hover"
                  />
                  <BoxInfo variants={infoVariants}>
                    {section === "movie" ? content.title : content.name}
                  </BoxInfo>
                </BoxWrapper>
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
  // Modal, Header보다 아래
  z-index: 5;
  // 반응형 마진
  margin-block: 60px;
  @media (max-width: 768px) {
    margin-block: 40px;
  }
  @media (max-width: 480px) {
    margin-block: 20px;
  }
  @media (max-width: 320px) {
    margin-block: 10px;
  }
`;

const Title = styled.h3`
  // 반응형 패딩
  font-size: 24px;
  margin-bottom: 20px;
  padding-left: 60px;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 15px;
    padding-left: 40px;
  }
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 10px;
    padding-left: 20px;
  }
  @media (max-width: 320px) {
    font-size: 16px;
    margin-bottom: 10px;
    padding-left: 10px;
  }
`;

const RowWrapper = styled.div<{ height: number }>`
  position: relative;
  width: 100%;
  height: ${(props) => `${props.height}px`};
`;

const Btn = styled.button`
  // 반응형 너비
  width: 60px;
  @media (max-width: 768px) {
    width: 40px;
  }
  @media (max-width: 480px) {
    width: 20px;
  }
  @media (max-width: 320px) {
    width: 10px;
  }
  // 가운데 정렬
  display: flex;
  justify-content: center;
  align-items: center;
  // 위치 고정
  position: absolute;
  top: 0;
  bottom: 0;
  // 스타일
  padding: 0;
  border: none;
  outline: none;
  background: none;
  // 비활성화
  opacity: 0;
  // 활성화
  ${(props) =>
    !props.disabled &&
    css`
      color: white;
      opacity: 0.5;
      font-size: max(1.5vw, 16px);
      &:hover {
        cursor: pointer;
        opacity: 1;
        font-size: max(1.8vw, 18px);
      }
    `}
`;

const PrevBtn = styled(Btn)`
  left: 0;
`;
const NextBtn = styled(Btn)`
  right: 0;
`;

const Row = styled(motion.div)<{ offset: number }>`
  position: absolute;
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.offset}, 1fr)`};
  gap: 10px;
  // 반응형 패딩
  padding-inline: 60px;
  @media (max-width: 768px) {
    padding-inline: 40px;
  }
  @media (max-width: 480px) {
    padding-inline: 20px;
  }
  @media (max-width: 320px) {
    padding-inline: 10px;
  }
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

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled(motion.div)<{ bg: string }>`
  width: 100%;
  padding-top: 56.25%;
  border-radius: 4px;
  background-image: url(${({ bg }) => bg});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const boxVariants = {
  hover: {
    scale: 1.2,
    y: -10,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const BoxInfo = styled(motion.div)`
  opacity: 0;
  width: 100%;
  padding: 5%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: ${({ theme }) => theme.gray};
  color: white;
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};
