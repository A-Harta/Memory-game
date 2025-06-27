import { SELECTORS } from "./selectors";
import { shuffle, pickRandom } from "./utils";
import { EMOJIS } from "./emoji";
import { generateTemplate } from "./generate-template";
import { STATE } from "./state";
import { setTimer } from "./timer";

export const generateGame = () => {
  if (!SELECTORS.board) {
    console.error("Игровое поле не найдено");
    return;
  }

  // Получение размера доски
  const dimension = SELECTORS.board.dataset.dimension;

  if (!dimension) {
    console.error("Не указан размер игрового поля");
    return;
  }

  if (dimension % 2 !== 0) {
    throw new Error("Размер доски должен быть четным");
  }

  // Достаем случайные 8 эмодзи
  const picks = pickRandom(EMOJIS, (dimension * dimension) / 2);

  // Перемешиваем эмоджи
  const shuffledEmojis = shuffle([...picks, ...picks]);

  // Генерируем шаблон карточек
  generateTemplate(shuffledEmojis);
};

// дизаблим игровое поле при загрузке страницы до начала игры
document.addEventListener("DOMContentLoaded", () => {
  const board = SELECTORS.board;
  // SELECTORS.board — это игровое поле
  board.classList.add("disabled");
});

/**
 * Запускает игру, инициализирует состояние и генерирует игровое поле.
 */
export const startGame = () => {
  console.log("game started");
  // // Если игра уже начата, ничего не делаем
  // if (STATE.isGameStarted) return;

  // Устанавливаем состояние игры в "начата"
  STATE.isGameStarted = true;

  // Блокируем кнопку "Начать игру"
  SELECTORS.button.disabled = true;

  // Делаем игровое поле активным
  const board = SELECTORS.board; // Предполагается, что SELECTORS.board — это игровое поле
  board.classList.remove("disabled");

  // Сбрасываем состояние игры
  Object.assign(STATE, {
    moves: 0,
    flippedCards: 0,
    foundPairs: 0,
    timer: 0,
  });

  // Запускаем таймер
  setTimer();
};

/**
 * Обрабатывает переворот карточки и ход игрока
 * @param {HTMLElement} card - Элемент карточки
 */
export const flipCard = (card) => {
  // Проверка на начало игры
  if (!STATE.isGameStarted) {
    startGame();
  }

  // Класс для переворота card
  card.classList.add("flipped");

  // Увеличиваем счётчик
  STATE.flippedCards++;

  // Увеличиваем общее кол-во ходов
  STATE.moves++;

  // логика совпадения ходов
  if (STATE.flippedCards === 2) {
    // проверки совпадений
    checkForMatch();
  }
};

/**
 * Проверяет, совпадают ли две перевернутые карточки.
 */
const checkForMatch = () => {
  // Получаем все перевернутые карточки
  const flippedCards = document.querySelectorAll(".flipped:not(.matched)");

  // Проверяем, совпадают ли эмодзи на карточках
  if (
    flippedCards[0].querySelector(".card-front").textContent ===
    flippedCards[1].querySelector(".card-front").textContent
  ) {
    // Если совпадают, увеличиваем количество найденных пар
    STATE.foundPairs++;

    // помечаем как matched
    markMatched(flippedCards);

    if (STATE?.flippedCards === 2) {
      STATE.flippedCards = 0;
    }
  } else {
    // Если не совпадают, переворачиваем карточки обратно через 1 секунду
    setTimeout(() => {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
      });
      // Сбрасываем количество перевернутых карточек
      STATE.flippedCards = 0;
    }, 1000);
  }
};

export const markMatched = (cards) => {
  cards.forEach((card) => card.classList.add("matched"));
};
