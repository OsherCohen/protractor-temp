exports.config = {
    seleniumAddress: 'http://localhost:4723/wd/hub',
    defaultTimeoutInterval: 360000,

    specs: [
        'spec.js'
    ],

    capabilities: {
    	'autoWebview': 'true',
        'browserName': '',
		'deviceName': 'iPhone 6',
        'platformName' : 'iOS',
        'platformVersion' : '8.1',
        'app' : '/data/prot/Capriza.zip'
    },

	baseUrl: 'http://10.0.2.2:' + (process.env.HTTP_PORT || '8000'),
	
	// configuring wd in onPrepare
  // wdBridge helps to bridge wd driver with other selenium clients
  // See https://github.com/sebv/wd-bridge/blob/master/README.md
  onPrepare: function () {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
      wdBridge.initFromProtractor(exports.config);
  },
  
  jasmineNodeOpts: {defaultTimeoutInterval: 4*60*1000}
};
