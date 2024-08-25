import React, { useState, useEffect, useCallback } from 'react';
import '../styles/FilterSection.css';

function FilterSection({ onFilterChange }) {
  const [todayFilter, setTodayFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [meetings, setMeetings] = useState([]);
  const [uniqueOptions, setUniqueOptions] = useState({
    startTime: [],
    endTime: [],
    date: [],
    room: []
  });

  // Fetch meetings from the backend
  const fetchMeetings = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/meetings');
      const data = await response.json();
      setMeetings(data);

      // Extract unique options for autocomplete
      const options = {
        startTime: [...new Set(data.map(meeting => meeting.time.split(' - ')[0]))],
        endTime: [...new Set(data.map(meeting => meeting.time.split(' - ')[1]))],
        date: [...new Set(data.map(meeting => meeting.date))],
        room: [...new Set(data.map(meeting => meeting.room))]
      };
      setUniqueOptions(options);

      // Apply initial filters
      applyFilters(data, activeFilters);
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
      onFilterChange([]); // Ensure empty array is passed when fetch fails
    }
  }, [activeFilters, onFilterChange]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  // Format date to match the data format (DD MMM YYYY)
  const formatDate = (date) => {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Apply filters
  const applyFilters = useCallback((meetings, filters) => {
    let filtered = meetings;

    Object.entries(filters).forEach(([filterType, filterValues]) => {
      if (filterValues.length > 0) {
        filtered = filtered.filter(meeting =>
          filterValues.some(value => {
            if (filterType === 'startTime') {
              return meeting.time.split(' - ')[0].toLowerCase().includes(value.toLowerCase());
            } else if (filterType === 'endTime') {
              return meeting.time.split(' - ')[1].toLowerCase().includes(value.toLowerCase());
            } else if (filterType === 'date') {
              return meeting.date.toLowerCase().includes(value.toLowerCase());
            } else if (filterType === 'room') {
              return meeting.room.toLowerCase().includes(value.toLowerCase());
            }
            return false;
          })
        );
      }
    });

    onFilterChange(filtered);
  }, [onFilterChange]);

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[filterType]) {
        newFilters[filterType] = [];
      }
      if (!newFilters[filterType].includes(value)) {
        newFilters[filterType] = [...newFilters[filterType], value];
      }
      applyFilters(meetings, newFilters);
      return newFilters;
    });
  };

  // Remove filter
  const removeFilter = (filterType, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      newFilters[filterType] = newFilters[filterType].filter(v => v !== value);
      if (newFilters[filterType].length === 0) {
        delete newFilters[filterType];
      }
      applyFilters(meetings, newFilters);
      return newFilters;
    });
  };

  // Handle today's meetings filter
  const handleTodayFilter = (e) => {
    setTodayFilter(e.target.checked);
    if (e.target.checked) {
      const today = formatDate(new Date());
      handleFilterChange('date', today);
    } else {
      removeFilter('date', formatDate(new Date()));
    }
  };

  // Render filter input
  const renderFilterInput = (filterType, placeholder) => (
    <div className="filter-group">
      <label htmlFor={`${filterType}-filter`}>Filter by {filterType.charAt(0).toUpperCase() + filterType.slice(1)}:</label>
      <input
        type="text"
        id={`${filterType}-filter`}
        list={`${filterType}-options`}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value) {
            handleFilterChange(filterType, e.target.value);
            e.target.value = '';
          }
        }}
      />
      <datalist id={`${filterType}-options`}>
        {uniqueOptions[filterType].map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
    </div>
  );

  return (
    <div className="filter-section">
      <h2>Filters</h2>
      <div className="filter-group">
        <label htmlFor="today-filter" className="checkbox-label">
          <input
            type="checkbox"
            id="today-filter"
            checked={todayFilter}
            onChange={handleTodayFilter}
          />
          <span>View Today's Meetings</span>
        </label>
      </div>

      {renderFilterInput('startTime', 'Enter start time (HH:MM)')}
      {renderFilterInput('endTime', 'Enter end time (HH:MM)')}
      {renderFilterInput('date', 'Enter date (DD MMM YYYY)')}
      {renderFilterInput('room', 'Enter room')}

      <div className="active-filters">
        <h3>Active Filters:</h3>
        {Object.entries(activeFilters).map(([key, values]) =>
          values.map((value, index) => (
            <div key={`${key}-${index}`} className="filter-tag">
              <span>{`${key}: ${value}`}</span>
              <button onClick={() => removeFilter(key, value)}>X</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FilterSection;