document.addEventListener('DOMContentLoaded', () => {
    const todayCheckbox = document.getElementById('today-filter');
    const timeFilter = document.getElementById('time-filter');
    const dateFilter = document.getElementById('date-filter');
    const roomFilter = document.getElementById('room-filter');
    const filterTags = document.getElementById('filter-tags');
    const meetingTable = document.getElementById('meeting-table');

    let meetings = []; // This will hold the fetched meetings data
    let uniqueTimes = [];
    let uniqueDates = [];
    let uniqueRooms = [];
    let activeFilters = {}; // Object to hold active filters

    // Load filters from Chrome storage
    const loadFiltersFromChromeStorage = () => {
        chrome.storage.local.get(['filters'], (result) => {
            activeFilters = result.filters || {};

            Object.keys(activeFilters).forEach(filterType => {
                activeFilters[filterType].forEach(value => {
                    addFilterTag(filterType, value, false);
                });
            });
            applyFilters();
        });
    };

    // Save filters to Chrome storage
    const saveFiltersToChromeStorage = () => {
        chrome.storage.local.set({ filters: activeFilters });
    };

    // Fetch meetings from the backend
    const fetchMeetings = async () => {
        try {
            const response = await fetch('http://localhost:3000/meetings');
            meetings = await response.json();

            // Extract unique times, dates, and rooms for autocomplete
            uniqueTimes = [...new Set(meetings.map(meeting => meeting.time))];
            uniqueDates = [...new Set(meetings.map(meeting => formatDate(meeting.date)))];
            uniqueRooms = [...new Set(meetings.map(meeting => meeting.room))];

            applyFilters();
        } catch (error) {
            console.error('Failed to fetch meetings:', error);
        }
    };

    // Display meetings in the table
    const displayMeetings = (meetingsToDisplay) => {
        meetingTable.innerHTML = ''; // Clear previous content

        if (meetingsToDisplay.length === 0) {
            meetingTable.innerHTML = '<p>No meetings found.</p>';
            return;
        }

        meetingsToDisplay.forEach(meeting => {
            const meetingCard = document.createElement('div');
            meetingCard.classList.add('meeting-card');
            meetingCard.innerHTML = `
                <strong>${meeting.title}</strong>
                <span>Date: ${formatDate(meeting.date)}</span>
                <span>Time: ${meeting.time}</span>
                <span>Room: ${meeting.room}</span>
            `;
            meetingCard.addEventListener('click', () => {
                window.open(meeting.link, '_blank');
            });

            meetingTable.appendChild(meetingCard);
        });
    };

    // Convert date format to DD-MM-YYYY
    const formatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    // Filter meetings by today's date
    const filterByToday = () => {
        if (todayCheckbox.checked) {
            const today = new Date().toISOString().split('T')[0];
            const formattedToday = formatDate(today);
            activeFilters.date = [formattedToday];
        } else {
            delete activeFilters.date;
        }
        applyFilters();
    };

    // Apply all active filters
    const applyFilters = () => {
        let filteredMeetings = meetings;

        Object.keys(activeFilters).forEach(filterType => {
            const filterValues = activeFilters[filterType];
            if (filterValues.length > 0) {
                filteredMeetings = filteredMeetings.filter(meeting => {
                    return filterValues.some(value => {
                        if (filterType === 'time') {
                            return meeting.time.includes(value);
                        } else if (filterType === 'date') {
                            return formatDate(meeting.date).includes(value);
                        } else if (filterType === 'room') {
                            return meeting.room.toLowerCase().includes(value.toLowerCase());
                        }
                    });
                });
            }
        });

        displayMeetings(filteredMeetings);
        saveFiltersToChromeStorage(); // Save active filters to Chrome storage after applying
    };

    // Add filter to active filters and display as a tag
    const addFilterTag = (key, value, shouldApplyFilters = true) => {
        if (!activeFilters[key]) {
            activeFilters[key] = [];
        }

        if (!activeFilters[key].includes(value)) {
            activeFilters[key].push(value);

            const tag = document.createElement('div');
            tag.classList.add('filter-tag');
            tag.innerHTML = `<span>${key}: ${value}</span><button>X</button>`;

            tag.querySelector('button').addEventListener('click', () => {
                const index = activeFilters[key].indexOf(value);
                if (index !== -1) {
                    activeFilters[key].splice(index, 1);
                }
                filterTags.removeChild(tag);
                applyFilters();
            });

            filterTags.appendChild(tag);
            if (shouldApplyFilters) {
                applyFilters();
            }
        }
    };

    // Handle filter input with "Enter" key to add as a tag
    const handleFilterInput = (inputElement, key) => {
        inputElement.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && this.value) {
                addFilterTag(key, this.value);
                this.value = '';
            }
        });

        inputElement.addEventListener('blur', function () {
            if (this.value) {
                addFilterTag(key, this.value);
                this.value = '';
            }
        });
    };

    // Add autocomplete functionality
    const addAutocomplete = (inputElement, dataList) => {
        let currentFocus;

        inputElement.addEventListener('input', function () {
            let autocompleteDiv, optionDiv, i, val = this.value;

            closeAllLists();
            if (!val) { return false; }

            currentFocus = -1;
            autocompleteDiv = document.createElement('DIV');
            autocompleteDiv.setAttribute('id', this.id + '-autocomplete-list');
            autocompleteDiv.setAttribute('class', 'autocomplete-items');
            this.parentNode.appendChild(autocompleteDiv);

            for (i = 0; i < dataList.length; i++) {
                if (dataList[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                    optionDiv = document.createElement('DIV');
                    optionDiv.innerHTML = `<strong>${dataList[i].substr(0, val.length)}</strong>`;
                    optionDiv.innerHTML += dataList[i].substr(val.length);
                    optionDiv.innerHTML += `<input type='hidden' value='${dataList[i]}'>`;

                    optionDiv.addEventListener('click', function () {
                        inputElement.value = this.getElementsByTagName('input')[0].value;
                        addFilterTag(inputElement.id.replace('-filter', ''), inputElement.value);
                        closeAllLists();
                    });

                    autocompleteDiv.appendChild(optionDiv);
                }
            }
        });

        inputElement.addEventListener('keydown', function (e) {
            let x = document.getElementById(this.id + '-autocomplete-list');
            if (x) x = x.getElementsByTagName('div');

            if (e.keyCode === 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode === 38) {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode === 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });

        const addActive = (x) => {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add('autocomplete-active');
        };

        const removeActive = (x) => {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove('autocomplete-active');
            }
        };

        const closeAllLists = (elmnt) => {
            const x = document.getElementsByClassName('autocomplete-items');
            for (let i = 0; i < x.length; i++) {
                if (elmnt !== x[i] && elmnt !== inputElement) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        };

        document.addEventListener('click', (e) => {
            closeAllLists(e.target);
        });
    };

    todayCheckbox.addEventListener('change', filterByToday);
    handleFilterInput(timeFilter, 'time');
    handleFilterInput(dateFilter, 'date');
    handleFilterInput(roomFilter, 'room');

    addAutocomplete(timeFilter, uniqueTimes);
    addAutocomplete(dateFilter, uniqueDates);
    addAutocomplete(roomFilter, uniqueRooms);

    fetchMeetings();
    loadFiltersFromChromeStorage();
    filterByToday(); // Apply the today's meetings filter initially
});

