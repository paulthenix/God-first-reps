import React from 'react';
import DailyRoutineTracker from '../components/habits/DailyRoutineTracker';
import JournalEditor from '../components/journal/JournalEditor';
import { useTheme } from '../context/ThemeContext';
import { Book } from 'lucide-react';

const Home: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="container mx-auto px-4 py-6">
      <DailyRoutineTracker />
      
      <div className="mt-8">
        <div className="mb-4 flex items-center">
          <Book className={`mr-2 h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
            Today's Journal
          </h2>
        </div>
        
        <div className={`p-5 rounded-lg border shadow-sm ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <JournalEditor />
        </div>
      </div>
    </div>
  );
};

export default Home;