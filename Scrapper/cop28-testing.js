// const puppeteer = require('puppeteer');
// const mongoose = require('mongoose');

// // Define a schema for your data
// const cardSchema = new mongoose.Schema({
//   title: String,
//   link: String,
//   date: String,
//   time: String,
//   room: String,
//   access: String,
// });

// const CardModel = mongoose.model('Card', cardSchema);

// (async () => {

//   //! Connect to your MongoDB database 
//                                       //~streaming-test
//   await mongoose.connect('mongodb://127.0.0.1:27017/cop28-testing', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });  

//   //& Scrapper
//   // Launch Puppeteer and open the webpage
//   const browser = await puppeteer.launch({ headless: 'new' });
//   const page = await browser.newPage();

//   // navigation timeout 90000 ms (90 seconds)
//   await page.setDefaultNavigationTimeout(90000);

//   try {
//     await page.goto('https://unfccc.int/COP27/schedule');

//     // Wait for the content to load
//     await page.waitForSelector('.calendar-card');

//     //^ Extract the data
//     const cardData = await page.evaluate(() => {
//       const cards = Array.from(document.querySelectorAll('.calendar-card'));

//       return cards.map(card => {
//         const title = card.querySelector('.card-title span').textContent;
//         const linkElement = card.querySelector('.card-title a');
//         const link = linkElement ? linkElement.getAttribute('href') : '';
//         const date = card.querySelector('.date-element').textContent;
//         const time = card.querySelector('.card-time').textContent;
//         const room = card.querySelector('.field--name-field-event-room').textContent;
//         const access = card.querySelector('.field--name-field-event-access').textContent;

//         return { title, link, date, time, room, access };
//       });
//     });

//     //^ Save the extracted data to MongoDB
//     for (const card of cardData) {
//       await CardModel.create(card);
//     }

//     // Print the extracted data (optional)
//     cardData.forEach(card => {
//       // Create a full link
//       const fullLink = `https://unfccc.int${card.link}`;
//       console.log('Title: ' + card.title);
//       console.log('Link: ' + fullLink);
//       console.log('Date: ' + card.date);
//       console.log('Time: ' + card.time);
//       console.log('Room: ' + card.room);
//       console.log('Access: ' + card.access);
//       console.log('\n');
//     });
//   } catch (error) {
//     console.error('An error occurred:', error);
//   } finally {
//     // Close the browser and MongoDB connection
//     await browser.close();
//     await mongoose.disconnect();
//   }
// })();

//! **************************************************************

// const puppeteer = require('puppeteer');

// (async () => {
//   // Launch Puppeteer and open the webpage
//   const browser = await puppeteer.launch({ headless: 'new' });
//   const page = await browser.newPage();

//   // navigation timeout 90000 ms (90 seconds)
//   await page.setDefaultNavigationTimeout(90000);

//   try {
//     await page.goto('https://unfccc.int/COP27/schedule');

//     // Wait for the content to load
//     await page.waitForSelector('.calendar-card');

//     // Extract the data
//     const cardData = await page.evaluate(() => {
//       const cards = Array.from(document.querySelectorAll('.calendar-card'));

//       return cards.map(card => {
//         const title = card.querySelector('.card-title span').textContent;
//         const linkElement = card.querySelector('.card-title a');
//         const link = linkElement ? linkElement.getAttribute('href') : '';
//         const date = card.querySelector('.date-element').textContent;
//         const time = card.querySelector('.card-time').textContent;
//         const room = card.querySelector('.field--name-field-event-room').textContent;
//         const access = card.querySelector('.field--name-field-event-access').textContent;

//         return { title, link, date, time, room, access };
//       });
//     });

//     // Print the extracted data
//     cardData.forEach(card => {
//       // Create a full link
//       const fullLink = `https://unfccc.int${card.link}`;
//       console.log('Title: ' + card.title);
//       console.log('Link: ' + fullLink);
//       console.log('Date: ' + card.date);
//       console.log('Time: ' + card.time);
//       console.log('Room: ' + card.room);
//       console.log('Access: ' + card.access);
//       console.log('\n');
//     });
//   } catch (error) {
//     console.error('An error occurred:', error);
//   } finally {
//     // Close the browser
//     await browser.close();
//   }
// })();
