import React from 'react';
import { useTheme } from '../../context/ThemeContext';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const { theme } = useTheme();
  
  const getBgColor = () => {
    if (theme === 'dark') {
      switch (color) {
        case 'blue': return 'bg-blue-900/30';
        case 'green': return 'bg-green-900/30';
        case 'purple': return 'bg-purple-900/30';
        case 'orange': return 'bg-orange-900/30';
        default: return 'bg-slate-800';
      }
    } else {
      switch (color) {
        case 'blue': return 'bg-blue-50';
        case 'green': return 'bg-green-50';
        case 'purple': return 'bg-purple-50';
        case 'orange': return 'bg-orange-50';
        default: return 'bg-slate-50';
      }
    }
  };
  
  const getIconColor = () => {
    if (theme === 'dark') {
      switch (color) {
        case 'blue': return 'text-blue-400';
        case 'green': return 'text-green-400';
        case 'purple': return 'text-purple-400';
        case 'orange': return 'text-orange-400';
        default: return 'text-slate-400';
      }
    } else {
      switch (color) {
        case 'blue': return 'text-blue-600';
        case 'green': return 'text-green-600';
        case 'purple': return 'text-purple-600';
        case 'orange': return 'text-orange-600';
        default: return 'text-slate-600';
      }
    }
  };
  
  const getTextColor = () => {
    if (theme === 'dark') {
      switch (color) {
        case 'blue': return 'text-blue-300';
        case 'green': return 'text-green-300';
        case 'purple': return 'text-purple-300';
        case 'orange': return 'text-orange-300';
        default: return 'text-slate-300';
      }
    } else {
      switch (color) {
        case 'blue': return 'text-blue-800';
        case 'green': return 'text-green-800';
        case 'purple': return 'text-purple-800';
        case 'orange': return 'text-orange-800';
        default: return 'text-slate-800';
      }
    }
  };
  
  return (
    <div className={`p-5 rounded-lg border shadow-sm transition-colors ${
      theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
    } ${getBgColor()}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-sm font-medium ${getTextColor()}`}>{title}</span>
        <div className={`p-2 rounded-full ${
          theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/80'
        } ${getIconColor()}`}>
          {icon}
        </div>
      </div>
      <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
        {value}
      </div>
    </div>
  );
};

export default StatCard;