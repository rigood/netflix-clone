import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IContent } from "../api/interface";
import Content from "./Content";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface IMyListGridProps {
  title: string;
  contents: IContent[];
  section: string;
  altText: string;
}

function MyListGrid({ title, contents, section, altText }: IMyListGridProps) {
  const navigate = useNavigate();
  const openModal = (id: number) => {
    navigate(`${section}?id=${id}`);
  };

  return (
    <>
      <Title>{title}</Title>
      <GridWrapper>
        {contents?.map((content) => (
          <ContentWrapper key={content.id}>
            <Content
              section={section}
              content={content}
              icon={faChevronRight}
              onClick={openModal}
            />
          </ContentWrapper>
        ))}
      </GridWrapper>
      {contents?.length === 0 ? altText : null}
    </>
  );
}

export default MyListGrid;

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
  grid-template-columns: repeat(8, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  position: relative;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 479px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ContentWrapper = styled.div``;
