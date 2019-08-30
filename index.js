const puppeteer = require('puppeteer');

code = ''
// vvvvvvvvvvv Enter your email here
email = ''
// ^^^^^^^^^^^ Enter your email here

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
      readline.question(`Please enter the email that will receive the coupon: `, (em) => {
        email = em
        resolve()
      })
    } else {
      resolve()
    }
  })
}

 
(async() => {
  await getCode()

  const browser = await puppeteer.launch({slowMo: 0, headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.telldunkin.com/Index.aspx?LanguageID=US', {waitUntil: 'networkidle2'});

  // Code input page
  await page.keyboard.press('Tab')
  await page.keyboard.type(code)
  await page.keyboard.press('Enter')

  // Overall satisfaction
  await page.waitFor('#NextButton')
  await page.$$eval('.Opt5', nodes => nodes.map(n => n.children[0].click()))
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  // Service/food
  await page.waitFor('#NextButton')
  await page.$$eval('.Opt5', nodes => nodes.map(n => n.children[0].click()))
  await page.keyboard.press('Tab')
  await page.keyboard.type('Great food and service!')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  // Experience
  await page.waitFor('#NextButton')
  await page.$eval('.Opt2', node => node.children[0].click())
  await page.$$eval('.Opt1', nodes => {
    for (var k=1; k < nodes.length; k++) {
      nodes[k].children[0].click()
    }
  })
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  // Retention
  await page.waitFor('#NextButton')
  await page.$$eval('.Opt5', nodes => nodes.map(n => n.children[0].click()))
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  // Custom 1
  await page.waitFor('#NextButton')
  await page.$eval('.Opt2', node => node.children[0].click())
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  // Custom 2
  await page.waitFor('#NextButton')
  await page.$eval('.Opt2', node => node.children[0].click())
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  // Dropdown questions
  await page.waitFor('#NextButton')
  await page.keyboard.press('Tab')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Tab')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Tab')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Tab')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  // How to get code
  await page.waitFor('#NextButton')
  await page.$eval('.radioBranded', node => node.click())
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  // Enter email
  await page.waitFor('#NextButton')
  await getEmail()
  await page.keyboard.press('Tab')
  await page.keyboard.type(email)
  await page.keyboard.press('Tab')
  await page.keyboard.type(email)
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  await browser.close();
  readline.close()
})();

