import React, { useState } from 'react';
import './ToggleAndStrategies.css';  // Import the CSS file

const ToggleAndStrategies = ({ dateArray, strategyArray }) => {
  const views = ['Bullish', 'Bearish', 'RangeBound', 'Volatile'];
  
  const [selectedView, setSelectedView] = useState('Bullish');
  const [selectedDate, setSelectedDate] = useState(dateArray[0]);

  // Function to calculate strategies for the selected date and view
  const getStrategiesForDate = (view, date) => {
    const selectedStrategyView = strategyArray.find(strategy => strategy.View === view);
    
    if (selectedStrategyView && selectedStrategyView.Value[date]) {
      const strategiesForDate = selectedStrategyView.Value[date];
      
      // Count the occurrence of each strategy
      const strategyCountMap = strategiesForDate.reduce((acc, strategy) => {
        acc[strategy] = (acc[strategy] || 0) + 1;
        return acc;
      }, {});
      
      // Convert strategyCountMap to an array of objects with name and count
      return Object.entries(strategyCountMap).map(([name, count]) => ({
        name,
        count
      }));
    }

    // Return an empty array if no strategies found for the selected date
    return [];
  };

  const strategies = getStrategiesForDate(selectedView, selectedDate);

  return (
    <div>
      {/* Toggle for Views */}
      <div className="toggle">
        {views.map((view) => (
          <button 
            key={view} 
            className={selectedView === view ? 'active' : ''} 
            onClick={() => setSelectedView(view)}>
            {view}
          </button>
        ))}
      </div>
      
      {/* Date Dropdown */}
      <div className="date-dropdown">
        <select 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)}>
          {dateArray.map((date) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
      </div>

      {/* Strategy Cards */}
      <div className="strategy-cards">
        {strategies.length > 0 ? (
          strategies.map((strategy, index) => (
            <div key={index} className="card">
              <div className="strategy-row">
                <p><b>{strategy.name}</b></p>
                <p style={{ color: 'grey' }}>&#8226;{strategy.count} {strategy.count > 1 ? 'Strategies' : 'Strategy'}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No strategies available for {selectedDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleAndStrategies;
