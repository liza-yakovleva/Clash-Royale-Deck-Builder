/**
 * Структура даних для карток
 * @typedef {Object} Card
 * @property {number} id - Унікальний ідентифікатор картки
 * @property {string} name - Назва картки (напр. "Міні П.Е.К.К.А.")
 * @property {number} cost - Вартість в еліксирі (від 1 до 9+)
 * @property {'Troop' | 'Spell' | 'Building'} type - Тип картки
 * @property {'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Champion'} rarity - Рідкість картки
 * @property {string} image - Emoji або URL зображення картки
 * @property {boolean} [isEvolution] - (Опціонально) Чи має картка еволюцію
 */

export const CARD_TYPES = {
  TROOP: 'Troop',
  SPELL: 'Spell',
  BUILDING: 'Building'
};

export const CARD_RARITIES = {
  COMMON: 'Common',
  RARE: 'Rare',
  EPIC: 'Epic',
  LEGENDARY: 'Legendary',
  CHAMPION: 'Champion'
};
