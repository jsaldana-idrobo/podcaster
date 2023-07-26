export const refetchIfExpired = (
  expirationTimeInSeconds: number,
  id?: string
) => {
  let bool = false;
  const fetchTime = localStorage.getItem(`fetchTime-${id ?? ""}`);
  const currentTimeInSeconds = Math.round(new Date().getTime() / 1000);
  const timeElapsed = currentTimeInSeconds - Number(fetchTime);

  if (!fetchTime || timeElapsed > expirationTimeInSeconds) {
    localStorage.setItem(
      `fetchTime-${id ?? ""}`,
      currentTimeInSeconds.toString()
    );
    bool = true;
  }

  return bool;
};
