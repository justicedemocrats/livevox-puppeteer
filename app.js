const createBrowser = require("./lib/browser");
const cdr = require("./lib/cdr");

const go = async () => {
  const browserStuffs = createBrowser();
  cdr(browserStuffs);
};

go();
