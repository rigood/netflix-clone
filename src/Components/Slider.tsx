import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IContent } from "../api/interface";
import useDebouncedResize from "../hook/useDebouncedResize";
import { getImgPath, noBackdrop } from "../api/utils";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface ISliderProps {
  section: string;
  title: string;
  list?: IContent[];
  zindex: number;
}

interface ISliderVariantsProps {
  movingBack: boolean;
  windowWidth: number;
}

function getSliderOffset(windowWidth: number) {
  if (windowWidth <= 479) return 2;
  else if (windowWidth <= 1023) return 3;
  else return 6;
}

function Slider({ section, title, list, zindex }: ISliderProps) {
  // Slider layout
  const windowWidth = useDebouncedResize();

  // Slider List
  const offset = getSliderOffset(windowWidth);
  const [index, setIndex] = useState(0);
  const listLength = list?.length!;
  const maxIndex = Math.floor(listLength / offset) - 1;

  // Slider Moving
  const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(true);
  const [moving, setMoving] = useState(false);
  const [movingBack, setMovingBack] = useState(false);

  useEffect(() => {
    setIndex((prev) => (prev > maxIndex ? maxIndex : prev));
  }, [windowWidth]);

  const decreaseIndex = () => {
    if (list) {
      console.log("decrease 문 진입");
      if (moving) return;
      console.log("decrease 누름");
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      setMoving(true);
      setMovingBack(true);
    }
  };

  const increaseIndex = () => {
    if (list) {
      console.log("increase 문 진입");
      if (moving) return;
      console.log("increase 누름");
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      setMoving(true);
      setIsPrevBtnDisabled(false);
    }
  };

  const toggleMoving = () => {
    setMoving(false);
    setMovingBack(false);
  };

  const navigate = useNavigate();
  const onBoxClick = (id: number) => {
    navigate(`?id=${id}`);
  };

  // language translation
  const { t } = useTranslation();

  return (
    <Container>
      <TitleAndIndicator>
        <Title>{title}</Title>
        <Indicator>
          {index + 1}/{maxIndex + 1}
        </Indicator>
      </TitleAndIndicator>

      <SliderContainer>
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
          <SliderWrapper
            key={index}
            variants={sliderVariants}
            initial="enter"
            animate="show"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            custom={{ movingBack, windowWidth }}
            offset={offset}
            zindex={zindex}
          >
            {list
              ?.slice(offset * index, offset * index + offset)
              .map((content, idx) => (
                <Card key={content.id}>
                  <CardThumbnail
                    bg={
                      content.backdrop_path
                        ? getImgPath(content.backdrop_path, "w500")
                        : noBackdrop
                    }
                    idx={idx}
                    offset={offset}
                    onClick={() => onBoxClick(content.id)}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <CardInfo variants={infoVariants}>
                      <CardInfoTitle>
                        {content.title || content.name}
                      </CardInfoTitle>
                      <CardInfoDateAndRating>
                        <CardDate>
                          {section === "movie"
                            ? t("label.release") +
                                ": " +
                                content.release_date ?? t("label.none")
                            : t("label.firstAir") +
                                ": " +
                                content.first_air_date ?? t("label.none")}
                        </CardDate>
                        <CardRating>
                          {content.vote_average
                            ? t("label.rating") + ": ⭐" + content.vote_average
                            : t("label.rating") + ": ⭐" + t("label.none")}
                        </CardRating>
                      </CardInfoDateAndRating>
                    </CardInfo>
                  </CardThumbnail>
                </Card>
              ))}
          </SliderWrapper>
        </AnimatePresence>

        <NextBtn onClick={increaseIndex} zindex={zindex}>
          <FontAwesomeIcon icon={faAngleRight} />
        </NextBtn>
      </SliderContainer>
    </Container>
  );
}

export default Slider;

const Container = styled.div`
  width: 100%;
  position: relative;
  top: -12.5vw;
  margin-bottom: 70px;

  @media (max-width: 1023px) {
    margin-bottom: 60px;
  }

  @media (max-width: 479px) {
    margin-bottom: 50px;
  }
`;

const TitleAndIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 60px;
  margin-bottom: 10px;

  @media (max-width: 1023px) {
    padding: 0 40px;
  }

  @media (max-width: 479px) {
    padding: 0 20px;
  }
`;

const Title = styled.h2`
  font-size: 1.6vw;
  @media (max-width: 1023px) {
    font-size: 20px;
  }
`;

const Indicator = styled.div`
  font-size: 14px;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 8vw;

  @media (max-width: 1023px) {
    height: 16vw;
  }

  @media (max-width: 479px) {
    height: 24vw;
  }
`;

const Btn = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1.6vw;
  opacity: 0;

  @media (max-width: 1023px) {
    width: 40px;
    font-size: 20px;
  }

  @media (max-width: 479px) {
    width: 20px;
    font-size: 16px;
  }

  ${(props) =>
    !props.disabled &&
    css`
      color: white;
      opacity: 0.5;
      &:hover {
        cursor: pointer;
        opacity: 1;
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

const SliderWrapper = styled(motion.div)<{ offset: number; zindex: number }>`
  position: absolute;
  z-index: ${({ zindex }) => zindex};
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.offset}, 1fr)`};
  gap: 10px;
  width: 100%;
  padding: 0 60px;

  @media (max-width: 1023px) {
    padding: 0 40px;
  }

  @media (max-width: 479px) {
    padding: 0 20px;
  }
`;

const sliderVariants = {
  enter: ({ movingBack, windowWidth }: ISliderVariantsProps) => ({
    x: movingBack ? -windowWidth + 10 : windowWidth - 10,
  }),
  show: {
    x: 0,
  },
  exit: ({ movingBack, windowWidth }: ISliderVariantsProps) => ({
    x: movingBack ? windowWidth - 10 : -windowWidth + 10,
  }),
};

const Card = styled.div``;

const cardVariants = {
  hover: {
    scale: 1.3,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const CardInfo = styled(motion.div)`
  display: none;
  width: 100%;
  padding: 5%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: ${({ theme }) => theme.gray};
  color: white;
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

const CardThumbnail = styled(motion.div)<{
  bg: string;
  idx: number;
  offset: number;
}>`
  width: 100%;
  padding-top: 56.25%;
  border-radius: 4px;
  background-image: url(${({ bg }) => bg});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  transform-origin: center
    ${({ idx, offset }) =>
      idx === 0 ? "left" : idx === offset - 1 ? "right" : "center"};
`;

const CardInfoTitle = styled.div`
  font-size: 0.9vw;
  font-weight: 700;
  margin-bottom: 5px;
  @media (max-width: 1023px) {
    font-size: 16px;
  }
`;

const CardInfoDateAndRating = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.6vw;
  @media (max-width: 1023px) {
    font-size: 11px;
  }
`;

const CardDate = styled.span`
  color: ${({ theme }) => theme.green};
  margin-right: 8px;
`;

const CardRating = styled.span``;
