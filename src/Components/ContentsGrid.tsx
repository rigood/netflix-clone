import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IContent } from "../api/interface";
import useMyList from "../hook/useMyList";
import {
  faCheck,
  faChevronDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { DefaultMoreButton } from "../styles/common";
import Content from "./Content";

interface IContentsGridProps {
  title: string;
  contents: IContent[];
  section: string;
  altText: string;
}

function ContentsGrid({
  title,
  contents,
  section,
  altText,
}: IContentsGridProps) {
  const offset = 8;
  const [index, setIndex] = useState(offset);

  const [checkIsNewContent, addToList, removeFromList] = useMyList(section!);

  return (
    <>
      <Title>{title}</Title>
      <GridWrapper>
        {contents?.slice(0, index).map((content) => (
          <ContentWrapper key={content.id}>
            <Content
              section={section}
              content={content}
              icon={checkIsNewContent(content.id) ? faPlus : faCheck}
              onClick={
                checkIsNewContent(content.id) ? addToList : removeFromList
              }
            />
          </ContentWrapper>
        ))}
        {index < contents?.length ? (
          <MoreButton
            icon={faChevronDown}
            onClick={() => setIndex((prev) => prev + offset)}
          />
        ) : null}
      </GridWrapper>
      <Footer>{contents?.length === 0 ? altText : null}</Footer>
    </>
  );
}

export default ContentsGrid;

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
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  position: relative;

  @media (max-width: 479px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ContentWrapper = styled.div``;

const MoreButton = styled(FontAwesomeIcon)`
  ${DefaultMoreButton};
`;

const Footer = styled.div`
  margin-bottom: 80px;
  font-size: 16px;
`;
