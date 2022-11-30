import styled from "styled-components";

export const BackgroundWrapper = styled.div<{
  backdropBg: string;
  posterBg: string;
}>`
  width: 100%;
  height: 56.25vw;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.backdropBg});
  // 모바일에서 세로 배경화면 띄우기
  @media (max-width: 480px) {
    height: 150vw;
    background-image: linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 1)
      ),
      url(${(props) => props.posterBg});
  }
`;

export const SliderContainer = styled.div``;
