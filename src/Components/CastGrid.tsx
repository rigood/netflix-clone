import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICast } from "../api/interface";
import { getImgPath, noProfile } from "../api/utils";
import { DefaultMoreButton } from "../styles/common";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface ICastGridProps {
  title: string;
  cast: ICast[];
  altText: string;
}

function CastGrid({ title, cast, altText }: ICastGridProps) {
  const offset = 6;
  const [index, setIndex] = useState(offset);
  return (
    <>
      <Title>{title}</Title>
      <GridWrapper>
        {cast?.slice(0, index).map((actor, index) => (
          <Actor key={index}>
            <ActorImg
              bg={
                actor.profile_path
                  ? getImgPath(actor.profile_path, "w200")
                  : noProfile
              }
            />
            <ActorInfo>
              <div className="name">{actor.name}</div>
              <div className="character">{actor.character}</div>
            </ActorInfo>
          </Actor>
        ))}
        {index < cast?.length ? (
          <MoreButton
            icon={faChevronDown}
            onClick={() => setIndex((prev) => prev + offset)}
          />
        ) : null}
      </GridWrapper>
      <Footer>
        <p>{cast?.length === 0 ? altText : null}</p>
      </Footer>
    </>
  );
}

export default CastGrid;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 50px;
  @media (max-width: 479px) {
    font-size: 22px;
  }
`;

const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  position: relative;

  @media (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Actor = styled.div`
  width: 100%;
`;

const ActorImg = styled.div<{ bg: string }>`
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: 15px;
  border-radius: 2px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`;

const ActorInfo = styled.div`
  text-align: center;
  .name {
    font-size: 14px;
    margin-bottom: 5px;
  }
  .character {
    font-size: 12px;
    font-weight: 300;
    font-style: italic;
    opacity: 0.8;
  }
`;

const MoreButton = styled(FontAwesomeIcon)`
  ${DefaultMoreButton};
`;

const Footer = styled.div`
  margin-bottom: 80px;
  font-size: 16px;
`;
