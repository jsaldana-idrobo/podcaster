export const refetchIfExpired = (
  expirationTimeInSeconds: number,
  id?: string
) => {
  let bool = false;
  const fetchTime = localStorage.getItem(`fetchTime-${id ?? ""}`);
  const currentTimeInSeconds = Math.round(new Date().getTime() / 1000);
  const timeElapsed = currentTimeInSeconds - Number(fetchTime);

  if (!fetchTime || timeElapsed > expirationTimeInSeconds / 1000) {
    localStorage.setItem(
      `fetchTime-${id ?? ""}`,
      currentTimeInSeconds.toString()
    );
    bool = true;
  }

  return bool;
};

export const converText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const breakRegex = /(?:\r\n|\r|\n|\n\n)/g;
  return text
    .replace(breakRegex, " <br/> ")
    .replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
};
