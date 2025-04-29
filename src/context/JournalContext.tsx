import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { JournalEntry } from '../types';
import { getTodayISODate } from '../utils/dateUtils';

type JournalContextType = {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  updateEntry: (id: string, updates: Partial<Omit<JournalEntry, 'id'>>) => void;
  deleteEntry: (id: string) => void;
  getEntryByDate: (date: string) => JournalEntry | undefined;
  getEntriesByDateRange: (startDate: string, endDate: string) => JournalEntry[];
  getTodaysEntry: () => JournalEntry | undefined;
};

export const JournalContext = createContext<JournalContextType | undefined>(undefined);

type JournalProviderProps = {
  children: ReactNode;
};

export const JournalProvider: React.FC<JournalProviderProps> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    
    // Check if an entry for this date already exists
    const existingEntryIndex = entries.findIndex(e => e.date === entry.date);
    
    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = {
        ...updatedEntries[existingEntryIndex],
        title: entry.title,
        content: entry.content,
        tags: entry.tags,
      };
      setEntries(updatedEntries);
    } else {
      // Add new entry
      setEntries([...entries, newEntry]);
    }
  };

  const updateEntry = (id: string, updates: Partial<Omit<JournalEntry, 'id'>>) => {
    setEntries(prevEntries => 
      prevEntries.map(entry => 
        entry.id === id ? { ...entry, ...updates } : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  const getEntryByDate = (date: string): JournalEntry | undefined => {
    return entries.find(entry => entry.date === date);
  };

  const getEntriesByDateRange = (startDate: string, endDate: string): JournalEntry[] => {
    return entries.filter(entry => entry.date >= startDate && entry.date <= endDate);
  };

  const getTodaysEntry = (): JournalEntry | undefined => {
    const today = getTodayISODate();
    return entries.find(entry => entry.date === today);
  };

  return (
    <JournalContext.Provider 
      value={{ 
        entries, 
        addEntry, 
        updateEntry, 
        deleteEntry,
        getEntryByDate,
        getEntriesByDateRange,
        getTodaysEntry
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = (): JournalContextType => {
  const context = React.useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};