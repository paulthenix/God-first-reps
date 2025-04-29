import React, { useState } from 'react';
import { useHabits } from '../../context/HabitsContext';
import HabitCard from './HabitCard';
import { useTheme } from '../../context/ThemeContext';
import { Calendar, CheckCircle } from 'lucide-react';
import { getTodayISODate, formatDate } from '../../utils/dateUtils';

const DailyRoutineTracker: React.FC = () => {
  const { habits, toggleHabit, backfillHabit } = useHabits();
  const { theme } = useTheme();
  const [isBackfilling, setIsBackfilling] = useState(false);
  const [backfillDate, setBackfillDate] = useState(getTodayISODate());
  
  const today = getTodayISODate();
  const allCompleted = habits.every(habit => habit.completed);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackfillDate(e.target.value);
  };

  const toggleBackfillMode = () => {
    setIsBackfilling(!isBackfilling);
    // Reset to today when toggling
    setBackfillDate(today);
  };

  const handleBackfill = (habitId: string, completed: boolean) => {
    backfillHabit(habitId, backfillDate, completed);
  };

  return (
    <div className={`py-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Daily Spiritual Routine</h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Build your faith consistently, one day at a time
          </p>
        </div>

        <button
          onClick={toggleBackfillMode}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            isBackfilling
              ? `${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-800'}`
              : `${theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
          }`}
        >
          <Calendar className="h-4 w-4" />
          {isBackfilling ? 'Cancel Backfill' : 'Backfill Previous Day'}
        </button>
      </div>

      {isBackfilling && (
        <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
          <h3 className="text-lg font-medium mb-3">Backfill Mode: {formatDate(backfillDate)}</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-full sm:w-auto">
              <label 
                htmlFor="backfill-date" 
                className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}
              >
                Select Date
              </label>
              <input
                type="date"
                id="backfill-date"
                value={backfillDate}
                onChange={handleDateChange}
                max={today}
                className={`w-full sm:w-auto px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${
                  theme === 'dark' 
                    ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-600' 
                    : 'bg-white border-slate-300 text-slate-800 focus:ring-blue-500'
                }`}
              />
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mt-2 sm:mt-0`}>
              Toggle the habits you completed on this day
            </div>
          </div>
        </div>
      )}

      {allCompleted && !isBackfilling && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          theme === 'dark' ? 'bg-green-900/30 text-green-200' : 'bg-green-50 text-green-800'
        }`}>
          <CheckCircle className="h-5 w-5" />
          <p className="font-medium">Great job! You've completed all your spiritual reps for today.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map(habit => (
          <HabitCard 
            key={habit.id} 
            habit={habit} 
            onToggle={
              isBackfilling 
                ? () => handleBackfill(habit.id, !habit.completed)
                : () => toggleHabit(habit.id)
            } 
          />
        ))}
      </div>
    </div>
  );
};

export default DailyRoutineTracker;