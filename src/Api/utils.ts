export function getImgPath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function getThumbnailPath(key: string) {
  return `https://img.youtube.com/vi/${key}/0.jpg`;
}

export function getYoutubeUrl(key: string) {
  return `https://www.youtube.com/watch?v=${key}`;
}

export const noImg = process.env.PUBLIC_URL + "/assets/noImg.png";
