const puppeteer = require('puppeteer');

const urls = [
  'https://zareqia.com/invite/demo?template=emerald-noir',
  'https://zareqia.com/invite/demo?template=ivory-elegance',
  'https://zareqia.com/invite/demo?template=royal-elegance',
  'https://webgency.tilda.ws/thesacredgarden',
  'https://zareqia.com/invite/demo?template=modern-minimal',
  'https://zareqia.com/invite/demo?template=garden-romance',
  'https://zareqia.com/invite/demo?template=rose-gold-blush',
  'https://webgency.tilda.ws/blossomoud',
  'https://webgency.tilda.ws/template6'
];

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  for (const url of urls) {
    console.log(`Checking ${url}`);
    const page = await browser.newPage();
    const videoUrls = new Set();
    
    page.on('response', response => {
      const u = response.url();
      if (u.endsWith('.mp4') || u.endsWith('.webm') || u.endsWith('.mov') || u.endsWith('.MP4')) {
        videoUrls.add(u);
      }
    });

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      // wait a bit for any lazy loaded videos
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.log(`Timeout on ${url}`);
    }

    if (videoUrls.size > 0) {
      console.log(`FOUND VIDEOS FOR ${url}:`, Array.from(videoUrls));
    } else {
      console.log(`No videos found for ${url}`);
    }
    await page.close();
  }
  await browser.close();
})();
