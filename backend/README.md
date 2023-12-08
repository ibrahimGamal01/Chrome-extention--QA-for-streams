### Postman Documentation:

#### Base URL: `http://localhost:3000/api`

---

#### **Retrieve Data Endpoints**

##### Get All Links
- **Endpoint:** `GET /getLinks`
- **Description:** Retrieves all card data.
- **Response:** Array of card objects.

##### Get Meetings By Date
- **Endpoint:** `GET /getMeetingsByDate/:date`
- **Description:** Retrieves meetings based on a specific date.
- **Parameters:**
  - `date`: Date in the format specified (e.g., "05 Nov 2022").
- **Response:** Array of meeting objects filtered by the provided date.

##### Get Meetings By Time
- **Endpoint:** `GET /getMeetingsByTime/:startTime`
- http://localhost:3000/api/getMeetingsByDate/05-Nov-2022
- **Description:** Retrieves meetings based on a start time using regular expression.
- **Parameters:**
  - `startTime`: Start time string (e.g., "08:30").
- **Response:** Array of meeting objects filtered by the provided start time.

##### Get Meetings By Date and Time
- **Endpoint:** `GET /getMeetingsByDateTime/:date/:startTime`
- **Description:** Retrieves meetings based on both date and start time using regular expression.
- **Parameters:**
  - `date`: Date in the format specified (e.g., "05 Nov 2022").
  - `startTime`: Start time string (e.g., "08:30").
- **Response:** Array of meeting objects filtered by the provided date and start time.

##### Get Meetings By Room
- **Endpoint:** `GET /getMeetingsByRoom/:room`
- **Description:** Retrieves meetings based on a specific meeting room.
- **Parameters:**
  - `room`: Room name or identifier.
- **Response:** Array of meeting objects filtered by the provided room.

##### Get Limited Documents
- **Endpoint:** `GET /getLimitedDocuments/:limit`
- **Description:** Retrieves a limited number of documents with pagination.
- **Parameters:**
  - `limit`: Number of documents to retrieve.
- **Response:** Array of limited documents based on the specified limit.

---

#### **Update & Delete Endpoints**

##### Update Meeting
- **Endpoint:** `PUT /meetings/:id`
- **Description:** Updates a meeting by its ID.
- **Parameters:**
  - `id`: Meeting ID to update.
- **Request Body:** JSON object containing fields to update (title, link, date, time, room, access).
```
{
  "title": "Updated Title",
  "link": "http://updated-link.com",
  "date": "2023-12-15",
  "time": "09:00",
  "room": "Updated Room",
  "access": "Updated Access"
}
```
- **Response:** Updated meeting object or "Meeting not found" error message.

##### Delete Meeting By ID
- **Endpoint:** `DELETE /meetings/:id`
- **Description:** Deletes a meeting by its ID.
- **Parameters:**
  - `id`: Meeting ID to delete.
- **Response:** Success message or "Meeting not found" error message.

##### Delete All Meetings
- **Endpoint:** `DELETE /meetings`
- **Description:** Deletes all meetings.
- **Response:** Success message or "No meetings found" error message.

---

#### **Additional Functionalities**

##### Sort Documents
- **Endpoint:** `GET /sortDocuments/:field/:order`
- **Description:** Sorts documents in ascending or descending order by a specific field.
- **Parameters:**
  - `field`: Field name to sort by.
  - `order`: Sorting order ("asc" for ascending, "desc" for descending).
- **Response:** Array of sorted documents based on the specified field and order.

##### Count All Documents
- **Endpoint:** `GET /countDocuments`
- **Description:** Counts all documents in the collection.
- **Response:** Count of all documents.

##### Count Documents By Room
- **Endpoint:** `GET /countDocumentsByRoom/:room`
- **Description:** Counts documents with a specific condition (e.g., meetings with a certain room).
- **Parameters:**
  - `room`: Room name or identifier to count documents.
- **Response:** Count of documents based on the specified room.

---

#### **Error Handling**
- **404 Not Found:** Error message for undefined routes.
- **500 Internal Server Error:** Global error handling for unexpected errors.

---