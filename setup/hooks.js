const playwright = require('playwright');
const { BeforeAll, Before, After, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const fs = require('fs')
const playwright_options = require('../cucumber').default.playwright;
const { chromium, firefox, webkit  } = require('playwright');

setDefaultTimeout(playwright_options.timeout);
global.expect = expect;

BeforeAll(async () => {
  console.log('before all ...');
  global.BASE_URL = playwright_options.baseURL;
  global.browsername = playwright_options.browserName.trim().toString();
  console.log(playwright_options.browserName)
 // await new Promise(r => setTimeout(r, 500));
// console.log(global.browsername)
//  console.log(playwright_options.browserName.trim().toString() === "webkit")
  switch (global.browsername) {
    case 'chrome':
      console.log('chrome')
      global.browser = await chromium.launch(playwright_options);
      break;
    case 'firefox':
      console.log('firefox')
      global.browser = await firefox.launch(playwright_options);
      break;
    case 'webkit':
      console.log('webkit')
      global.browser = await webkit.launch(playwright_options);
      break;
    default:
      console.log('def')

      global.browser = await chromium.launch(playwright_options);
      break;
  }
  //global.browser = await playwright[playwright_options.browserName].launch(playwright_options);
});

Before(async (scenario) => {
  console.log('before ...');
  
  global.context = await global.browser.newContext({
    recordVideo : {
      dir : 'videos/'+scenario.pickle.name,
    }
  });
  await global.context.tracing.start({ screenshots: true, snapshots: true });

  global.page = await global.context.newPage();
  await global.page.setDefaultNavigationTimeout(playwright_options.timeout);
  
});

After(async (scenario) => {
  console.log('after ...');
  
  await page.waitForTimeout(3000)
  await global.page.close();
  await context.tracing.stop({ path: 'trace.zip' });

  const videoname = await page.video().path();
  console.log(videoname)
  console.log(scenario.pickle.name)  
 // fs.rename(videoname,"videos/"+scenario.pickle.name)+".webm", (() => console.log('File renamed!'))
  
 
   try {
    let featureName = scenario.gherkinDocument.feature.name;
    let scenarioName = scenario.pickle.name;
 //   let start_time = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
   // console.log(start_time) 
    
    await new Promise(r => setTimeout(r, 2000));
    const videoFilePath = await global.page.video().path();
    const newVideoPath = `./videos/${featureName}_${scenarioName}.webm`;
   

   // const videoFilePath = await page.video().path();
    console.log(videoFilePath)
     //const newVideoPath = videoFilePath.replace(/\\(\w)*.webm/g, `\\${testFileName}.webm`);
     console.log(newVideoPath)
     fs.renameSync(videoFilePath, newVideoPath);
     // console.log('rename success');
 //    succeededRename = true;
   } catch (e) {
      console.log('rename fail');
     //await new Promise(r => setTimeout(r, 2000));

   }
 
 
 
 
 await global.context.close();
 
});


After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    var buffer = await global.page.screenshot({ path: `reports/${scenario.pickle.name}.png`, fullPage: true })
    this.attach(buffer, 'image/png');
  }
});

AfterAll(async () => {
  console.log('after all ...');
  await global.browser.close();
});

