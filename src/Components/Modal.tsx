/* Data-fetching */
import { useQuery } from "@tanstack/react-query";

/* Fetcher function */
import { getCast, getDetails } from "../Api/api";

/* Interface */
import { ICast, IDetails, IModalProps } from "../Api/interface";

function Modal({ section, category, id }: IModalProps) {
  /* Modal Data-fectching */
  const { data: details, isLoading: loadingDetails } = useQuery<IDetails>(["details", { section, id }], () => getDetails(section, id));
  const { data: cast, isLoading: loadingCast } = useQuery<ICast>(["cast", { section, id }], () => getCast(section, id));

  const isModalLoading = loadingDetails || loadingCast;

  return <></>;
}

export default Modal;
