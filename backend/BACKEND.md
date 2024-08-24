## `api.js`

### Updated `BACKEND.md` Documentation

```markdown
# API Documentation

## Endpoints

### 1. `GET /meetings`

Retrieve all meetings with optional filtering.

#### Query Parameters:
- `date`: Filter by date (format: `YYYY-MM-DD`)
- `time`: Filter by time (format: `HH:mm - HH:mm`)
- `room`: Filter by room name

#### Example Request:
```http
GET /meetings?date=2024-08-23&room=Meeting Room 2
```

#### Example Response:
```json
[
  {
    "title": "Example Meeting",
    "link": "https://example.com",
    "date": "2024-08-23",
    "time": "10:00 - 11:00",
    "room": "Meeting Room 2",
    "access": "Open meeting"
  }
]
```

### 2. `GET /meetings/today`

Retrieve all meetings happening today.

#### Example Request:
```http
GET /meetings/today
```

#### Example Response:
```json
[
  {
    "title": "Example Meeting",
    "link": "https://asdasd.com",
    "date": "2024-08-23",
    "time": "10:00 - 11:00",
    "room": "Meeting Room 2",
    "access": "Open meeting"
  }
]
```

### 3. `GET /meetings/upcoming`

Retrieve all upcoming meetings within the next 3 days.

#### Example Request:
```http
GET /meetings/upcoming
```

#### Example Response:
```json
[
  {
    "title": "Upcoming Meeting",
    "link": "https://example.com",
    "date": "2024-08-25",
    "time": "14:00 - 15:00",
    "room": "Meeting Room 5",
    "access": "Limited access"
  }
]
```

### 4. `POST /scrape`

Run the `cop27-scrapper.js` script to scrape and update the meetings data.

#### Example Request:
```http
POST /scrape
```

#### Example Response:
```json
{
  "message": "Scraper executed successfully."
}
```

## Running the Server

To start the server, run:

```bash
node backend/api.js
```

The server will run on `http://localhost:3000` by default.
```

### Explanation:

- **/scrape Endpoint**: This new POST endpoint runs the `cop27-scrapper.js` script to update the meetings data. It uses Node.js's `child_process.exec` to execute the script.

- **GET /meetings/today & GET /meetings/upcoming Endpoints**: These endpoints help the QA team quickly access meetings happening today or in the upcoming 3 days.

- **GET /meetings Endpoint**: Extended to support filtering by date, time, and room.

This setup should provide the necessary functionality for the QA team and the Chrome extension to interact with the backend effectively.