const puppeteer = require('puppeteer');

(async () => {
  // Function to handle retrying
  const retry = async (fn, retries = 3, delay = 1000) => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        console.error('An error occurred. Retrying...', error);
        await new Promise(resolve => setTimeout(resolve, delay));
        return await retry(fn, retries - 1, delay);
      } else {
        throw new Error('Max retries exceeded.');
      }
    }
  };

  // Launch Puppeteer and open the webpage
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // navigation timeout 90000 ms (900 seconds)
  await page.setDefaultNavigationTimeout(90000);

  try {
    await retry(async () => {
      await page.goto('https://unfccc.int/COP27/schedule');

      // Wait for the content to load
      await page.waitForSelector('.calendar-card');
    });

    // Function to click "Load More" button and wait for 30 seconds
    const clickAndWaitFor30Seconds = async () => {
      const loadMoreButton = await page.$('a.button[title="Load more items"]');
      if (loadMoreButton) {
        await loadMoreButton.click();
        await page.waitForTimeout(30000); // Wait for 30 seconds
      }
    };

    // Click "Load More" button and wait for 30 seconds multiple times
    for (let i = 0; i < 5; i++) {
      await retry(clickAndWaitFor30Seconds);
    }

    // Extract the data after clicking "Load More"
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
  } finally {
    // Close the browser
    await browser.close();
  }
})();
