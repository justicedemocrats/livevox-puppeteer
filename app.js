const createBrowser = require("./lib/browser");
const cdr = require("./lib/cdr");

const go = async () => {
  const browserStuffs = await createBrowser();
  await cdr(browserStuffs);
};

go();
