/* API interface */

export interface IContent {
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

/* for Movie */
export interface IContent {
  title: string;
  release_date: string;
}

/* for Tv */
export interface IContent {
  name: string;
  first_air_date: string;
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
  backdrop_path: string;
  poster_path: string;
  status: string;
  genres: IGenre[];
  overview: string;
  vote_average: string;
  original_language: string;
}

/* for Movie */
export interface IDetails {
  title: string;
  runtime: number;
  release_date: string;
  imdb_id: string;
  adult: boolean;
  video: boolean;
}

/* for Tv */
export interface IDetails {
  name: string;
  episode_run_time: number;
  first_air_date: string;
  last_air_date: string;
  homepage: string;
  networks: INetwork[];
  seasons: ISeason[];
  number_of_seasons: number;
  number_of_episodes: number;
}

export interface ICast {
  name: string;
  original_name: string;
  profile_path: string;
  character: string;
}

/* Props interface */

export interface IBannerProps {
  section: string;
  category: string;
  title: string;
  content?: IContent;
}

export interface ISliderProps {
  section: string;
  category: string;
  title: string;
  list?: IContent[];
}

export interface IModalProps {
  section: string;
  category: string;
  details: IDetails;
  cast: ICast[];
}
