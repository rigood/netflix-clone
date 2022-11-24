export function getImgPath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function getThumbnailPath(key: string) {
  return `https://img.youtube.com/vi/${key}/0.jpg`;
}

export function getYoutubeUrl(key: string) {
  return `https://www.youtube.com/watch?v=${key}`;
}

export function getRating(rating: number) {
  if (rating) {
    const rounded = Math.round(rating * 10) / 10;
    return `⭐${rounded}점`;
  } else {
    return `⭐없음`;
  }
}

export function getRuntime(runtime: number) {
  if (runtime) {
    const hour = Math.floor(runtime / 60) + "시간";
    const min = runtime % 60;
    const formattedMin = min === 0 ? "" : ` ${min}분`;
    return `${runtime}분 (${hour}${formattedMin})`;
  } else {
    return `미정`;
  }
}

export const noBackdrop = process.env.PUBLIC_URL + "/assets/noBackdrop.png";

export const noPoster = process.env.PUBLIC_URL + "/assets/noPoster.png";

export const noProfile = process.env.PUBLIC_URL + "/assets/noProfile.png";
