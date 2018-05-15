const log = require("debug")("lv-puppeteer:cdr:");
const puppeteer = require("puppeteer");
const SELECTORS = {
  clientInput: 'input[name="client_code"]',
  userInput: 'input[name="user"]',
  passwordInput: 'input[name="pass"]',
  submitButton: 'input[type="button"]'
};

module.exports = async () => {
  const browser = await puppeteer.launch({
    // headless: false
  });

  const page = await browser.newPage();
  page.setViewport({ width: 1500, height: 800 });
  log("initializing browser");
  await login(page);
  log("logged in");
  return { browser, page };
};

async function login(page) {
  await page.goto("https://portal.na4.livevox.com/lvp_7.0.0/login");
  await page.click(SELECTORS.clientInput);
  await page.keyboard.type(process.env.CLIENT);
  await page.click(SELECTORS.userInput);
  await page.keyboard.type(process.env.USERNAME);
  await page.click(SELECTORS.passwordInput);
  await page.keyboard.type(process.env.PASSWORD);
  await page.waitFor(500);
  await page.click(SELECTORS.submitButton);
  await page.waitFor(1000);
}
