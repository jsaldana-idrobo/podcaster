export const currentTimeInSeconds = Math.round(new Date().getTime() / 1000);

export const refetchIfExpired = (
  expirationTimeInSeconds: number,
  id?: string
) => {
  const fetchTime = localStorage.getItem(`fetchTime-${id ?? ""}`);
  const timeElapsed = currentTimeInSeconds - Number(fetchTime);

  return !fetchTime || timeElapsed > expirationTimeInSeconds / 1000;
};

export const converText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const breakRegex = /(?:\r\n|\r|\n|\n\n)/g;
  return text
    .replace(breakRegex, " <br/> ")
    .replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
};
