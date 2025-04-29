import React from 'react';
import { Check, BookOpen, MessageCircle, Pen, Timer } from 'lucide-react';
import { Habit } from '../../types';
import { useTheme } from '../../context/ThemeContext';

type HabitCardProps = {
  habit: Habit;
  onToggle: () => void;
};

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle }) => {
  const { theme } = useTheme();
  
  const getIcon = () => {
    switch (habit.icon) {
      case 'book-open':
        return <BookOpen className="w-5 h-5" />;
      case 'message-circle':
        return <MessageCircle className="w-5 h-5" />;
      case 'pen':
        return <Pen className="w-5 h-5" />;
      case 'timer':
        return <Timer className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`p-4 rounded-lg shadow-sm transition-all duration-300 transform hover:translate-y-[-2px] ${
        habit.completed 
          ? `${theme === 'dark' ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'} border` 
          : `${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${
            habit.completed 
              ? `${theme === 'dark' ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-700'}` 
              : `${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`
          }`}>
            {getIcon()}
          </div>
          <div>
            <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{habit.name}</h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{habit.description}</p>
          </div>
        </div>
        
        <button 
          onClick={onToggle}
          className={`h-7 w-7 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            habit.completed 
              ? `bg-green-600 text-white ${theme === 'dark' ? 'focus:ring-green-800' : 'focus:ring-green-500'}` 
              : `border-2 ${theme === 'dark' ? 'border-slate-600 focus:ring-slate-800' : 'border-slate-300 focus:ring-slate-500'}`
          }`}
          aria-label={habit.completed ? `Mark ${habit.name} as incomplete` : `Mark ${habit.name} as complete`}
        >
          {habit.completed && <Check className="h-4 w-4" />}
        </button>
      </div>
      
      <div className="mt-3 flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <span className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Current streak:
          </span>
          <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
            {habit.currentStreak} day{habit.currentStreak !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <span className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Best:
          </span>
          <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
            {habit.longestStreak} day{habit.longestStreak !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;