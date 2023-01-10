import styled, { css } from "styled-components";

export const DefaultButton = css`
  width: 28px;
  height: 28px;
  font-size: 28px;
  padding: 5px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.8);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;

  @media (hover: hover) {
    &:hover {
      border-color: white;
      color: white;
    }
  }

  @media (max-width: 1023px) {
    width: 20px;
    height: 20px;
    font-size: 20px;
    top: 15px;
    right: 15px;
  }

  @media (max-width: 479px) {
    top: 10px;
    right: 10px;
    border: none;
  }
`;

export const DefaultMoreButton = css`
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
  @media (hover: hover) {
    &:hover {
      border-color: white;
      color: white;
    }
  }
`;
