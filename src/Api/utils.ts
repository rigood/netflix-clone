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
  const rounded = Math.round(rating * 10) / 10;
  return `⭐${rounded}점`;
}

export const noBackdrop = process.env.PUBLIC_URL + "/assets/noBackdrop.png";

export const noPoster = process.env.PUBLIC_URL + "/assets/noPoster.png";

export const noProfile = process.env.PUBLIC_URL + "/assets/noProfile.png";
