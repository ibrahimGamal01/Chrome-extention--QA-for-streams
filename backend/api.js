const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


// Parse JSON bodies for POST/PUT requests
app.use(bodyParser.json());


// Define a schema for your data
const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  access: {
    type: String,
    required: true
  }
});

const CardModel = mongoose.model('Card', cardSchema);

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/cop27-testing', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

//! retrieve the data
app.get('/api/getLinks', async (req, res) => {
  try {
    const cardData = await CardModel.find();
    res.json(cardData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//retrieve meetings based on date
app.get('/api/getMeetingsByDate/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const meetings = await CardModel.find({ date });
    res.json(meetings);
  } catch (error) {
    console.error('Error fetching meetings by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// based on start time using regex
app.get('/api/getMeetingsByTime/:startTime', async (req, res) => {
  const { startTime } = req.params;
  try {
    const meetings = await CardModel.find({ time: { $regex: new RegExp(startTime) } });
    // const meetings = await CardModel.find({ time: { $regex: new RegExp(`^${startTime}`) } });
    res.json(meetings);
  } catch (error) {
    console.error('Error fetching meetings by time:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//  based on both date and time using regex
app.get('/api/getMeetingsByDateTime/:date/:startTime', async (req, res) => {
  const { date, startTime } = req.params;
  try {
    const meetings = await CardModel.find({
      date,
      time: { $regex: new RegExp(startTime, 'i') }
    });
    res.json(meetings);
  } catch (error) {
    console.error('Error fetching meetings by date and time:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//  based on meeting room
app.get('/api/getMeetingsByRoom/:room', async (req, res) => {
  const { room } = req.params;
  try {
    const meetings = await CardModel.find({ room });
    res.json(meetings);
  } catch (error) {
    console.error('Error fetching meetings by room:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve limited number of documents with pagination (e.g., first 5 documents)
app.get('/api/getLimitedDocuments/:limit', async (req, res) => {
  const { limit } = req.params;
  try {
    const limitedDocuments = await CardModel.find().limit(limit);
    res.json(limitedDocuments);
  } catch (error) {
    console.error('Error fetching limited documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//! Update Endpoint
// Update a meeting by its ID
app.put('/api/meetings/:id', async (req, res) => {
  const { id } = req.params;
  const { title, link, date, time, room, access } = req.body;

  try {
    const updatedMeeting = await CardModel.findByIdAndUpdate(id, {
      title,
      link,
      date,
      time,
      room,
      access
    }, { new: true });

    if (!updatedMeeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.json(updatedMeeting);
  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//! Delete Endpoints
// Delete a meeting by its ID
app.delete('/api/meetings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMeeting = await CardModel.findByIdAndDelete(id);

    if (!deletedMeeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error('Error deleting meeting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete all meetings
app.delete('/api/meetings', async (req, res) => {
  try {
    const deletedMeetings = await CardModel.deleteMany({});

    if (deletedMeetings.deletedCount === 0) {
      return res.status(404).json({ error: 'No meetings found' });
    }

    res.json({ message: 'All meetings deleted successfully' });
  } catch (error) {
    console.error('Error deleting meetings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//! Insert Endpoint
// Insert a new meeting
app.post('/api/meetings', async (req, res) => {
  const { title, link, date, time, room, access } = req.body;

  try {
    const newMeeting = await CardModel.create({
      title,
      link,
      date,
      time,
      room,
      access
    });

    res.status(201).json(newMeeting);
  } catch (error) {
    console.error('Error inserting new meeting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Count all documents in the collection
app.get('/api/countDocuments', async (req, res) => {
  try {
    const count = await CardModel.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Count documents with a specific condition (e.g., meetings with a certain room)
app.get('/api/countDocumentsByRoom/:room', async (req, res) => {
  const { room } = req.params;
  try {
    const count = await CardModel.countDocuments({ room });
    res.json({ count });
  } catch (error) {
    console.error('Error counting documents by room:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sort, Count 

// Sort documents in ascending or descending order by a specific field
app.get('/api/sortDocuments/:field/:order', async (req, res) => {
  const { field, order } = req.params;
  const sortOrder = order === 'asc' ? 1 : -1;

  try {
    const sortedDocuments = await CardModel.find().sort({ [field]: sortOrder });
    res.json(sortedDocuments);
  } catch (error) {
    console.error('Error sorting documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// Error handling middleware for handling 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
