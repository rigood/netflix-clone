export interface IContent {
  // common
  id: number;
  backdrop_path: string;
  poster_path: string;
  status: string;
  genres: IGenre[];
  overview: string;
  vote_average: number;
  original_language: string;
  // movie
  title: string;
  runtime: number;
  release_date: string;
  imdb_id: string;
  adult: boolean;
  video: boolean;
  // tv
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

export interface IVideo {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
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
