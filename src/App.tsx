import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { HabitsProvider } from './context/HabitsContext';
import { JournalProvider } from './context/JournalContext';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Stats from './pages/Stats';

function App() {
  const [activePage, setActivePage] = useState('home');
  
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'journal':
        return <Journal />;
      case 'stats':
        return <Stats />;
      default:
        return <Home />;
    }
  };
  
  return (
    <ThemeProvider>
      <HabitsProvider>
        <JournalProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-200">
            <Header activePage={activePage} setActivePage={setActivePage} />
            <main>
              {renderPage()}
            </main>
          </div>
        </JournalProvider>
      </HabitsProvider>
    </ThemeProvider>
  );
}

export default App;