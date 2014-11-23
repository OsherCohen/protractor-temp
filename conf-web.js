var HtmlReporter = require('protractor-html-screenshot-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    defaultTimeoutInterval: 360000,
    capabilities: {
        'browserName': 'chrome'
    },

    specs: ['login.js'],
    //specs: ['wrapperFunctionality.js'],
    //specs:['customer-sanity.js'],


    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'tests/e2e/screenshots',
            docTitle: 'store report',
            docName: 'report.html'
        }));
    },
    jasmineNodeOpts: {defaultTimeoutInterval: 4*60*1000}
};

