import React from 'react';
import { Calendar, CheckCircle, XCircle, BarChart2, BookOpen } from 'lucide-react';
import { useHabits } from '../../context/HabitsContext';
import { useJournal } from '../../context/JournalContext';
import { useTheme } from '../../context/ThemeContext';
import StatCard from './StatCard';
import { getCurrentWeekDates, isCurrentWeek } from '../../utils/dateUtils';

const WeeklySummary: React.FC = () => {
  const { logs } = useHabits();
  const { entries } = useJournal();
  const { theme } = useTheme();
  
  // Get current week dates
  const currentWeekDates = getCurrentWeekDates();
  
  // Filter logs and entries for current week
  const weekLogs = logs.filter(log => isCurrentWeek(log.date));
  const weekEntries = entries.filter(entry => isCurrentWeek(entry.date));
  
  // Calculate days completed (at least one habit)
  const daysCompleted = weekLogs.length;
  
  // Calculate days missed
  const daysMissed = 7 - daysCompleted;
  
  // Calculate completion percentage
  const completionPercentage = (daysCompleted / 7) * 100;
  
  // Calculate total completed habits
  const totalCompletedHabits = weekLogs.reduce((total, log) => {
    return total + Object.values(log.habits).filter(Boolean).length;
  }, 0);
  
  // Calculate average word count for journal entries
  const totalWords = weekEntries.reduce((total, entry) => {
    return total + entry.content.split(/\s+/).filter(Boolean).length;
  }, 0);
  const averageWordCount = weekEntries.length > 0 
    ? Math.round(totalWords / weekEntries.length) 
    : 0;
  
  return (
    <div className="py-4">
      <div className="mb-6">
        <h2 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
          Weekly Progress
        </h2>
        <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          Your spiritual journey this week
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Days Completed" 
          value={`${daysCompleted}/7`} 
          icon={<CheckCircle className="h-5 w-5" />} 
          color="green" 
        />
        
        <StatCard 
          title="Days Missed" 
          value={daysMissed} 
          icon={<XCircle className="h-5 w-5" />} 
          color="orange" 
        />
        
        <StatCard 
          title="Habits Completed" 
          value={totalCompletedHabits} 
          icon={<BarChart2 className="h-5 w-5" />} 
          color="blue" 
        />
        
        <StatCard 
          title="Avg. Journal Words" 
          value={averageWordCount} 
          icon={<BookOpen className="h-5 w-5" />} 
          color="purple" 
        />
      </div>
      
      <div className={`p-5 rounded-lg border shadow-sm ${
        theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
          Weekly Overview
        </h3>
        
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-green-500 dark:bg-green-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        <div className="text-center mb-6">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            {completionPercentage.toFixed(0)}% complete this week
          </span>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {currentWeekDates.map((date, index) => {
            const dayLog = logs.find(log => log.date === date);
            const hasEntry = entries.some(entry => entry.date === date);
            const dayCompleted = dayLog && Object.values(dayLog.habits).some(Boolean);
            
            return (
              <div 
                key={date} 
                className={`p-2 rounded text-center ${
                  dayCompleted
                    ? `${theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-800'}`
                    : `${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`
                }`}
              >
                <div className="text-xs mb-1">{['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}</div>
                <div className="font-medium text-sm">{new Date(date).getDate()}</div>
                {hasEntry && (
                  <div className="mt-1">
                    <div className={`w-1.5 h-1.5 rounded-full mx-auto ${
                      theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
                    }`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;