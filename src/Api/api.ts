import axios from "axios";

const db = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const API_KEY = "5836da8588c0e9fe7dc6f7c56764dae7";

export async function getList(section: string, category: string) {
  const response = await db.get(`${section}/${category}?api_key=${API_KEY}&language=ko-KR&region=kr`);
  return response.data.results;
}

export async function getDetails(section: string, id: string) {
  const response = await db.get(`${section}/${id}?api_key=${API_KEY}&language=ko-KR&region=kr`);
  return response.data;
}

export async function getCast(section: string, id: string) {
  const response = await db.get(`${section}/${id}/credits?api_key=${API_KEY}&language=ko-KR&region=kr`);
  return response.data.cast;
}
