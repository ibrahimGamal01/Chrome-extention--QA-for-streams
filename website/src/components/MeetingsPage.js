import React, { useState } from 'react';
import FilterSection from './FilterSection';
import '../styles/MeetingsPage.css';

function MeetingsPage() {
  const [filteredMeetings, setFilteredMeetings] = useState([]);

  const handleFilterChange = (filteredMeetings) => {
    console.log('Filtered meetings:', filteredMeetings);
    setFilteredMeetings(filteredMeetings);
  };

  return (
    <div className="meetings-page">
      <header className="meetings-header">
        <h1>Meetings</h1>
      </header>
      <main className="meetings-main">
        <aside className="meetings-sidebar">
          <FilterSection onFilterChange={handleFilterChange} />
        </aside>
        <section className="meetings-content">
          {filteredMeetings.length > 0 ? (
            <div className="meetings-list">
              {filteredMeetings.map((meeting, index) => (
                <div key={index} className="meeting-card">
                  <h2>{meeting.title}</h2>
                  <p>Date: {meeting.date}</p>
                  <p>Time: {meeting.time}</p>
                  <p>Room: {meeting.room}</p>
                  <a href={meeting.link} target="_blank" rel="noopener noreferrer">
                    Join Meeting
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-meetings">
              <p>No meetings found. Try adjusting your filters.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default MeetingsPage;