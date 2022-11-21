import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { IVideosProps } from "../Api/interface";
import { getThumbnailPath, getYoutubeUrl } from "../Api/utils";

const Title = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  margin-top: 3rem;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Video = styled.div`
  display: grid;
  grid-template-columns: 160px auto;
  cursor: pointer;
  &:not(:last-child) {
    padding-bottom: 30px;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    .name {
      font-style: 14px;
    }
    .date {
      font-size: 13px;
      font-weight: 400;
      font-style: italic;
    }
  }
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
  &:hover {
    border-color: white;
    color: white;
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

const Thumbnail = styled.div<{ bg: string }>`
  width: 100%;
  aspect-ratio: 4 / 3;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  transition: all 0.3s ease;
  &:hover ${ThumbnailOverlay} {
    display: block;
  }
  &:hover ${ThumbnailButton} {
    display: block;
  }
`;

function Videos({ title, videos }: IVideosProps) {
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
            <div className="info">
              <span className="name">{video.name}</span>
              <span className="date">{video.published_at.slice(0, 10)}</span>
            </div>
          </Video>
        ))}
        {videos?.length === 0 ? "관련 영상이 없습니다." : null}
      </Wrapper>
    </>
  );
}

export default Videos;

//  {index + 1} {video.name} {video.published_at.slice(0, 10)}
