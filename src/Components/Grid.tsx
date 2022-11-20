import styled from "styled-components";
import { IGridProps } from "../Api/interface";
import { getPosterPath, noImg } from "../Api/utils";

const Wrapper = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Poster = styled.div<{ bg: string }>`
  width: 100%;
  aspect-ratio: 2 / 3;
  background-image: url(${(props) => props.bg});
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 5px;
  cursor: pointer;
`;

function Grid({ contents }: IGridProps) {
  console.log("✅", contents);
  return (
    <Wrapper>
      {contents?.slice(0, 8).map((content) => (
        <Poster
          key={content.id}
          bg={
            content.poster_path
              ? getPosterPath(content.poster_path, "w500")
              : noImg
          }
        ></Poster>
      ))}
    </Wrapper>
  );
}

export default Grid;
