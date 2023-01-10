import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IContent } from "../api/interface";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Content from "./Content";

interface ISearchGridProps {
  keyword: string;
  section: string;
  contents?: IContent[];
}

function SearchGrid(
  { keyword, section, contents }: ISearchGridProps,
  ref: any
) {
  const navigate = useNavigate();
  const openModal = (id: number) => {
    navigate(`?q=${keyword}&id=${id}`);
  };

  return (
    <GridWrapper>
      {contents?.map((content, index) => (
        <ContentWrapper
          key={content.id}
          ref={contents?.length === index + 1 ? ref : null}
        >
          <Content
            section={section}
            content={content}
            icon={faChevronRight}
            onClick={openModal}
          />
        </ContentWrapper>
      ))}
    </GridWrapper>
  );
}

export default forwardRef(SearchGrid);

const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 60px 30px;
  position: relative;
  @media (max-width: 1023px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 50px 25px;
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 20px;
  }
  @media (max-width: 479px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px 15px;
  }
`;

const ContentWrapper = styled.div``;
