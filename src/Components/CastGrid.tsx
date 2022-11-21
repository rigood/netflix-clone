import styled from "styled-components";
import { ICastGridProps } from "../Api/interface";
import { getImgPath, noImg } from "../Api/utils";

const Title = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  margin-top: 3rem;
`;

const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 20px;
  row-gap: 40px;
`;

const Actor = styled.div`
  text-align: center;
  .name {
    font-size: 14px;
  }
  .character {
    font-size: 12px;
    font-weight: 300;
    font-style: italic;
  }
`;

const Img = styled.div<{ bg: string }>`
  width: 100%;
  aspect-ratio: 2 / 3;
  margin-bottom: 15px;
  border-radius: 5px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
`;

function CastGrid({ title, cast }: ICastGridProps) {
  return (
    <>
      <Title>{title}</Title>
      <GridWrapper>
        {cast?.slice(0, 5).map((actor, index) => (
          <Actor key={index}>
            <Img
              bg={
                actor.profile_path
                  ? getImgPath(actor.profile_path, "w200")
                  : noImg
              }
            />
            <div className="name">{actor.name}</div>
            <div className="character">{actor.character}</div>
          </Actor>
        ))}
        {cast?.length === 0 ? "준비중입니다." : null}
      </GridWrapper>
    </>
  );
}

export default CastGrid;
