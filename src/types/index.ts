export type Habit = {
  id: string;
  name: string;
  description: string;
  icon: string;
  completed: boolean;
  currentStreak: number;
  longestStreak: number;
};

export type HabitLog = {
  date: string; // ISO string format
  habits: Record<string, boolean>;
};

export type JournalEntry = {
  id: string;
  date: string; // ISO string format
  title: string;
  content: string;
  tags?: string[];
};

export type WeeklySummary = {
  daysCompleted: number;
  daysMissed: number;
  averageWordCount: number;
  totalCompletedHabits: number;
};

export type Theme = 'light' | 'dark';