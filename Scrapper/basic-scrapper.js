const puppeteer = require('puppeteer');

(async () => {
  // Launch Puppeteer and open the webpage
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Increase the navigation timeout to a larger value, e.g., 60000 ms (60 seconds)
  await page.setDefaultNavigationTimeout(90000);

  try {
    // await page.goto('https://unfccc.int/COP28/schedule?access=All&field_event_has_webcast_value=All&field_start_datetime=2023-12-01&field_end_datetime=2023-12-01&search=&field_event_datetime_value_1=2&start_time=00%3A00%3A00&end_time=23%3A59%3A59');
    await page.goto('https://unfccc.int/COP28/schedule');

    // Wait for the content to load
    await page.waitForSelector('.calendar-card');

    // Extract the data
    const cardData = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.calendar-card'));

      return cards.map(card => {
        const title = card.querySelector('.card-title span').textContent;
        const linkElement = card.querySelector('.card-title a');
        const link = linkElement ? linkElement.getAttribute('href') : '';
        const date = card.querySelector('.date-element').textContent;
        const time = card.querySelector('.card-time').textContent;
        const room = card.querySelector('.field--name-field-event-room').textContent;
        const access = card.querySelector('.field--name-field-event-access').textContent;

        return { title, link, date, time, room, access };
      });
    });

    // Print the extracted data
    cardData.forEach(card => {
      // Create a full link
      const fullLink = `https://unfccc.int${card.link}`;
      console.log('Title: ' + card.title);
      console.log('Link: ' + fullLink);
      console.log('Date: ' + card.date);
      console.log('Time: ' + card.time);
      console.log('Room: ' + card.room);
      console.log('Access: ' + card.access);
      console.log('\n');
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }

  // Close the browser
  await browser.close();
})();
