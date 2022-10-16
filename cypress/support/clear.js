const rimraf = require('rimraf');

rimraf.sync('cypress/reports/*')
rimraf.sync('cypress/screenshots/*')
rimraf.sync('cypress/videos/*')
rimraf.sync('cypress/downloads/*')