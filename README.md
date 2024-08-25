# COP Meeting Scheduler

## Table of Contents
- [COP Meeting Scheduler](#cop-meeting-scheduler)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Component Breakdown](#component-breakdown)
    - [MeetingsPage](#meetingspage)
    - [FilterSection](#filtersection)
  - [Styling](#styling)
  - [Future Enhancements](#future-enhancements)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

The COP Meeting Scheduler is a web application designed to help users manage and filter meetings for the Conference of the Parties (COP) events. It provides an intuitive interface for viewing meeting details and applying various filters to find specific meetings quickly.

## Features

- View a list of COP meetings with details such as title, date, time, and room
- Filter meetings by:
  - Date
  - Start time
  - End time
  - Room
- Apply multiple filters simultaneously
- View today's meetings with a single click
- Responsive design for desktop and mobile devices

## Technologies Used

- Frontend:
  - React.js
  - CSS3 with CSS Modules
- Backend:
  - Node.js
  - Express.js
- Database:
  - JSON file (for simplicity, can be replaced with a proper database)

## Project Structure

```
cop-meeting-scheduler/
│
├── backend/
│   ├── server.js
│   └── meetings.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── FilterSection.js
│   │   │   └── MeetingsPage.js
│   │   ├── styles/
│   │   │   ├── FilterSection.css
│   │   │   └── MeetingsPage.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/cop-meeting-scheduler.git
   cd cop-meeting-scheduler
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

## Usage

1. Start the backend server:
   ```
   cd backend
   node server.js
   ```
   The server will run on `http://localhost:3000`.

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```
   The application will be available at `http://localhost:3001`.

3. Open your browser and navigate to `http://localhost:3001` to use the application.

## API Endpoints

The backend provides the following API endpoint:

- `GET /meetings`: Returns a list of all meetings

## Component Breakdown

### MeetingsPage

The main component that renders the entire page, including the header, filter section, and meeting cards.

Props: None

State:
- `filteredMeetings`: Array of meetings after applying filters
- `activeFilters`: Object containing current active filters

### FilterSection

Handles the rendering and logic for all filter inputs.

Props:
- `onFilterChange`: Function to update filtered meetings in the parent component

State:
- `activeFilters`: Object containing current active filters
- `meetings`: Array of all meetings
- `uniqueOptions`: Object containing unique options for each filter type

## Styling

The project uses CSS Modules for styling. The main style files are:

- `MeetingsPage.css`: Styles for the overall page layout and meeting cards
- `FilterSection.css`: Styles for the filter inputs and active filter tags

The design uses a modern, clean aesthetic with a responsive layout that adapts to different screen sizes.

## Future Enhancements

1. Implement user authentication and personalized meeting schedules
2. Add a calendar view for better visualization of meeting timelines
3. Integrate with a backend database for real-time updates
4. Implement search functionality for meeting titles and descriptions
5. Add the ability to export filtered meetings to various formats (e.g., PDF, CSV)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.