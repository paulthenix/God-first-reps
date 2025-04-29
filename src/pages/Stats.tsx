import React from 'react';
import WeeklySummary from '../components/dashboard/WeeklySummary';

const Stats: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <WeeklySummary />
    </div>
  );
};

export default Stats;