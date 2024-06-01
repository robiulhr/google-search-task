import puppeteer from 'puppeteer';
import autoScroll from './utils.js'
// Launch the browser and open a new blank page
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('https://www.google.com/');

// Set screen size.
await page.setViewport({ width: 1080, height: 1024 });

const searchBoxSelector = '#APjFqb'

await page.waitForSelector(searchBoxSelector);
// Type into search box.
await page.type(searchBoxSelector, 'hello world');

await page.keyboard.press('Enter');

// // Wait and click on first result.
const searchResultSelector = '[jscontroller="SC7lYd"]';
await page.waitForSelector(searchResultSelector);
await autoScroll(page);

const allResultsElm = await page.$$(searchResultSelector);

for (const item of allResultsElm) {
    const resultLinkElm = await item.$('a[jsname="UWckNb"]')
    const link = await (await resultLinkElm.getProperty('href')).jsonValue()
    const titleElm = await item.$('h3')
    const title = await (await titleElm.getProperty('textContent')).jsonValue()
    const descriptionElm = await item.$('div.VwiC3b.yXK7lf.lVm3ye.r025kc.hJNv6b.Hdw6tb');
    const description = await (await descriptionElm.getProperty('textContent')).jsonValue()
    console.log({
        link,
        title,
        description
    })
}

await browser.close();
