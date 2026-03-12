import React from 'react';
import DraggableCard from './DraggableCard';
import styles from './CardPool.module.css';

export default function CardPool({ cards, filterType, setFilterType, sortOrder, setSortOrder }) {
  const filterOptions = [
    { value: 'All', label: 'Всі' },
    { value: 'Troop', label: 'Війська' },
    { value: 'Spell', label: 'Заклинання' },
    { value: 'Building', label: 'Будівлі' }
  ];

  return (
    <div className={styles.cardPool}>
      <div className={styles.header}>
        <h2 className={styles.title}>Доступні картки</h2>
        
        <div className={styles.controls}>
          <div className={styles.filterGroup}>
            {filterOptions.map(option => (
              <button
                key={option.value}
                className={`${styles.filterBtn} ${filterType === option.value ? styles.activeFilter : ''}`}
                onClick={() => setFilterType(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className={styles.sortGroup}>
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="id">За замовчуванням</option>
              <option value="cost-asc">Еліксир: зростання</option>
              <option value="cost-desc">Еліксир: спадання</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {cards.length === 0 ? (
          <p className={styles.noCardsMessage}>Карток не знайдено</p>
        ) : (
          cards.map(card => (
            <DraggableCard key={card.id} card={card} />
          ))
        )}
      </div>
    </div>
  );
}
