const puppeteer = require('puppeteer');

code = ''

// Enter EMAIL and FEEDBACK to skip CLI prompt
email = ''
feedback = ''

// CLI input
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

// Get 18 digit code from user
const getCode = () => {
  return new Promise((resolve, reject) => {
    readline.question(`Please enter the 18-digit code on your receipt: `, (c) => {
      code = c.replace(/[\s\-A-Za-z]/g, '')
      resolve()
    })
  })
}

// Get email
const getEmail = () => {
  return new Promise((resolve, reject) => {
    if (email == '') {
      readline.question(`Email to receive coupon: `, (em) => {
        email = em
        resolve()
      })
    } else {
      resolve()
    }
  })
}

// Get feedback
const getFeedback = () => {
  return new Promise((resolve, reject) => {
    if (feedback == '') {
      readline.question(`Feedback (press enter for none): `, (fb) => {
        feedback = fb
        resolve()
      })
    } else {
      resolve()
    }
  })
}
 
(async() => {
  await getCode()

  // change headless to false to show Chromium
  // slowMo is a delay (MS) between actions for debugging
  const browser = await puppeteer.launch({slowMo: 0, headless: true }) 
  const page = await browser.newPage();
  await page.goto('https://www.telldunkin.com/Index.aspx?LanguageID=US', {waitUntil: 'networkidle2'})

  // Code input page
  await page.keyboard.press('Tab')
  await page.keyboard.type(code)
  await page.$eval('#NextButton', node => node.click())

  // Drive thru
  await page.waitFor('#NextButton')
  await page.$eval('.Opt2 input', node => node.click())
  await page.$eval('#NextButton', node => node.click())

  // Overall satisfaction
  await page.waitFor('#NextButton')
  await page.$$eval('.Opt5', nodes => nodes.map(n => n.children[0].click()))
  await page.$eval('#NextButton', node => node.click())

  // Service/food
  await page.waitFor('#NextButton')
  await page.$$eval('.Opt5', nodes => nodes.map(n => n.children[0].click()))
  await page.keyboard.press('Tab')
  await getFeedback()
  await page.keyboard.type(feedback)
  await page.$eval('#NextButton', node => node.click())

  // Experience
  await page.waitFor('#NextButton')
  await page.$eval('.Opt2', node => node.children[0].click())
  await page.$$eval('.Opt1', nodes => {
    for (var k=1; k < nodes.length; k++) {
      nodes[k].children[0].click()
    }
  })
  await page.$eval('#NextButton', node => node.click())

  // Retention
  await page.waitFor('#NextButton')
  await page.$$eval('.Opt5', nodes => nodes.map(n => n.children[0].click()))
  await page.$eval('#NextButton', node => node.click())

  // Custom 1
  await page.waitFor('#NextButton')
  await page.$eval('.Opt2', node => node.children[0].click())
  await page.$eval('#NextButton', node => node.click())

  // Custom 2
  await page.waitFor('#NextButton')
  await page.$eval('.Opt2', node => node.children[0].click())
  await page.$eval('#NextButton', node => node.click())

  // What did you order dropdowns
  await page.waitFor('#NextButton')
  await page.$$eval('.rbList select', nodes => {
    for (var k=0; k < nodes.length; k++) {
      nodes[k].value = '2'
    }
  });
  await page.$eval('#NextButton', node => node.click())

  // Perks program
  await page.waitFor('#NextButton')
  await page.$$eval('.rbList select', nodes => {
    for (var k=0; k < nodes.length; k++) {
      nodes[k].value = '2'
    }
  });
  await page.$eval('#NextButton', node => node.click())

  // How to get code
  await page.waitFor('#NextButton')
  await page.$eval('.radioBranded', node => node.click())
  await page.$eval('#NextButton', node => node.click())

  // Enter email
  await page.waitFor('#NextButton')
  await getEmail()
  await page.keyboard.press('Tab')
  await page.keyboard.type(email)
  await page.keyboard.press('Tab')
  await page.keyboard.type(email)
  await page.keyboard.press('Enter')

  await browser.close();
  readline.close()
})();


