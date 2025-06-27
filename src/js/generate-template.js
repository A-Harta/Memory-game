import { SELECTORS } from "./selectors";
/**
 * Генерирует HTML-шаблон для карточек
 * @param {Array} emojis - Массив эмодзи
 */
export const generateTemplate = (emojis) => {
  const cardsHTML = emojis
    .map((emoji) => {
      return `
      <div class="card">
        <div class="card-back"></div>
        <div class="card-front">${emoji}</div>
      </div>
    `;
    })
    .join("");

  SELECTORS.board.insertAdjacentHTML("beforeend", cardsHTML);
};
