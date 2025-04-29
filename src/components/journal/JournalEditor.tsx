import React, { useState, useEffect } from 'react';
import { useJournal } from '../../context/JournalContext';
import { getTodayISODate } from '../../utils/dateUtils';
import { useTheme } from '../../context/ThemeContext';
import { Save } from 'lucide-react';

type JournalEditorProps = {
  selectedDate?: string;
  onSave?: () => void;
};

const JournalEditor: React.FC<JournalEditorProps> = ({ 
  selectedDate = getTodayISODate(),
  onSave 
}) => {
  const { getEntryByDate, addEntry } = useJournal();
  const { theme } = useTheme();
  
  const existingEntry = getEntryByDate(selectedDate);
  
  const [title, setTitle] = useState(existingEntry?.title || '');
  const [content, setContent] = useState(existingEntry?.content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Update form when selectedDate changes
  useEffect(() => {
    const entry = getEntryByDate(selectedDate);
    setTitle(entry?.title || '');
    setContent(entry?.content || '');
  }, [selectedDate, getEntryByDate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() && !content.trim()) {
      return; // Don't save empty entries
    }
    
    setIsSaving(true);
    
    // Create or update entry
    addEntry({
      date: selectedDate,
      title: title.trim() || 'Untitled Entry',
      content,
    });
    
    // Show save confirmation
    setSaveMessage('Journal entry saved');
    setTimeout(() => setSaveMessage(''), 3000);
    
    setIsSaving(false);
    
    if (onSave) {
      onSave();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4 relative">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry title (optional)"
          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
            theme === 'dark' 
              ? 'bg-slate-800 border-slate-700 text-white focus:ring-blue-600' 
              : 'bg-white border-slate-300 text-slate-800 focus:ring-blue-500'
          }`}
        />
      </div>
      
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your heart today?"
          rows={8}
          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
            theme === 'dark' 
              ? 'bg-slate-800 border-slate-700 text-white focus:ring-blue-600 placeholder:text-slate-500' 
              : 'bg-white border-slate-300 text-slate-800 focus:ring-blue-500 placeholder:text-slate-400'
          }`}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isSaving}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Journal Entry'}
        </button>
        
        {saveMessage && (
          <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
            {saveMessage}
          </span>
        )}
      </div>
    </form>
  );
};

export default JournalEditor;