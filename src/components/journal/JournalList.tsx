import React, { useState } from 'react';
import { useJournal } from '../../context/JournalContext';
import JournalEntry from './JournalEntry';
import { useTheme } from '../../context/ThemeContext';
import { Calendar, List, Search } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

type JournalListProps = {
  onSelectEntry: (date: string) => void;
};

const JournalList: React.FC<JournalListProps> = ({ onSelectEntry }) => {
  const { entries, deleteEntry } = useJournal();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Filter entries based on search term
  const filteredEntries = sortedEntries.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      deleteEntry(id);
    }
  };
  
  return (
    <div>
      <div className="mb-4">
        <div className={`relative flex items-center`}>
          <Search className={`absolute left-3 h-5 w-5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search journal entries..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
              theme === 'dark' 
                ? 'bg-slate-800 border-slate-700 text-white focus:ring-blue-600' 
                : 'bg-white border-slate-300 text-slate-800 focus:ring-blue-500'
            }`}
          />
        </div>
      </div>
      
      {filteredEntries.length === 0 ? (
        <div className={`p-8 rounded-lg border text-center ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          {searchTerm ? (
            <>
              <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium mb-1">No matching entries found</p>
              <p>Try a different search term</p>
            </>
          ) : (
            <>
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium mb-1">No journal entries yet</p>
              <p>Your spiritual journey will be recorded here</p>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-4">
          <List className={`h-5 w-5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
          <span className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>
      )}
      
      <div className="space-y-4">
        {filteredEntries.map(entry => (
          <div key={entry.id}>
            <JournalEntry 
              entry={entry} 
              onEdit={() => onSelectEntry(entry.date)} 
              onDelete={() => handleDelete(entry.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalList;