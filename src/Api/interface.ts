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

export interface IGenre {
  id: number;
  name: string;
}

export interface INetwork {
  name: string;
  logo_path: string;
  origin_country: string;
}

export interface ISeason {
  air_date: string;
  episode_count: number;
  id: string;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface IDetails {
  id: number;
  title: string; // movie
  name: string; // tv
  backdrop_path: string;
  poster_path: string;
  status: string;
  genres: IGenre[];
  overview: string;
  vote_average: string;
  original_language: string;
  runtime: number; // movie
  episode_run_time: number; // tv
  release_date: string; // movie
  first_air_date: string; // tv
  last_air_date: string; // tv
  imdb_id: string; // movie
  homepage: string; // tv
  adult: boolean; // movie
  video: boolean; // movie
  networks: INetwork[]; // tv
  seasons: ISeason[]; // tv
  number_of_seasons: number; // tv
  number_of_episodes: number; // tv
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
