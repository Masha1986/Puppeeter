const puppeteer = require("puppeteer");
const { foundTitle } = require("./lib/commands");
let page;


beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    page.setDefaultTimeout(1000);
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    page.setDefaultTimeout(1000);
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
});

describe("Github another page tests", () => {

  test("The h1 header content enterprise ", async () => {
    await foundTitle(page,'https://github.com/enterprise', 'Enterprise · A smarter way to work together · GitHub');
  });

  test("The h1 header content explore ", async () => {
    await foundTitle(page,'https://github.com/explore', 'Explore GitHub · GitHub');
  });

  test("The h1 header content marketplace ", async () => {
    await foundTitle(page,'https://github.com/marketplace', 'GitHub Marketplace · to improve your workflow · GitHub');
  });

});


describe("Netology page tests", () => {

  beforeEach(async () => {
    await page.goto("https://netology.ru/marketing", {timeout:100000});
  }, 120000);
  
  test("The h1 header content'", async () => {
    const firstLink = await page.$('header div div a');
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('Нетология – курсы и обучение интернет-профессиям онлайн');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("/legal/24");
  });

  test("The page contains button", async () => {
    const btnSelector = ".shared-components-Header--navigatorButton--g4i4W";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Каталог курсов")
  });
});