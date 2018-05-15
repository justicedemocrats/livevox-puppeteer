const shell = require("shelljs");
const fs = require("fs");
const log = require("debug")("lv-puppeteer:cdr:");
const SELECTORS = {
  reviewTab: "#review > a",
  cdrTab: '[aria-labelled-by="1-label"]'
};

module.exports = ({ page }, { date, client_id, map_id }) =>
  new Promise(async (resolve, reject) => {
    shell.mkdir("-p", "./downloads");
    const old_files = new Set(fs.readdirSync("./downloads"));
    await page._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: "./downloads"
    });
    const url = `https://portal.na4.livevox.com/reporting_7.0.0/cdr?operation=get_report&output_format=html&client_id=${client_id}&skill_id=&start_date=${date}&end_date=${date}&dates=&call_center_id=&map_id=${map_id}&campaign_id=&campaign_pattern=`;
    log("downloading cdr for %s on %s", client_id, date);

    const handleRequestFinished = () => {
      const new_files = new Set(fs.readdirSync("./downloads"));
      old_files.forEach(file => new_files.delete(file));
      const new_file = [...new_files.values()];
      log("Downloaded cdr: %s", new_file);

      return resolve(fs.readFileSync(`./downloads/${new_file}`).toString());
    };

    page.once("requestfinished", handleRequestFinished);

    await page.goto(url);
  });
