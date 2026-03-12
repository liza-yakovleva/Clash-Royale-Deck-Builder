import { useState } from 'react';
import { CARDS_DB } from '../data/cards';
import { useLocalStorage } from './useLocalStorage';

export const useDeckLogic = (showToast) => {
  // Завантажуємо активну колоду з localStorage
  const [activeDeck, setActiveDeck] = useLocalStorage('clash-deck', []);
  
  // Фільтруємо доступні картки: видаляємо ті, що ВЖЕ є в збереженій колоді
  const initialAvailableCards = CARDS_DB.filter(
    dbCard => !activeDeck.some(deckCard => deckCard.id === dbCard.id)
  );
  
  const [availableCards, setAvailableCards] = useState(initialAvailableCards);
  
  // Стани для фільтрації та сортування
  const [filterType, setFilterType] = useState('All'); 
  const [sortOrder, setSortOrder] = useState('id');

  // Отримуємо відфільтровані та посортовані картки
  const getFilteredAndSortedCards = () => {
    let result = [...availableCards];

    if (filterType !== 'All') {
      result = result.filter(card => card.type === filterType);
    }

    result.sort((a, b) => {
      if (sortOrder === 'cost-asc') return a.cost - b.cost;
      if (sortOrder === 'cost-desc') return b.cost - a.cost;
      return a.id - b.id;
    });

    return result;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || over.id !== 'deck-area') return;

    const cardData = active.data.current;
    
    if (activeDeck.length >= 8) {
      if (showToast) showToast('Колода вже повна (максимум 8 карток)!', 'error');
      return;
    }
    
    if (activeDeck.some(c => c.id === cardData.id)) {
      if (showToast) showToast('Ця картка вже є у колоді!', 'error');
      return;
    }

    setActiveDeck([...activeDeck, cardData]);
    setAvailableCards(availableCards.filter(c => c.id !== cardData.id));
    if (showToast) showToast(`"${cardData.name}" додано до колоди!`, 'success');
  };

  const handleRemoveCard = (cardId) => {
    const cardToReturn = activeDeck.find(c => c.id === cardId);
    
    setAvailableCards([...availableCards, cardToReturn].sort((a, b) => a.id - b.id));
    setActiveDeck(activeDeck.filter(c => c.id !== cardId));
  };

  return {
    activeDeck,
    availableCards: getFilteredAndSortedCards(),
    filterType,
    setFilterType,
    sortOrder,
    setSortOrder,
    handleDragEnd,
    handleRemoveCard
  };
};
