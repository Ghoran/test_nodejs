// http://www.scoreboard.com/ru/match/ll5UvFsO

const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  page.waitForSelector('td.score').then(() => console.log('Getted'));
  await page.goto('http://www.scoreboard.com/ru/match/ll5UvFsO', {waitUntil: 'networkidle'});
  await page.pdf({path: 'hn.pdf', format: 'A4'});
  await browser.close();
});

