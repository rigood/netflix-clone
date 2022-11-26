import axios from "axios";
import { IVideo } from "./interface";

const db = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const API_KEY = "5836da8588c0e9fe7dc6f7c56764dae7";

export async function getList(section: string, category: string) {
  console.log(`getlist ${section} ${category} 시작`);
  const response = await db.get(
    `${section}/${category}?api_key=${API_KEY}&language=ko-KR&region=kr`
  );
  console.log(`getlist ${section} ${category} 끝`);

  return response.data.results;
}

export async function getDetails(section: string, id: string) {
  console.log(`detail ${section} ${id} 시작`);

  const response = await db.get(
    `${section}/${id}?api_key=${API_KEY}&language=ko-KR&region=kr`
  );
  console.log(`detail ${section}  ${id} 끝`);

  return response.data;
}

export async function getCast(section: string, id: string) {
  console.log(`cast ${section}  ${id} 시작`);

  const response = await db.get(
    `${section}/${id}/credits?api_key=${API_KEY}&language=ko-KR&region=kr`
  );
  console.log(`cast ${section}  ${id} 끝`);

  return response.data.cast;
}

export async function getVideos(section: string, id: string) {
  console.log(`video ${section}  ${id} 시작`);

  const response = await db.get(
    `${section}/${id}/videos?api_key=${API_KEY}&language=ko-KR&region=kr`
  );
  const youtubeVideos = response.data.results.filter(
    (video: IVideo) => video.site === "youtube" || "Youtube"
  );
  console.log(`video ${section}  ${id} 끝`);

  return youtubeVideos;
}

export async function getRecommendations(section: string, id: string) {
  console.log(`reco ${section}  ${id} 시작`);

  const response = await db.get(
    `${section}/${id}/recommendations?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`
  );
  console.log(`reco ${section}  ${id} 끝`);

  return response.data.results;
}

export async function getSimilar(section: string, id: string) {
  console.log(`similar ${section}  ${id} 시작`);

  const response = await db.get(
    `${section}/${id}/similar?api_key=${API_KEY}&language=ko-KR&region=kr&page=1`
  );
  console.log(`similar ${section}  ${id} 끝`);

  return response.data.results;
}

export async function getMovieSearch(keyword: string, pageParam: number) {
  console.log(`movie search ${keyword} ${pageParam} 시작`);

  const response = await db.get(
    `search/movie?api_key=${API_KEY}&query=${keyword}&language=ko-KR&region=kr&page=${pageParam}`
  );
  console.log(`movie search ${keyword} ${pageParam} 끝`);

  return response;
}

export async function getTvSearch(keyword: string, pageParam: number) {
  console.log(`tv search ${keyword} ${pageParam} 시작`);

  const response = await db.get(
    `search/tv?api_key=${API_KEY}&query=${keyword}&language=ko-KR&region=kr&page=${pageParam}`
  );
  console.log(`tv search ${keyword} ${pageParam} 끝`);

  return response;
}
