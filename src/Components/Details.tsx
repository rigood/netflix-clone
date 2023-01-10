import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDate, getRating, getRuntimeOrEpisodes } from "../api/utils";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { DefaultButton } from "../styles/common";
import { IContent } from "../api/interface";
import useMyList from "../hook/useMyList";

interface IInfoProps {
  section: string;
  details: IContent;
  isError: boolean;
}

function Details({ section, details, isError }: IInfoProps) {
  // Add, Remove from MyList
  const [checkIsNewContent, addToList, removeFromList] = useMyList(section);

  // language translation
  const { t } = useTranslation();

  return (
    <>
      <Genres>
        {details.genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      </Genres>
      <Title>{details.title || details.name || t("modal.altText.title")}</Title>
      <InfoAndButtonRow>
        <InfoCol>
          <TimeAndCount>
            {getRuntimeOrEpisodes(
              section,
              details.runtime,
              details.number_of_seasons,
              details.number_of_episodes
            )}
          </TimeAndCount>
          <DateAndRating>
            <span>
              {getDate(section, details.release_date, details.first_air_date)}
            </span>
            <span>{getRating(details.vote_average)}</span>
          </DateAndRating>
        </InfoCol>
        <ButtonCol>
          {!isError && checkIsNewContent(details.id) ? (
            <ListButton icon={faPlus} onClick={() => addToList(details.id)} />
          ) : (
            <ListButton
              icon={faCheck}
              onClick={() => removeFromList(details.id)}
            />
          )}
        </ButtonCol>
      </InfoAndButtonRow>
      <Overview>{details.overview || t("modal.altText.overview")}</Overview>
    </>
  );
}

export default Details;

const Genres = styled.div`
  margin-bottom: 10px;
  span {
    margin-right: 10px;
    padding: 2px 4px;
    border-radius: 6px;
    background-color: ${(props) => props.theme.red};
    font-size: 14px;
  }
`;

const Title = styled.h1`
  font-size: 1.8vw;
  font-weight: 700;
  margin-bottom: 10px;
  @media (max-width: 1023px) {
    font-size: 28px;
  }
`;

const InfoAndButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 700;
`;

const TimeAndCount = styled.div`
  margin-bottom: 5px;
`;

const DateAndRating = styled.div`
  span:first-child {
    margin-right: 10px;
    color: ${(props) => props.theme.green};
  }
`;

const ButtonCol = styled.div``;

const ListButton = styled(FontAwesomeIcon)`
  ${DefaultButton}
`;

const Overview = styled.p`
  color: ${({ theme }) => theme.white};
  font-size: 14px;
  font-weight: 300;
`;
