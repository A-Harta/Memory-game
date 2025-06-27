import { STATE } from "./state";

// таймер для игры
export const setTimer = () => {
  const timer = document.querySelector(".timer");

  setInterval(() => {
    STATE.timer++;
    timer.textContent = STATE.timer;
  }, 1000);
};
