import React from 'react';
import styles from './DeckStats.module.css';

export default function DeckStats({ activeDeck }) {
  const averageElixir = activeDeck.length > 0 
    ? (activeDeck.reduce((acc, card) => acc + card.cost, 0) / activeDeck.length).toFixed(1)
    : 0;

  const spellsCount = activeDeck.filter(card => card.type === 'Spell').length;
  const troopsCount = activeDeck.filter(card => card.type === 'Troop').length;
  const buildingsCount = activeDeck.filter(card => card.type === 'Building').length;

  // Рахуємо розподіл еліксиру (від 1 до 8+)
  const elixirCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
  
  activeDeck.forEach(card => {
    let cost = card.cost;
    if (cost >= 8) cost = 8; // Всі дорогі картки групуємо в "8+"
    elixirCounts[cost] += 1;
  });

  // Знаходимо максимум для масштабування графіку
  const maxCount = Math.max(...Object.values(elixirCounts), 1); // Мінімум 1, щоб не ділити на 0

  return (
    <div className={styles.deckStats}>
      <h2 className={styles.title}>Аналітика колоди</h2>
      
      <div className={styles.container}>
        <p className={styles.statRow}><strong className={styles.statLabel}>Середній еліксир:</strong> <span className={styles.statValue}>{averageElixir} 💧</span></p>
        <p className={styles.statRow}><strong className={styles.statLabel}>Війська:</strong> <span className={styles.statValue}>{troopsCount}</span></p>
        <p className={styles.statRow}><strong className={styles.statLabel}>Заклинання:</strong> <span className={styles.statValue}>{spellsCount}</span></p>
        <p className={styles.statRow}><strong className={styles.statLabel}>Будівлі:</strong> <span className={styles.statValue}>{buildingsCount}</span></p>
      </div>

      <div className={styles.elixirCurveWrapper}>
        <h3 className={styles.curveTitle}>Крива Еліксиру</h3>
        <div className={styles.chart}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(cost => {
            const count = elixirCounts[cost];
            const heightPerc = (count / maxCount) * 100;
            return (
              <div key={cost} className={styles.barCol}>
                <span className={styles.barValue}>{count > 0 ? count : ''}</span>
                <div 
                  className={styles.bar} 
                  style={{ height: count > 0 ? `${heightPerc}%` : '4px' }}
                ></div>
                <span className={styles.barLabel}>{cost}{cost === 8 ? '+' : ''}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
