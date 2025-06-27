/**
 * Перемешивает элементы массива.
 * @param {Array} array - Массив для перемешивания.
 * @returns {Array} - Перемешанный массив.
 */
export const shuffle = (array) => {
  // Создаем клон исходного массива, чтобы не менять его порядок.
  const clonedArray = [...array];

  // Начинаем цикл для перемешивания элементов массива.
  for (let index = clonedArray.length - 1; index > 0; index--) {
    /*
	  Math.random() генерирует случайное число в интервале от 0 до 1 (не включительно).
	  Умножив его на (index + 1), получаем случайное число в интервале от 0 до index + 1.
	  Math.floor округляет это число вниз до ближайшего целого, создавая целочисленный индекс от 0 до index.
		*/
    const randomIndex = Math.floor(Math.random() * (index + 1));

    // Сохраняем значение текущего элемента в переменной original.
    const original = clonedArray[index];

    // Заменяем текущий элемент на случайно выбранный элемент.
    clonedArray[index] = clonedArray[randomIndex];

    // Заменяем случайно выбранный элемент на оригинальный элемент.
    clonedArray[randomIndex] = original;
  }

  return clonedArray;
};

/**
 * Выбирает случайные элементы из массива.
 * @param {Array} array - Исходный массив.
 * @param {number} items - Количество элементов для выбора.
 * @returns {Array} - Массив случайно выбранных элементов.
 */
export const pickRandom = (array, items) => {
  // Создаем клон исходного массива, чтобы не изменять его.
  const clonedArray = [...array];

  // Массив для хранения случайно выбранных элементов.
  const randomPicks = [];

  // Начинаем цикл для выбора случайных элементов.
  for (let index = 0; index < items; index++) {
    // Генерируем случайный индекс от 0 до длины оставшегося массива.
    const randomIndex = Math.floor(Math.random() * clonedArray.length);

    // Добавляем случайно выбранный элемент в массив randomPicks.
    randomPicks.push(clonedArray[randomIndex]);

    // Удаляем выбранный элемент из клонированного массива.
    clonedArray.splice(randomIndex, 1);
  }

  return randomPicks;
};
