# telldunkin

## Introduction

Streamlines the process of submitting a dunkin' review using the "Free Donut" reciept code.

This is a NodeJS project that makes use of Pupeteer to automate the survey process, make sure you have NPM and NodeJS to run.

## Installation

    git clone https://github.com/christopher-hayes/telldunkin.git
    cd telldunkin
    npm i

## Operation

    node index.js

You will be first prompted for the "Survey Code" in the terminal. Currently there is no error checking, so type carefully.

Next a prompt to give any specific feedback is given. Press enter to give no feedback. This step can be skipped if you edit the line in index.js `feedback = ''`. Putting anything inside `''` will automate this step.

Next a prompt to give the email that you want your email sent to is shown. This step can be skipped if you edit the line in index.js `email = ''`. Putting your email inside `''` will automate this step.

## Screen recording of what the script is doing

<img src="https://github.com/Christopher-Hayes/telldunkin/raw/master/telldunkin.gif"
     alt="GIF screenshot of program running with browser visible"/>
     

Note: the gif is showing puppeteer NOT in headless mode. By default puppeteer code will be in headless mode, so no browser will typical be shown. Turning off headless mode can help with debugging, this can be changed by setting `headless: true` on line 42.
