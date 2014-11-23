exports.config = {
    seleniumAddress: 'http://localhost:4723/wd/hub',

    specs: [
        'spec.js'
    ],

	onPrepare: '/data/prot/startup.js',

framework: 'jasmine',

    capabilities: {
        'device': 'android',
        'browserName' : '',
	'deviceName' : 'emulator-5554',
        'platformName' : 'Android',
        'platformVersion' : '4.4.2',
        'app' : '/data/prot/HelloCordova-debug.apk',
        'autoWebview' : 'true'
    },

	baseUrl: 'http://10.0.2.2:' + (process.env.HTTP_PORT || '8000')
};
