/* eslint-disable no-undef */
import { useCallback, useState, useRef } from "react";

const IS_H5 = process.env.TARO_ENV === "h5";
// const ENV = Taro.getEnv();

export function formatDate(countdown) {
  const day: number | string = Math.floor(countdown / 1000 / 60 / 60 / 24);

  let hours: number | string = Math.floor((countdown / 1000 / 60 / 60) % 24);
  hours = hours > 9 ? hours : `0${hours}`;

  let minutes: number | string = Math.floor((countdown / 1000 / 60) % 60); // 分钟数
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  let seconds: number | string = Math.floor((countdown / 1000) % 60); // 秒数
  seconds = seconds > 9 ? seconds : `0${seconds}`;

  let mseconds: number | string = (((countdown % 1000) / 100) | 0) % 10; // 秒数
  mseconds = mseconds > 9 ? mseconds : `0${mseconds}`;

  return [day, hours, minutes, seconds, mseconds];
}

var requestAnimationFrame, cancelAnimationFrame;
if (IS_H5) {
  requestAnimationFrame = window.requestAnimationFrame;
  cancelAnimationFrame = window.cancelAnimationFrame;
}
(function() {
  // if (ENV === 'WEB') {
  //   return;
  // }
  var lastTime = 0;

  if (!requestAnimationFrame) {
    requestAnimationFrame = function(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 30 - (currTime - lastTime));
      var id = setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!cancelAnimationFrame) {
    cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})();

type TimeData = { time: number; timeString: string; timeArray: any };

type UserCountDown = [
  TimeData,
  (start?: number) => void,
  boolean,
  () => void,
  () => void
];

const useCountDown = (
  timeToCount = 60 * 1000,
  interval = 1000,
  doneCallback?
): UserCountDown => {
  const [isNeverStart, setIsNeverStart] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeData>({
    time: -1,
    timeString: "-",
    timeArray: formatDate(0),
  });
  const timer = useRef<{
    started: any;
    lastInterval: number;
    requestId: number;
    timeToCount: number;
  }>({
    started: null,
    lastInterval: -1,
    requestId: -1,
    timeToCount: -1,
  });

  const run = (ts) => {
    if (!timer.current.started) {
      timer.current.started = ts;
      timer.current.lastInterval = ts;
    }

    if (ts - Number(timer.current.lastInterval) >= interval) {
      timer.current.lastInterval =
        Number(timer.current.lastInterval) + interval;
      setTimeLeft((preTimeLeft) => {
        const left = preTimeLeft.time - interval;
        const [day, hours, minutes, seconds, mseconds] = formatDate(left);
        return {
          time: left,
          timeString: `${hours}:${minutes}:${seconds}:${mseconds}`,
          timeArray: formatDate(left),
        };
      });
    }

    if (ts - Number(timer.current.started) < timer.current.timeToCount) {
      timer.current.requestId = requestAnimationFrame(run);
    } else {
      setTimeLeft({
        time: 0,
        timeString: "00:00:00",
        timeArray: formatDate(0),
      });
      if (doneCallback) {
        doneCallback();
      }
    }
  };

  const start = useCallback(
    (ttc) => {
      setIsNeverStart(false);
      cancelAnimationFrame(timer.current.requestId);

      const newTimeToCount = ttc !== undefined ? ttc : timeToCount;
      timer.current.started = null;
      timer.current.lastInterval = -1;
      timer.current.timeToCount = newTimeToCount;
      timer.current.requestId = requestAnimationFrame(run);

      setTimeLeft({
        time: newTimeToCount,
        timeString: "-",
        timeArray: formatDate(newTimeToCount),
      });
    },
    [timer, setTimeLeft, isNeverStart]
  );

  const stop = useCallback(() => {
    cancelAnimationFrame(timer.current.requestId);

    // const newTimeToCount = timer.curre;
    timer.current.started = null;
    timer.current.lastInterval = -1;
    // timer.current.timeToCount = timer.current.timeToCount;
    timer.current.requestId = -1;

    setTimeLeft({
      time: timer.current.timeToCount,
      timeString: "-",
      timeArray: formatDate(timer.current.timeToCount),
    });
  }, [timer, setTimeLeft, isNeverStart]);

  const restart = useCallback(() => {
    // void 0 = undefined
    start(void 0);
  }, [timer, setTimeLeft, isNeverStart]);

  return [timeLeft, start, isNeverStart, stop, restart];
};

export default useCountDown;
