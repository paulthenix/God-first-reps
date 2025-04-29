import React, { useState } from 'react';
import JournalList from '../components/journal/JournalList';
import JournalEditor from '../components/journal/JournalEditor';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const Journal: React.FC = () => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  const handleSelectEntry = (date: string) => {
    setSelectedDate(date);
  };
  
  const handleBack = () => {
    setSelectedDate(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      {selectedDate ? (
        <div>
          <button 
            onClick={handleBack}
            className={`flex items-center mb-4 px-3 py-1.5 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'text-slate-300 hover:bg-slate-800' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Journal List
          </button>
          
          <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
            {formatDate(selectedDate)}
          </h2>
          
          <div className={`p-5 rounded-lg border shadow-sm ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <JournalEditor 
              selectedDate={selectedDate} 
              onSave={handleBack}
            />
          </div>
        </div>
      ) : (
        <div>
          <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
            Your Spiritual Journal
          </h2>
          <JournalList onSelectEntry={handleSelectEntry} />
        </div>
      )}
    </div>
  );
};

export default Journal;