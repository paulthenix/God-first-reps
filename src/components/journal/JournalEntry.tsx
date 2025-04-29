import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { JournalEntry as JournalEntryType } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { Calendar, Edit, Trash } from 'lucide-react';

type JournalEntryProps = {
  entry: JournalEntryType;
  onEdit?: () => void;
  onDelete?: () => void;
};

const JournalEntry: React.FC<JournalEntryProps> = ({ entry, onEdit, onDelete }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`p-5 rounded-lg shadow-sm border transition-colors ${
      theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className={`font-medium text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
            {entry.title}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <Calendar className={`h-3.5 w-3.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
            <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              {formatDate(entry.date)}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          {onEdit && (
            <button 
              onClick={onEdit}
              className={`p-1.5 rounded transition-colors ${
                theme === 'dark' 
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
              aria-label="Edit entry"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          
          {onDelete && (
            <button 
              onClick={onDelete}
              className={`p-1.5 rounded transition-colors ${
                theme === 'dark' 
                  ? 'text-slate-400 hover:text-red-400 hover:bg-red-900/30' 
                  : 'text-slate-500 hover:text-red-600 hover:bg-red-50'
              }`}
              aria-label="Delete entry"
            >
              <Trash className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
        <p className={`whitespace-pre-line ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          {entry.content}
        </p>
      </div>
    </div>
  );
};

export default JournalEntry;