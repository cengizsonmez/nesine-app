import React from 'react';
import { Cart, Table } from './components';
import { MatchProvider } from './context/matchContext';
import './App.scss';

const AppContent: React.FC = () => {
  return (
    <div className="App">
      <Table />
      <Cart />
    </div>
  );
};

const App: React.FC = () => (
  <MatchProvider>
    <AppContent />
  </MatchProvider>
);

export default App;
