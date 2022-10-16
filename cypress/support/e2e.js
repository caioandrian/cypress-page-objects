// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

require('cy-verify-downloads').addCustomCommand();
require('cypress-delete-downloads-folder').addCustomCommand();

Cypress.Server.defaults({
  delay: 500,
  force404: false
})

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

//remover requisicoes XHR do log
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');

  app.document.head.appendChild(style);
}

/*Cypress.on('fail', (error, runnable) => {
  debugger

  // we now have access to the err instance
  // and the mocha runnable this failed on

  throw error // throw error to have test still fail
})*/

// Alternatively you can use CommonJS syntax:
// require('./commands')

  /*Cypress.on('fail', (error, runnable) => {
    debugger
  
    // we now have access to the err instance
    // and the mocha runnable this failed on
  
    thro
    w error // throw error to have test still fail
  })*/

