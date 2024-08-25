import React from 'react';

function MeetingTable({ meetings }) {
  return (
    <div id="meeting-table">
      {meetings.length === 0 ? (
        <p>No meetings found.</p>
      ) : (
        meetings.map((meeting, index) => (
          <div key={index} className="meeting-card" onClick={() => window.open(meeting.link, '_blank')}>
            <strong>{meeting.title}</strong>
            <span>Date: {meeting.date}</span>
            <span>Time: {meeting.time}</span>
            <span>Room: {meeting.room}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default MeetingTable;