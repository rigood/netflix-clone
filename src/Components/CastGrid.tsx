import styled from "styled-components";
import { ICastGridProps } from "../Api/interface";

const Title = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  margin-top: 3rem;
`;

const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 40px;
`;

function CastGrid({ title, cast }: ICastGridProps) {
  return (
    <>
      <Title>{title}</Title>
      <GridWrapper>
        {cast.map((actor, index) => (
          <div key={index}></div>
        ))}
      </GridWrapper>
    </>
  );
}

export default CastGrid;
