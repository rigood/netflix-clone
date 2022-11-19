import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { IMainVideoProps } from "../Api/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  position: relative; // VolumeBtn 배치
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
`;

const VolumeBtn = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: 60px;
  right: 30px;
  width: 24px;
  height: 24px;
  padding: 5px;
  border-radius: 50%;
  border: 3px solid ${(props) => props.theme.white.darker};
  color: ${(props) => props.theme.white.darker};
  cursor: pointer;
  &:hover {
    border-color: ${(props) => props.theme.white.lighter};
    color: ${(props) => props.theme.white.lighter};
  }
`;

function MainVideo({ videoKey }: IMainVideoProps) {
  const [isMute, setIsMute] = useState(true);
  const toggleMute = () => {
    setIsMute((prev) => !prev);
  };

  const BASE_URL = "https://www.youtube.com/watch?v=";

  return (
    <Wrapper>
      <ReactPlayer
        url={BASE_URL + videoKey}
        width="100%"
        height="100%"
        playing={true}
        muted={isMute}
        loop={true}
      />
      <Overlay />
      <VolumeBtn
        icon={isMute ? faVolumeXmark : faVolumeUp}
        onClick={toggleMute}
      />
    </Wrapper>
  );
}

export default MainVideo;
