import {launch} from 'puppeteer';

const run = async () => {
  const browser = await launch({
    timeout: 15000,
    ignoreHTTPSErrors: true,
    devtools: false,
    headless: false,
    slowMo: 100,
  });
  console.log('创建browser中...');
  const page = await browser.newPage();
  console.log('创建browser成功...');
  await page.goto('https://github.com/login');
  // Get the "viewport" of the page, as reported by the page.
  console.log('正在打开网页...');

  await page.type('#login_field', 'yanlele');
  await page.type('#password', '53693750qxyqxy');

  await browser.close();
};

run();
