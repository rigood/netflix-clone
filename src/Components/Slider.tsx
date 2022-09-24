import styled from "styled-components";

/* Routing */
import { useNavigate } from "react-router-dom";

/* Interface */
import { ISliderProps } from "../Api/interface";

/* Motion */
import { motion, AnimatePresence } from "framer-motion";

/* Data-fetching */
import { getBackdropPath } from "../Api/utils";

/* Styling */
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  padding-inline: 4%;
`;
const Box = styled(motion.div)<{ bg: string }>`
  width: 100%;
  padding-top: 56.25%;
  background-image: url(${(props) => props.bg});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

function Slider({ section, category, title, list }: ISliderProps) {
  const navigate = useNavigate();
  const onBoxClick = (id: number) => {
    navigate(`/${section}/${category}/${id}`);
  };

  let sliceIndex;
  if (category === "nowplaying") {
    sliceIndex = 1;
  } else {
    sliceIndex = 0;
  }

  return (
    <>
      <h1>{title}</h1>
      <AnimatePresence>
        <Row>
          {list
            ?.slice(sliceIndex)
            .slice(0, 6)
            .map((content) => (
              <Box key={content.id} bg={getBackdropPath(content.backdrop_path, "w500")} onClick={() => onBoxClick(content.id)}>
                {section === "movie" ? content.title : content.name}
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </>
  );
}

export default Slider;
