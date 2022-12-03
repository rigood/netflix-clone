import axios from "axios";
import { IVideo } from "./interface";

const db = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_API_KEY,
  },
});

const SLICE_INDEX = 12;

export async function getMovieList(category: string, lang: string) {
  console.log(`getMovielist ${category} 시작`);

  const response = await db.get(`movie/${category}?language=${lang}`);
  console.log(`getMovielist ${category} 끝`);

  return response.data.results.slice(0, SLICE_INDEX);
}

export async function getTvList(category: string, lang: string) {
  console.log(`getTvlist ${category} 시작`);

  const response = await db.get(`tv/${category}?language=${lang}`);
  console.log(`getTvlist ${category} 끝`);

  return response.data.results.slice(0, SLICE_INDEX);
}

export async function getDetails(section: string, id: string, lang: string) {
  console.log(`detail ${section} ${id} 시작`);

  const response = await db.get(`${section}/${id}?language=${lang}`);
  console.log(`detail ${section}  ${id} 끝`);

  return response.data;
}

export async function getCast(section: string, id: string, lang: string) {
  console.log(`cast ${section}  ${id} 시작`);

  const response = await db.get(`${section}/${id}/credits?language=${lang}`);
  console.log(`cast ${section}  ${id} 끝`);

  return response.data.cast;
}

export async function getVideos(section: string, id: string, lang: string) {
  console.log(`video ${section}  ${id} 시작`);

  const response = await db.get(`${section}/${id}/videos?language=${lang}`);
  const youtubeVideos = response.data.results.filter(
    (video: IVideo) => video.site === "youtube" || "Youtube"
  );

  console.log(`video ${section}  ${id} 끝`);

  return youtubeVideos;
}

export async function getRecommendations(
  section: string,
  id: string,
  lang: string
) {
  console.log(`reco ${section}  ${id} 시작`);

  const response = await db.get(
    `${section}/${id}/recommendations?language=${lang}`
  );
  console.log(`reco ${section}  ${id} 끝`);

  return response.data.results;
}

export async function getSimilar(section: string, id: string, lang: string) {
  console.log(`similar ${section}  ${id} 시작`);

  const response = await db.get(`${section}/${id}/similar?language=${lang}`);
  console.log(`similar ${section}  ${id} 끝`);

  return response.data.results;
}

export async function getMovieSearch(
  keyword: string,
  pageParam: number,
  lang: string
) {
  console.log(`movie search ${keyword} ${pageParam} 시작`);

  const params = { page: pageParam, query: keyword, language: lang };
  const response = await db.get("search/movie", { params });

  console.log(`movie search ${keyword} ${pageParam} 끝`);

  return response;
}

export async function getTvSearch(
  keyword: string,
  pageParam: number,
  lang: string
) {
  console.log(`tv search ${keyword} ${pageParam} 시작`);

  const params = { page: pageParam, query: keyword, language: lang };
  const response = await db.get("search/tv", { params });

  console.log(`tv search ${keyword} ${pageParam} 끝`);

  return response;
}
