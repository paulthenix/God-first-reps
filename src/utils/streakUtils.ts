import { parseISO, differenceInDays } from 'date-fns';
import { HabitLog } from '../types';

export const calculateCurrentStreak = (logs: HabitLog[], habitId: string): number => {
  if (!logs || logs.length === 0) return 0;
  
  // Sort logs by date (most recent first)
  const sortedLogs = [...logs].sort((a, b) => 
    parseISO(b.date).getTime() - parseISO(a.date).getTime()
  );
  
  let streak = 0;
  let previousDate: Date | null = null;
  
  for (const log of sortedLogs) {
    // Check if this habit was completed on this day
    if (log.habits[habitId]) {
      const currentDate = parseISO(log.date);
      
      // First entry in streak
      if (previousDate === null) {
        streak = 1;
        previousDate = currentDate;
        continue;
      }
      
      // Check if dates are consecutive
      const daysBetween = differenceInDays(previousDate, currentDate);
      
      if (daysBetween === 1) {
        streak += 1;
        previousDate = currentDate;
      } else {
        // Streak broken
        break;
      }
    } else {
      // Habit not completed on this day - streak broken
      break;
    }
  }
  
  return streak;
};

export const calculateLongestStreak = (logs: HabitLog[], habitId: string): number => {
  if (!logs || logs.length === 0) return 0;
  
  // Sort logs by date (oldest first)
  const sortedLogs = [...logs].sort((a, b) => 
    parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );
  
  let currentStreak = 0;
  let longestStreak = 0;
  let previousDate: Date | null = null;
  
  for (const log of sortedLogs) {
    const currentDate = parseISO(log.date);
    
    // Check if this habit was completed on this day
    if (log.habits[habitId]) {
      // First entry in streak
      if (previousDate === null) {
        currentStreak = 1;
      } else {
        // Check if dates are consecutive
        const daysBetween = differenceInDays(currentDate, previousDate);
        
        if (daysBetween === 1) {
          currentStreak += 1;
        } else if (daysBetween > 1) {
          // Streak broken
          currentStreak = 1;
        }
      }
      
      // Update longest streak if current is longer
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
      
      previousDate = currentDate;
    } else {
      // Habit not completed - reset current streak
      currentStreak = 0;
      previousDate = currentDate;
    }
  }
  
  return longestStreak;
};