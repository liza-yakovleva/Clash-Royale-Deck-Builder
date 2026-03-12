import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './DraggableCard.module.css';

export default function DraggableCard({ card }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id.toString(), // ID має бути рядком
    data: card, // Передаємо дані картки, щоб отримати їх при скиданні
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1000,
    position: 'relative' // Щоб не зміщувало інші елементи під час перетягування
  } : undefined;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className={`${styles.card} ${card.isEvolution ? styles.evolution : ''}`}
    >
      {card.isEvolution && <span className={styles.evolutionBadge}>Evo</span>}
      <span className={styles.image}>{card.image}</span>
      <span className={styles.name}>{card.name}</span>
      <span className={styles.cost}>💧 {card.cost}</span>
    </div>
  );
}
