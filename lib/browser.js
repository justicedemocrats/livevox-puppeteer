const puppeteer = require("puppeteer");
const SELECTORS = {
  clientInput: 'input[name="client_code"]',
  userInput: 'input[name="user"]',
  passwordInput: 'input[name="pass"]',
  submitButton: 'input[type="button"]'
};

let browser;

module.exports = async () => {
  if (browser === undefined) {
    browser = await puppeteer.launch({
      headless: false
    });

    const page = await browser.newPage();
    login(page);
    return { browser, page };
  } else {
    const page = await browser.newPage();
    login(page);
    return { browser };
  }
};

async function login(page) {
  await page.goto("https://portal.na4.livevox.com/lvp_7.0.0/login");
  await page.click(SELECTORS.clientInput);
  await page.keyboard.type("brandnewcampaign");
  await page.click(SELECTORS.userInput);
  await page.keyboard.type("DialerAdminBot");
  await page.click(SELECTORS.passwordInput);
  await page.keyboard.type("43qgmKPu#U@MD!1a5M");
  await page.waitFor(1000);
  await page.click(SELECTORS.submitButton);
  process.exit();
}
