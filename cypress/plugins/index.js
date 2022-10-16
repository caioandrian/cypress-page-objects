/// <reference types="cypress" />
/// <reference types = "Cypress-iframe"/>

const cucumber = require('cypress-cucumber-preprocessor').default
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');  
const exec = require('child_process').execSync;  
const { isFileExist, findFiles } = require('cy-verify-downloads');
const { removeDirectory } = require('cypress-delete-downloads-folder');

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--disable-dev-shm-usage')
    }
 
    return launchOptions
  })

  on('before:run', async (details) => {  
    await beforeRunHook(details);  
    await exec("node ./cypress/support/clear.js")
  });

  on('after:run', async () => {  
    await exec("node ./cypress/support/reporter.js")
    await exec("npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit/*.xml");
    await afterRunHook();
  });  

  on('task', { isFileExist, findFiles, removeDirectory})
}