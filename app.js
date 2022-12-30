const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
require('dotenv').config();
const { Builder, By, Key, until, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const chromeService = new chrome.ServiceBuilder(chromedriver.path);
const { exec } = require("child_process");

exec("apt-get update -y",
(error, stdout, stderr) => {
  console.log(`Result ${stdout}`);
});
exec("apt-get install -y",
(error, stdout, stderr) => {
  console.log("Foi o primeiro");
});
exec("wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb",
(error, stdout, stderr) => {
  console.log(`Result ${stdout}`);
});
exec("apt install -y ./google-chrome-stable_current_amd64.deb",
(error, stdout, stderr) => {
  console.log("foi o ultimo");
});

console.log("Iniciando");
const config = [
    "--headless",
    "--whitelisted-ips",
    "--disable-durable_storag",
    "--disable-protected_media_identifier",
    "--disable-app_banner",
    "--disable-site_engagement",
    "--disable-notifications",
    "--disable-push_messaging",
    "--disable-extensions",
    "--disable-cookies",
    "--disable-plugins",
    "--disable-mouselock",
    "--disable-media_stream",
    "--disable-media_stream_mic",
    "--disable-media_stream_camera",
    "--disable-ppapi_broker",
    "--disable-automatic_downloads",
    "--disable-midi_sysex",
    "--disable-metro_switch_to_desktop",
    "--disable-extensions",
    "--disable-gpu",
    "--disable-infobars",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--start-maximized"
]

const chromeOptions = new chrome.Options().addArguments(config);











// Where we will keep books
let id = [];
const  result = ''
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/id/:isbn', (req, res) => {
    // Reading isbn from the URL
    
   

(async () => {
  let tesAA = 1009
  console.log( tesAA)
  let isbn = req.params.isbn;
  const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions, chromeService).build();
    await driver.get('https://login.doterra.com/br/pt-br/sign-in');
    await driver.wait(until.elementLocated(By.className('form-field form-field-text')), 60000);
    await driver.findElement(By.className('form-field form-field-text')).sendKeys(process.env.ID);
    await driver.findElement(By.className('form-field form-field-password ')).sendKeys(process.env.PASSWORD, Key.ENTER);
    await driver.sleep(20000)

    // await driver.executeScript("window.open('https://beta-doterra.myvoffice.com/index.cfm?Fuseaction=evo_Modules.Placements&FuseSubAction=GetName&DistID=1009', 'Scrapping')");
    await driver.executeScript(`window.open('https://beta-doterra.myvoffice.com/index.cfm?Fuseaction=evo_Modules.Placements&FuseSubAction=GetName&DistID=${isbn}', 'Scrapping')`);

    await driver.getAllWindowHandles().then(async (handles) => {
        await driver.switchTo().window(handles[1]);
        const test = await driver.findElement(By.tagName(`body`))
        res.send(await test.getText())
    });



  })();



});










server.listen(port, function() {
  console.log('App running on *: ' + port);
});



