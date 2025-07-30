import React, { useState, useEffect } from "react";

function FocusTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true);
  const [duration, setDuration] = useState(1500); // default 25 min
  const [seconds, setSeconds] = useState(1500);

  const [workTime, setWorkTime] = useState(1500); // 25 mins
  const [breakTime, setBreakTime] = useState(300); // 5 mins

  const [totalFocusTime, setTotalFocusTime] = useState(() => {
    const stored = localStorage.getItem("focusTime");
    return stored ? parseInt(stored) : 0;
  });

  const [focusLog, setFocusLog] = useState(() => {
    const stored = localStorage.getItem("focusLog");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);

        if (isFocusMode) {
          setTotalFocusTime((prev) => {
            const updated = prev + 1;
            localStorage.setItem("focusTime", updated.toString());

            const today = new Date().toLocaleDateString("en-GB");
            const log = JSON.parse(localStorage.getItem("focusLog") || "{}");
            log[today] = (log[today] || 0) + 1;
            localStorage.setItem("focusLog", JSON.stringify(log));
            setFocusLog(log);
            return updated;
          });
        }
      }, 1000);
    }

    if (seconds === 0 && isRunning) {
      setIsRunning(false);
      const nextMode = !isFocusMode;
      setIsFocusMode(nextMode);
      const nextDuration = nextMode ? workTime : breakTime;
      setDuration(nextDuration);
      setSeconds(nextDuration);
      setTimeout(() => setIsRunning(true), 1000); // auto start next round
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds, isFocusMode, workTime, breakTime]);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setIsFocusMode(true);
    setDuration(workTime);
    setSeconds(workTime);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md w-full text-center text-white">
      <h2 className="text-2xl font-semibold mb-4 text-teal-400">⏱️ Pomodoro Focus Timer</h2>
      
      <div className="mb-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Work Duration Dropdown */}
        <label>
          Work Duration:
          <select
            className="ml-2 p-1 bg-gray-700 rounded"
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setWorkTime(val);
              if (isFocusMode) {
                setSeconds(val);
                setDuration(val);
              }
            }}
            value={workTime}
          >
            <option value={1500}>25 min</option>
            <option value={1800}>30 min</option>
            <option value={2700}>45 min</option>
            <option value={3600}>60 min</option>
          </select>
        </label>

        {/* Break Duration Dropdown */}
        <label>
          Break Duration:
          <select
            className="ml-2 p-1 bg-gray-700 rounded"
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setBreakTime(val);
              if (!isFocusMode) {
                setSeconds(val);
                setDuration(val);
              }
            }}
            value={breakTime}
          >
            <option value={300}>5 min</option>
            <option value={600}>10 min</option>
            <option value={900}>15 min</option>
            <option value={1200}>20 min</option>
          </select>
        </label>
      </div>

      <div className="text-5xl font-bold mb-4">{formatTime(seconds)}</div>

      <p className="mb-4">
        {isFocusMode ? "🧠 Focus Time" : "🛌 Break Time"}
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={startTimer}
          disabled={isRunning}
          className="px-4 py-2 rounded text-white bg-green-500 hover:bg-green-600 disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          disabled={!isRunning}
          className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 disabled:opacity-50"
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 rounded text-white bg-yellow-500 hover:bg-yellow-600"
        >
          Reset
        </button>
      </div>

      {/* Focus Time Stats */}
      <div className="text-lg text-gray-300 mb-4">
        🔥 Total Focus Time:{" "}
        <span className="text-white font-semibold">
          {Math.floor(totalFocusTime / 60)} mins {totalFocusTime % 60} secs
        </span>
      </div>

      {/* Leaderboard */}
      <hr className="border-gray-600 my-4" />
      <h3 className="text-lg font-semibold text-yellow-400 mb-2">
        🏆 Weekly Focus Leaderboard
      </h3>
      {Object.keys(focusLog).length === 0 ? (
        <p className="text-sm text-gray-400">No focus data yet.</p>
      ) : (
        <ul className="text-sm space-y-1 text-gray-300">
          {Object.entries(focusLog)
            .sort(([a], [b]) => new Date(b) - new Date(a))
            .slice(0, 7)
            .map(([date, timeInSeconds]) => (
              <li key={date} className="flex justify-between">
                <span>{date}</span>
                <span className="text-cyan-300">
                  {Math.floor(timeInSeconds / 60)}m {timeInSeconds % 60}s
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default FocusTimer;









