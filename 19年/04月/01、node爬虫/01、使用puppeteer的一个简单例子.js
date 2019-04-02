import {launch} from 'puppeteer';

const run = async () => {
  const browser = await launch({
    timeout: 15000,
    ignoreHTTPSErrors: true,
    devtools: false,
    headless: true,
    slowMo: 250,
  });
  console.log('创建browser中...');
  const page = await browser.newPage();
  console.log('创建browser成功...');
  await page.goto('https://github.com/');
  // Get the "viewport" of the page, as reported by the page.
  console.log('正在打开网页...');
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
      href: window.location.href,
    };
  });

  console.log('Dimensions:', dimensions);
  await browser.close();
};

run();
