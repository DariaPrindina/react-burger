import { useEffect } from "react";
import styles from "./timer.module.css";

export const Timer = () => {
  let end;
  const now = Date.now;
  const timer = document.getElementById("timer");
  const duration = 9900;

  function displayCountdown() {
    const count = parseInt((end - now()) / 100);
    timer.textContent = count > 0 ? (window.requestAnimationFrame(displayCountdown), count) : 0;
  }

  function start() {
    end = now() + duration;
    window.requestAnimationFrame(displayCountdown);
  }

  useEffect(() => {
    start()
  }, [])

  return (
    <div className={styles.timer_container}>
      <p className={styles.timer} id="timer">
        99
      </p>
    </div>
  );
};
