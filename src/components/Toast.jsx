import React, { useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, type = 'error', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Закриваємо через 3 секунди
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span className={styles.icon}>
        {type === 'error' ? '🚫' : '✅'}
      </span>
      <span className={styles.message}>{message}</span>
    </div>
  );
}
