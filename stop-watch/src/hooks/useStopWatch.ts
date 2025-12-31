import { useEffect, useRef, useState } from "react";

interface StopWatch {
  isRunning: boolean;
  seconds: string;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

const STORAGE_KEY = "stop-watch-count";

const useStopWatch = (): StopWatch => {
  const [count, setCount] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : 0;
  });

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<string>("MM:SS");

  const timerRef = useRef<number | null>(null);

  // Persist count on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(count));
  }, [count]);

  //Format time
  useEffect(() => {
    const min = Math.floor(count / 60);
    const sec = count % 60;

    if (count === 0) {
      setSeconds("MM:SS");
    } else {
      setSeconds(
        `${min < 10 ? "0" + min : min} : ${sec < 10 ? "0" + sec : sec}`
      );
    }
  }, [count]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const start = () => {
    if (timerRef.current) return;

    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  };

  const reset = () => {
    stop();
    setCount(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    isRunning,
    seconds,
    start,
    stop,
    reset
  };
};

export default useStopWatch;
