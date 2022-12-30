const playwright = require('playwright');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const { chromium } = require('playwright');

// Where we will keep books
let id = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/id/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;
    

(async () => {
  const browser = await playwright.chromium.launch({
    headless: true // set this to true
});
    // New Context
    const context = await browser.newContext();
  
    // Open new page
    const page = await context.newPage();
  
    // Home page
    await page.goto('https://login.doterra.com/br/pt-br/sign-in');
    console.log("Entrei Pagina")
  
    // Input User
    await page.fill('input[name=uid]', '13888558');
  
    // Input Password
    await page.fill('input[name="password"]', 'A123456b');
  
    // Login Button
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(20000);
    // const novaguia = await context.newPage();
    console.log("Estou indo para api")
    await page.goto(`https://beta-doterra.myvoffice.com/index.cfm?Fuseaction=evo_Modules.Placements&FuseSubAction=GetName&DistID=${isbn}`);
    const pageText = await page.innerText('body');
    res.send(pageText);
    page.close()

  
    
  })();



});










server.listen(port, function() {
  console.log('App running on *: ' + port);
});



