
# Event Stream QA/QC Automation Tool

This project is designed to simplify the QA/QC process for live streams at large-scale events. Given that events can have over 20 streams happening simultaneously, manually monitoring each one for audio and video quality can be overwhelming. This tool automates the process of opening each stream on time, allowing you to efficiently test and monitor multiple streams without missing a beat. Whether you're handling event logistics or ensuring broadcast quality, this automation tool helps ensure that every stream meets your quality standards right when it goes live.

## Prerequisites

Before you begin, ensure you have:
- Node.js installed
- Google Chrome 

## Setup

Clone this repository locally:

```bash
git clone https://github.com/ibrahimGamal01/Chrome-extention--QA-for-streams
cd Chrome-extention--QA-for-streams
```

### Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

To run the backend server, use:

```bash
node api.js
```

For more detailed information about the backend setup, see [BACKEND.md](backend/BACKEND.md).

### Frontend (Chrome Extension) Setup

1. **Load the extension into Chrome:**
   - Open Google Chrome.
   - Navigate to `chrome://extensions/`.
   - Enable Developer Mode (toggle switch at the top-right).
   - Click on "Load unpacked" and select the `frontend` directory from your project folder.

2. **Using the Extension:**
   - Click on the extension icon in the Chrome toolbar.
   - The popup interface should allow interaction with the backend services.

### Scraper Setup

Navigate to the Scrapper directory, install dependencies, and run the script:

```bash
cd ../Scrapper
npm install
node basic-scrapper.js
```
### `basic-scrapper.js`

This script will illustrate the process of scrapping the streams to be stored/ used later. Used NodeJS `puppeteer` to retrieve the streams.



## Troubleshooting

Common issues:
- Make sure all dependencies are installed. Check the `package.json` in each directory for any additional dependencies.
- Verify that Chrome is up to date for compatibility with the extension APIs.


## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [ibrahimg01897@example.com](mailto:ibrahimg01897@example.com)

---