import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Habit, HabitLog } from '../types';
import { getTodayISODate } from '../utils/dateUtils';
import { calculateCurrentStreak, calculateLongestStreak } from '../utils/streakUtils';

// Initial habits
const DEFAULT_HABITS: Habit[] = [
  {
    id: 'prayer',
    name: 'Talk to God',
    description: 'Spend 2 minutes in prayer',
    icon: 'message-circle',
    completed: false,
    currentStreak: 0,
    longestStreak: 0,
  },
  {
    id: 'bible',
    name: 'Bible Reading',
    description: 'Read 1 chapter',
    icon: 'book-open',
    completed: false,
    currentStreak: 0,
    longestStreak: 0,
  },
  {
    id: 'journal',
    name: 'Journal a Thought',
    description: 'Write down what\'s on your heart',
    icon: 'pen',
    completed: false,
    currentStreak: 0,
    longestStreak: 0,
  },
  {
    id: 'quiet',
    name: 'Quiet Time',
    description: '3-5 minutes of stillness',
    icon: 'timer',
    completed: false,
    currentStreak: 0,
    longestStreak: 0,
  },
];

type HabitsContextType = {
  habits: Habit[];
  logs: HabitLog[];
  toggleHabit: (id: string) => void;
  backfillHabit: (id: string, date: string, completed: boolean) => void;
  getHabitLogForDate: (date: string) => HabitLog | undefined;
  resetHabitsForToday: () => void;
};

export const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

type HabitsProviderProps = {
  children: ReactNode;
};

export const HabitsProvider: React.FC<HabitsProviderProps> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : DEFAULT_HABITS;
  });

  const [logs, setLogs] = useState<HabitLog[]>(() => {
    const savedLogs = localStorage.getItem('habitLogs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  // Save habits and logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('habitLogs', JSON.stringify(logs));
  }, [logs]);

  // Update streaks whenever logs change
  useEffect(() => {
    if (logs.length > 0) {
      setHabits(prevHabits => 
        prevHabits.map(habit => ({
          ...habit,
          currentStreak: calculateCurrentStreak(logs, habit.id),
          longestStreak: calculateLongestStreak(logs, habit.id),
        }))
      );
    }
  }, [logs]);

  const getHabitLogForDate = (date: string): HabitLog | undefined => {
    return logs.find(log => log.date === date);
  };

  const updateLog = (date: string, habitId: string, completed: boolean) => {
    const existingLogIndex = logs.findIndex(log => log.date === date);
    
    if (existingLogIndex >= 0) {
      // Update existing log
      const updatedLogs = [...logs];
      updatedLogs[existingLogIndex] = {
        ...updatedLogs[existingLogIndex],
        habits: {
          ...updatedLogs[existingLogIndex].habits,
          [habitId]: completed,
        },
      };
      setLogs(updatedLogs);
    } else {
      // Create new log
      const newLog: HabitLog = {
        date,
        habits: {
          [habitId]: completed,
        },
      };
      setLogs([...logs, newLog]);
    }
  };

  const toggleHabit = (id: string) => {
    const today = getTodayISODate();
    
    // Update habit's completed status for today
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
    
    // Find the habit to get its current completion status
    const habit = habits.find(h => h.id === id);
    if (habit) {
      // Update log with the new status (toggled)
      updateLog(today, id, !habit.completed);
    }
  };

  const backfillHabit = (id: string, date: string, completed: boolean) => {
    // Update log for the specified date
    updateLog(date, id, completed);
  };

  const resetHabitsForToday = () => {
    setHabits(prevHabits => 
      prevHabits.map(habit => ({ ...habit, completed: false }))
    );
    
    // Remove today's log if it exists
    const today = getTodayISODate();
    setLogs(prevLogs => prevLogs.filter(log => log.date !== today));
  };

  // Initialize today's habits based on logs
  useEffect(() => {
    const today = getTodayISODate();
    const todayLog = logs.find(log => log.date === today);
    
    if (todayLog) {
      setHabits(prevHabits => 
        prevHabits.map(habit => ({
          ...habit,
          completed: todayLog.habits[habit.id] || false,
        }))
      );
    } else {
      // Reset completion status for a new day
      setHabits(prevHabits => 
        prevHabits.map(habit => ({ ...habit, completed: false }))
      );
    }
  }, []);

  return (
    <HabitsContext.Provider 
      value={{ 
        habits, 
        logs, 
        toggleHabit, 
        backfillHabit,
        getHabitLogForDate,
        resetHabitsForToday
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = (): HabitsContextType => {
  const context = React.useContext(HabitsContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
};