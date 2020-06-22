/* global jasmine */
'use strict';

const Jasmine = require('jasmine');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const jrunner = new Jasmine();
let filter;

process.argv.slice(2).forEach(option => {
  if (option === 'full') {
    // Remove default reporter logs
    jrunner.clearReporters();

    // Add jasmine-spec-reporter
    jrunner.addReporter(new SpecReporter({
      suite: {
        displayNumber: true
      },
      spec: {
        displayPending: true,
        displayDuration: true
      },
      summary: {
        displayDuration: true
      }
    }));
  }

  if (option.match('^filter=')) {
    filter = option.match('^filter=(.*)')[1];
  }
})

// Load configuration from jasmine.json
jrunner.loadConfigFile('spec/support/jasmine.json');
jrunner.execute(undefined, filter);
