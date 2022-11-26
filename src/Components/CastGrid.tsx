import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { ICastGridProps } from "../api/interface";
import { getImgPath, noProfile } from "../api/utils";

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
  position: relative;
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

const MoreButton = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 20px;
  height: 20px;
  padding: 5px;
  border-radius: 50%;
  border: 3px solid lightgray;
  color: lightgray;
  cursor: pointer;
`;

function CastGrid({ title, cast }: ICastGridProps) {
  const offset = 5;
  const [index, setIndex] = useState(offset);
  return (
    <>
      <Title>{title}</Title>
      <GridWrapper>
        {cast?.slice(0, index).map((actor, index) => (
          <Actor key={index}>
            <Img
              bg={
                actor.profile_path
                  ? getImgPath(actor.profile_path, "w200")
                  : noProfile
              }
            />
            <div className="name">{actor.name}</div>
            <div className="character">{actor.character}</div>
          </Actor>
        ))}
        {index < cast?.length ? (
          <MoreButton
            icon={faChevronDown}
            onClick={() => setIndex((prev) => prev + offset)}
          />
        ) : null}
      </GridWrapper>

      <p>{cast?.length === 0 ? "준비중입니다." : null}</p>
    </>
  );
}

export default CastGrid;
