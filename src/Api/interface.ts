/* API interface */

export interface IContent {
  id: number;
  title: string; // movie
  name: string; // tv shows
  overview: string;
  release_date: string; // movie
  first_air_date: string; // tv shows
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
}

export interface IDetails {
  id: number;
  title: string;
  name: string;
  genres: {
    id: number;
    name: string;
  };
  runtime: number; // movie
  number_of_episodes: number;
  number_of_seasons: number;
}

export interface ICast {
  name: string;
  original_name: string;
  profile_path: string;
  character: string;
}

/* Props interface */

export interface ISliderProps {
  section: string;
  category: string;
  title: string;
  list?: IContent[];
}

export interface IModalProps {
  section: string;
  category: string;
  id: string;
}
