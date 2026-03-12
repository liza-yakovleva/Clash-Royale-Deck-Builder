import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './DeckArea.module.css';
import cardStyles from './DraggableCard.module.css';

export default function DeckArea({ activeDeck, showToast }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'deck-area',
  });

  const inlineStyle = {
    backgroundColor: isOver ? 'rgba(139, 92, 246, 0.1)' : '',
    borderColor: isOver ? 'rgba(139, 92, 246, 0.5)' : '',
  };

  const handleCopyDeck = () => {
    if (activeDeck.length === 0) {
      if (showToast) showToast('Колода порожня!', 'error');
      return;
    }
    
    const deckText = activeDeck.map(card => `${card.image} ${card.name} (💧${card.cost})`).join('\n');
    const fullText = `Моя колода Clash Royale:\n------------------------\n${deckText}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
      if (showToast) showToast('Колоду скопійовано в буфер!', 'success');
    }).catch(err => {
      console.error('Помилка копіювання: ', err);
      if (showToast) showToast('Не вдалося скопіювати', 'error');
    });
  };

  return (
    <div ref={setNodeRef} style={inlineStyle} className={styles.deckArea}>
      <div className={styles.header}>
        <h2 className={styles.title}>Моя колода ({activeDeck.length}/8)</h2>
        <button 
          className={styles.copyBtn} 
          onClick={handleCopyDeck}
          disabled={activeDeck.length === 0}
          title="Скопіювати колоду як текст"
        >
          📋 Поділитися
        </button>
      </div>
      <div className={styles.grid}>
        {activeDeck.length === 0 ? (
          <p className={styles.emptyMessage}>Перетягніть картки сюди</p>
        ) : (
          activeDeck.map(card => (
            <div key={card.id} className={styles.activeCardWrapper}>
              <div className={`${cardStyles.card} ${styles.activeCard}`}>
                <span className={cardStyles.image}>{card.image}</span>
                <span className={cardStyles.name}>{card.name}</span>
                <span className={cardStyles.cost}>💧 {card.cost}</span>
              </div>
              <span 
                className={styles.removeButton} 
                onClick={() => card.onRemove && card.onRemove(card.id)}
                title="Видалити"
              >
                ✖
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
