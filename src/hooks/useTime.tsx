import { useEffect, useState } from "react";

interface Time {
  minutes: number;
  seconds: number;
}

function useTime(milliseconds: number): Time {
  const [time, setTime] = useState<Time>({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    setTime({ minutes, seconds: remainingSeconds });
  }, [milliseconds]);

  return time;
}

export default useTime;
