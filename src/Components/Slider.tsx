/* Routing */
import { useNavigate } from "react-router-dom";

/* Interface */
import { ISliderProps } from "../Api/interface";

function Slider({ section, category, title, list }: ISliderProps) {
  const navigate = useNavigate();
  const onBoxClick = (id: number) => {
    navigate(`/${section}/${category}/${id}`);
  };
  return (
    <>
      <h1>{title}</h1>
      {list?.map((content, index) => (
        <li style={{ cursor: "pointer" }} key={content.id} onClick={() => onBoxClick(content.id)}>
          {index + 1}. {section === "movie" ? content.title : content.name}
        </li>
      ))}
    </>
  );
}

export default Slider;
