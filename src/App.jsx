import { useState } from 'react';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useDeckLogic } from './hooks/useDeckLogic';
import CardPool from './components/CardPool';
import DeckArea from './components/DeckArea';
import DeckStats from './components/DeckStats';
import Toast from './components/Toast';
import './App.css';

function App() {
  // 1. Стан для сповіщень (UI стан)
  const [toast, setToast] = useState(null);
  
  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  // 2. Вся бізнес-логіка винесена у кастомний хук
  const {
    activeDeck,
    availableCards,
    filterType,
    setFilterType,
    sortOrder,
    setSortOrder,
    handleDragEnd,
    handleRemoveCard
  } = useDeckLogic(showToast);

  // 3. Налаштування сенсорів для dnd-kit
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  // 4. Підготовка карток колоди з прикріпленою функцією видалення
  const deckWithRemove = activeDeck.map(card => ({
    ...card,
    onRemove: handleRemoveCard
  }));

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="app-wrapper">
        <header className="app-header">
          <h1>Clash Royale Deck Builder</h1>
        </header>

        <main className="main-container">
          <section className="left-panel">
            <CardPool 
              cards={availableCards} 
              filterType={filterType}
              setFilterType={setFilterType}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </section>

          <section className="right-panel">
            <DeckArea activeDeck={deckWithRemove} showToast={showToast} />
            <DeckStats activeDeck={activeDeck} />
          </section>
        </main>
      </div>
      
      {toast && (
        <div className="toast-portal" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </DndContext>
  );
}

export default App;
