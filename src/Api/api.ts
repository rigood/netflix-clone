import axios from "axios";
import { IVideo } from "./interface";

const db = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: "ko-KR",
    region: "kr",
  },
});

export async function getList(section: string, category: string) {
  console.log(`getlist ${section} ${category} 시작`);

  const response = await db.get(`${section}/${category}`);
  console.log(`getlist ${section} ${category} 끝`);

  return response.data.results;
}

export async function getDetails(section: string, id: string) {
  console.log(`detail ${section} ${id} 시작`);

  const response = await db.get(`${section}/${id}`);
  console.log(`detail ${section}  ${id} 끝`);

  return response.data;
}

export async function getCast(section: string, id: string) {
  console.log(`cast ${section}  ${id} 시작`);

  const response = await db.get(`${section}/${id}/credits`);
  console.log(`cast ${section}  ${id} 끝`);

  return response.data.cast;
}

export async function getVideos(section: string, id: string) {
  console.log(`video ${section}  ${id} 시작`);

  const response = await db.get(`${section}/${id}/videos`);
  const youtubeVideos = response.data.results.filter(
    (video: IVideo) => video.site === "youtube" || "Youtube"
  );

  console.log(`video ${section}  ${id} 끝`);

  return youtubeVideos;
}

export async function getRecommendations(section: string, id: string) {
  console.log(`reco ${section}  ${id} 시작`);

  const response = await db.get(`${section}/${id}/recommendations`);
  console.log(`reco ${section}  ${id} 끝`);

  return response.data.results;
}

export async function getSimilar(section: string, id: string) {
  console.log(`similar ${section}  ${id} 시작`);

  const response = await db.get(`${section}/${id}/similar`);
  console.log(`similar ${section}  ${id} 끝`);

  return response.data.results;
}

export async function getMovieSearch(keyword: string, pageParam: number) {
  console.log(`movie search ${keyword} ${pageParam} 시작`);

  const params = { page: pageParam, query: keyword };
  const response = await db.get("search/movie", { params });

  console.log(`movie search ${keyword} ${pageParam} 끝`);

  return response;
}

export async function getTvSearch(keyword: string, pageParam: number) {
  console.log(`tv search ${keyword} ${pageParam} 시작`);

  const params = { page: pageParam, query: keyword };
  const response = await db.get("search/tv", { params });

  console.log(`tv search ${keyword} ${pageParam} 끝`);

  return response;
}
