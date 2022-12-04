export function getImgPath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function getThumbnailPath(key: string) {
  return `https://img.youtube.com/vi/${key}/0.jpg`;
}

export const noBackdrop = process.env.PUBLIC_URL + "/assets/noBackdrop.png";
export const noPoster = process.env.PUBLIC_URL + "/assets/noPoster.png";
export const noProfile = process.env.PUBLIC_URL + "/assets/noProfile.png";

export function getYoutubeUrl(key: string) {
  return `https://www.youtube.com/watch?v=${key}`;
}

export function getDate(section: string, movieDate: string, tvDate: string) {
  if (section === "movie") {
    return `개봉일: ${movieDate || "없음"}`;
  } else if (section === "tv") {
    return `첫방영: ${tvDate || "없음"}`;
  } else {
    return "날짜: 없음";
  }
}

export function getRating(rating: number) {
  if (rating) {
    const rounded = Math.round(rating * 10) / 10;
    return `평점: ⭐${rounded}점`;
  } else {
    return `평점: ⭐없음`;
  }
}

export function getRuntime(runtime: number) {
  if (runtime) {
    const hour = Math.floor(runtime / 60) + "시간";
    const min = runtime % 60;
    const formattedMin = min === 0 ? "" : ` ${min}분`;
    return `상영시간: ${runtime}분 (${hour}${formattedMin})`;
  } else {
    return `상영시간: 없음`;
  }
}

export function getEpisodes(seasons: number, episodes: number) {
  if (seasons || episodes) {
    return `시즌 ${seasons || 0}개 에피소드 ${episodes || 0}개`;
  } else {
    return `회차: 정보없음`;
  }
}

export function getRuntimeOrEpisodes(
  section: string,
  runtime: number,
  seasons: number,
  episodes: number
) {
  if (section === "movie") {
    return getRuntime(runtime);
  } else if (section === "tv") {
    return getEpisodes(seasons, episodes);
  } else {
    return "시간/회차: 정보없음";
  }
}
