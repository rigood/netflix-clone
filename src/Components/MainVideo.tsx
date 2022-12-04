import { useState } from "react";
import ReactPlayer from "react-player/lazy";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

interface IMainVideoProps {
  videoKey: string;
}

function MainVideo({ videoKey }: IMainVideoProps) {
  const BASE_URL = "https://www.youtube.com/watch?v=";

  const [isMute, setIsMute] = useState(true);
  const toggleMute = () => {
    setIsMute((prev) => !prev);
  };

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
  bottom: 30px;
  right: 30px;
  width: 24px;
  height: 24px;
  padding: 5px;
  border-radius: 50%;
  border: 3px solid white;
  color: white;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      border-color: white;
      color: white;
    }
  }
`;
