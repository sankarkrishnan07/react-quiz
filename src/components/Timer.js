import { useEffect } from "react";

export default function Timer({ timeLeft, handleTimer }) {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        handleTimer();
      }, 1000);

      return () => clearInterval(id);
    },
    [handleTimer,timeLeft]
  );
  return (
    <div className="timer">
      ⏲️ {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}
