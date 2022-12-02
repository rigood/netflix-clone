import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { myLangAtom } from "../atom";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

function LanguageSelect() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useRecoilState(myLangAtom);

  const changeLang = (e: React.FormEvent<HTMLSelectElement>) => {
    const selectedLang = e.currentTarget.value;
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  return (
    <Wrapper>
      <Label htmlFor="select">
        <FontAwesomeIcon icon={faGlobe} />
      </Label>
      <Select id="select" onInput={changeLang} value={lang}>
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </Select>
    </Wrapper>
  );
}

export default LanguageSelect;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  svg {
    width: 13px;
  }
`;

const Select = styled.select`
  cursor: pointer;
  margin-left: 2px;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: inherit;
  font-size: 13px;
  color: inherit;
  option {
    color: black;
  }
`;
