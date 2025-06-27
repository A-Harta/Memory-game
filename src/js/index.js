import { generateGame } from "./game";

import { startGame } from "./game";
import { SELECTORS } from "./selectors";
import { flipCard } from "./game";

// Добавляем обработчик события на каждую карточку
document.addEventListener("DOMContentLoaded", () => {
  // Генерируем игровое поле
  generateGame();

  // Добавляем обработчик клика на кнопку "Начать игру"
  SELECTORS.button.addEventListener("click", startGame);

  // Добавляем обработчики на карточки после их генерации
  addCardsListener();
});

// Добавляет обработчик события на каждую карточку
export function addCardsListener() {
  // Need to fix (не успевает получить карточки через SELECTORS?.cards)
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      console.log("flip");
      flipCard(card);
    });
  });
}
