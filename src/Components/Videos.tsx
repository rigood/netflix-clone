import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IVideo } from "../api/interface";
import { getThumbnailPath, getYoutubeUrl } from "../api/utils";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

interface IVideosProps {
  title: string;
  videos: IVideo[];
  altText: string;
}

function Videos({ title, videos, altText }: IVideosProps) {
  const onVideoClick = (key: string) =>
    window.open(getYoutubeUrl(key), "_blank");
  return (
    <>
      <Title>{title}</Title>
      <Wrapper>
        {videos?.slice(0, 3).map((video) => (
          <Video key={video.id} onClick={() => onVideoClick(video.key)}>
            <Thumbnail bg={getThumbnailPath(video.key)}>
              <ThumbnailOverlay />
              <ThumbnailButton icon={faPlay} />
            </Thumbnail>
            <Info>
              <span className="name">{video.name}</span>
              <span className="date">{video.published_at.slice(0, 10)}</span>
            </Info>
          </Video>
        ))}
        {videos?.length === 0 ? altText : null}
      </Wrapper>
    </>
  );
}

export default Videos;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 50px;
  @media (max-width: 479px) {
    font-size: 22px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ThumbnailButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 24px;
  height: 24px;
  padding: 5px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.8);
  color: rgba(255, 255, 255, 0.7);
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  @media (hover: hover) {
    &:hover {
      border-color: white;
      color: white;
    }
  }
  display: none;
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  .name {
    font-style: 14px;
  }
  .date {
    font-size: 12px;
    font-weight: 300;
    font-style: italic;
    opacity: 0.8;
  }
`;

const Thumbnail = styled.div<{ bg: string }>`
  width: 90%;
  aspect-ratio: 4 / 3;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  transition: all 0.3s ease;
`;

const Video = styled.div`
  display: grid;
  grid-template-columns: 160px auto;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 30px;
  }
  @media (hover: hover) {
    &:hover ${ThumbnailOverlay}, &:hover ${ThumbnailButton} {
      display: block;
    }
    &:hover ${Info} {
      background-color: #202020;
    }
  }

  @media (max-width: 479px) {
    grid-template-columns: 100px auto;
  }
`;
