const SELECTORS = {
  reviewTab: "#review > a",
  cdrTab: '[aria-labelled-by="1-label"]'
};

module.exports = async ({ page }, date = "05/07/2018") => {
  await page.goto("https://portal.na4.livevox.com/brandnewcampaign#review/1");
  const frames = await page.mainFrame().childFrames();
  console.log(frames.length);
  frames.forEach(f => console.log(f.name()));
  const cdrFrame = await page.frames().find(f => f.name() === "tabIframe2");
  // await cdrFrame.click('select[name="map_id"]');
};
