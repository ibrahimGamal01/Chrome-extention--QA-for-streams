const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
let meetings = require('./meetings');

const app = express();
app.use(cors());  // Enable CORS for all routes
app.use(express.json());

// GET /meetings: Retrieve all meetings, with optional filtering by date, time, and room
app.get('/meetings', (req, res) => {
  const { date, time, room } = req.query;

  let filteredMeetings = meetings;

  if (date) {
    filteredMeetings = filteredMeetings.filter(meeting => meeting.date === date);
  }

  if (time) {
    filteredMeetings = filteredMeetings.filter(meeting => meeting.time === time);
  }

  if (room) {
    filteredMeetings = filteredMeetings.filter(meeting => meeting.room === room);
  }

  res.json(filteredMeetings);
});

// GET /meetings/today: Retrieve meetings happening today
app.get('/meetings/today', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const todayMeetings = meetings.filter(meeting => meeting.date === today);

  res.json(todayMeetings);
});

// GET /meetings/upcoming: Retrieve upcoming meetings (next 3 days)
app.get('/meetings/upcoming', (req, res) => {
  const today = new Date();
  const upcomingMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    return meetingDate >= today && meetingDate <= new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
  });

  res.json(upcomingMeetings);
});


// Function to reload meetings data
const reloadMeetings = () => {
  delete require.cache[require.resolve('./meetings')];
  meetings = require('./meetings');
  console.log('Meetings data reloaded.');
};

// Watch the meetings.js file for changes
fs.watchFile(path.resolve(__dirname, 'meetings.js'), (curr, prev) => {
  console.log(`meetings.js file changed. Reloading data...`);
  reloadMeetings();
});


// POST /scrape: Run the cop27-scrapper.js script to update meetings data
app.post('/scrape', (req, res) => {
  exec('node cop-scrapper.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running scraper: ${error.message}`);
      return res.status(500).json({ error: 'Failed to run scraper.' });
    }
    if (stderr) {
      console.error(`Scraper stderr: ${stderr}`);
    }
    console.log(`Scraper output: ${stdout}`);
    res.json({ message: 'Scraper executed successfully.' });

    // Trigger a reload of meetings data after scraping
    reloadMeetings();
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
