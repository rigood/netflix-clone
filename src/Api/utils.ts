export function getImgPath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export const noImg = process.env.PUBLIC_URL + "/assets/noImg.png";
