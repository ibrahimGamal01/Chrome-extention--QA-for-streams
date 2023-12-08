// popup.js

document.addEventListener('DOMContentLoaded', () => {
  const fetchButton = document.getElementById('fetchButton');
  const apiResponseElement = document.getElementById('api-response');

  fetchButton.addEventListener('click', () => {
    fetch('http://localhost:3000/api/getLinks')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const linksArray = data;

          // Clear previous content before displaying new data
          apiResponseElement.innerHTML = '';

          if (linksArray.length > 0) {
            const container = document.createElement('div');
            container.classList.add('links-container');

            linksArray.forEach(link => {
              const linkDiv = document.createElement('div');
              linkDiv.classList.add('link-item');

              const roomLink = createLinkElement(`Room: ${link.room}`, link.link);
              const timeLink = createLinkElement(`Time: ${link.time}`, link.link);
              const dateLink = createLinkElement(`Date: ${link.date}`, link.link);
              const titleLink = createLinkElement(`Title: ${link.title}`, link.link);

              linkDiv.appendChild(roomLink);
              linkDiv.appendChild(timeLink);
              linkDiv.appendChild(dateLink);
              linkDiv.appendChild(titleLink);

              container.appendChild(linkDiv);
            });

            apiResponseElement.appendChild(container);
          } else {
            apiResponseElement.textContent = 'No links available.';
          }
        } else {
          apiResponseElement.textContent = 'API response does not contain links.';
        }
      })
      .catch(error => {
        console.error('Fetch error:', error.message);
        apiResponseElement.textContent = 'Error fetching data. Please try again.';
      });
  });

  function createLinkElement(text, href) {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = `https://unfccc.int${href}`;
    link.target = '_blank'; // Open link in a new tab
    return link;
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const apiResponseElement = document.getElementById('api-response');

  // Function to handle fetching data based on different criteria
  const fetchMeetings = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      
      // Display the fetched data in the response element
      apiResponseElement.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Fetch error:', error.message);
      apiResponseElement.textContent = 'Error fetching data. Please try again.';
    }
  };

  // Event listeners for fetching data based on different criteria
  document.getElementById('fetchLinks').addEventListener('click', () => fetchMeetings('getLinks'));
  document.getElementById('fetchMeetingsByDate').addEventListener('click', () => {
    const date = prompt('Enter date (e.g., 05 Nov 2022):');
    if (date) {
      fetchMeetings(`getMeetingsByDate/${date}`);
    }
  });
  document.getElementById('fetchMeetingsByTime').addEventListener('click', () => {
    const startTime = prompt('Enter start time (e.g., 08:30):');
    if (startTime) {
      fetchMeetings(`getMeetingsByTime/${startTime}`);
    }
  });
  document.getElementById('fetchMeetingsByDateTime').addEventListener('click', () => {
    const date = prompt('Enter date (e.g., 05 Nov 2022):');
    const startTime = prompt('Enter start time (e.g., 08:30):');
    if (date && startTime) {
      fetchMeetings(`getMeetingsByDateTime/${date}/${startTime}`);
    }
  });
});
