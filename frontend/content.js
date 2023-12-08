fetch('http://localhost:3000/api/getLinks')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Data retrieved successfully:', data);
    // Process the retrieved data as needed
  })
  .catch(error => {
    console.error('Fetch error:', error.message);
    // Handle the error or show an appropriate message to the user
  });

// -------------------------------------

// document.getElementById('openLinksButton').addEventListener('click', function () {
//   // Define an array of link groups with associated names
//   var linkGroups = [
//     {
//       groupName: 'Streams of $Date, Time',
//       links: [
//         'https://unfccc.int/event/center-for-biological-diversity-3',
//         'https://unfccc.int/event/can-climate-action-network-press-briefing-on-cop27',
//         'https://unfccc.int/event/session-2-high-level-session-on-systems-change-and-climate-and-sustainability-innovations-part-1',
//       ],
//     },
//     {
//       groupName: 'Streams of $Date, Time',
//       links: [
//           'https://unfccc.int/event/center-for-biological-diversity-3',
//           'https://unfccc.int/event/technical-session-for-implementing-the-work-plan-activities-of-the-forum-on-the-impacts-of-the',
//           'https://unfccc.int/event/unitarian-universalist-service-committee-methane-removal-on-the-critical-path-to-avoiding-06-degrees',
//       ],
//     },
//   ];

//   // Loop through the link groups
//   linkGroups.forEach(function (group) {
//     // Create a new window for each group
//     chrome.windows.create({ focused: true }, function (window) {
//       var windowId = window.id;

//       // Loop through the links in the group and open each one in a new tab within the window
//       group.links.forEach(function (link) {
//         chrome.tabs.create({ url: link, windowId: windowId });
//       });

//       // Group the tabs in the window
//       chrome.tabs.query({ windowId: windowId }, function (tabs) {
//         var tabIds = tabs.map(tab => tab.id);
//         chrome.tabs.group({ tabIds: tabIds });
//       });

//       // Set the window's title to the group name
//       chrome.windows.update(windowId, { title: group.groupName });
//     });
//   });
// });