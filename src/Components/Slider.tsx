import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IContent } from "../api/interface";
import useDynamicSliderOffset from "../hook/useDynamicSliderOffset";
import useWindowWidth from "../hook/useWindowWidth";
import useElementWidth from "../hook/useElementWidth";
import { getDate, getRating, getImgPath, noBackdrop } from "../api/utils";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface ISliderProps {
  section: string;
  title: string;
  list?: IContent[];
  hasBannerContent: boolean;
  zindex: number;
}

interface IRowVariantsProps {
  movingBack: boolean;
  windowWidth: number;
}

function Slider({
  section,
  title,
  list,
  hasBannerContent,
  zindex,
}: ISliderProps) {
  // Remove Banner content from Slider
  const sliceIndex = hasBannerContent ? 1 : 0;

  // Slider List
  const offset = useDynamicSliderOffset();
  const [index, setIndex] = useState(0);
  const listLength = list?.length!;
  const maxIndex = Math.floor(listLength / offset) - 1;

  // Slider css
  const windowWidth = useWindowWidth();
  const [thumbnailRef, thumbnailWidth] = useElementWidth();
  const thumbnailHeight = thumbnailWidth * (9 / 16);

  // Slider Moving
  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(true);
  const [moving, setMoving] = useState(false);
  const [movingBack, setMovingBack] = useState(false);

  console.log("render");
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
      console.log("increase누름");
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setMoving(true);
      setIsPrevBtnDisabled(false);
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
        <PrevBtn
          onClick={decreaseIndex}
          disabled={isPrevBtnDisabled}
          zindex={zindex}
        >
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
            zindex={zindex}
          >
            {list
              ?.slice(sliceIndex)
              .slice(offset * index, offset * index + offset)
              .map((content, idx) => (
                <BoxContainer key={content.id}>
                  <BoxThumbnail
                    bg={
                      content.backdrop_path
                        ? getImgPath(content.backdrop_path, "w500")
                        : noBackdrop
                    }
                    idx={idx}
                    offset={offset}
                    onClick={() => onBoxClick(content.id)}
                    ref={thumbnailRef!}
                    variants={boxVariants}
                    whileHover="hover"
                  >
                    <BoxInfo variants={infoVariants}>
                      <BoxInfoTitle>
                        {content.title || content.name}
                      </BoxInfoTitle>
                      <BoxInfoDateAndRatingContainer>
                        <div>
                          {getDate(
                            section,
                            content.release_date,
                            content.first_air_date
                          ) + `  `}
                        </div>
                        <div>{getRating(content.vote_average)}</div>
                      </BoxInfoDateAndRatingContainer>
                    </BoxInfo>
                  </BoxThumbnail>
                </BoxContainer>
              ))}
          </Row>
        </AnimatePresence>
        <NextBtn onClick={increaseIndex} zindex={zindex}>
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
  // 반응형 마진
  margin-bottom: 80px;
  /* @media (max-width: 768px) {
    margin-block: 80px;
  }
  @media (max-width: 480px) {
    margin-block: 40px;
  }
  @media (max-width: 320px) {
    margin-block: 20px;
  } */
`;

const Title = styled.h3`
  font-weight: 500;
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

const PrevBtn = styled(Btn)<{ zindex: number }>`
  z-index: ${({ zindex }) => zindex + 1};
  left: 0;
`;

const NextBtn = styled(Btn)<{ zindex: number }>`
  z-index: ${({ zindex }) => zindex + 1};
  right: 0;
`;

const Row = styled(motion.div)<{ offset: number; zindex: number }>`
  position: absolute;
  z-index: ${({ zindex }) => zindex};
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

const BoxContainer = styled.div``;

const BoxInfo = styled(motion.div)`
  display: none;
  width: 100%;
  padding: 5%;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: ${({ theme }) => theme.gray};
  color: white;
`;

const BoxInfoTitle = styled.div`
  ${({ theme }) => theme.MaxLines(1)};
`;

const BoxInfoDateAndRatingContainer = styled.div`
  font-weight: 500;
  // 반응형
  font-size: 12px;
  @media (max-width: 1024px) {
    font-size: 11px;
  }
  @media (max-width: 1024px) {
    font-size: 10px;
  }
  @media (max-width: 480px) {
    font-size: 9px;
  }
  div:first-child {
    color: ${({ theme }) => theme.green};
  }
`;

const infoVariants = {
  hover: {
    display: "block",
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const BoxThumbnail = styled(motion.div)<{
  bg: string;
  idx: number;
  offset: number;
}>`
  width: 100%;
  padding-top: 56.25%;
  border-radius: 2px;
  background-image: url(${({ bg }) => bg});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  transform-origin: center
    ${({ idx, offset }) =>
      idx === 0 ? "left" : idx === offset - 1 ? "right" : "center"};
`;

const boxVariants = {
  hover: {
    scale: 1.5,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};
