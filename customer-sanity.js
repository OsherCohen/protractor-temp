var data = require('./resources.json');


describe('customer-sanity', function() {
    var ptor = protractor.getInstance();
    beforeEach(function() {
        ptor.ignoreSynchronization = true;
    });

    /**
     * Wait for something
     * @param elem
     * @param name
     * @param func
     * @param timeWaitUsing an Object
     */

    function waitFor(elem, name, func, timeWait){
        var isOk = false;

        browser.wait(function(){
            elem[name]().then(function(){
                isOk = func.apply(this, arguments);
            });
            return isOk;
        }, timeWait? timeWait : 10 * 1000);
    }

    function waitLocation(elem, targetCoord){
        waitFor(elem, 'getLocation', function(curCoord){10000
            var isOk = false;

            if (targetCoord.x !== undefined){
                isOk = curCoord.x == targetCoord.x;
            }

            if (targetCoord.y !== undefined){        var pageContent = $('#page-content');
        expect(pageContent.getInnerHtml()).toBeTruthy();         //console.log(zapps[zapp]);
         //runZappByName("Customer Activation");
        waitLocation(pageContent, {x: 0});
                if (targetCoord.x !== undefined){
                    isOk &= curCoord.y == targetCoord.y;
                } else {
                    isOk = curCoord.y == targetCoord.y;
                }
            }
            return isOk;
        });
    }

    function RunZappByName(ZappName){
        var zapp = element(by.cssContainingText('.ng-binding',ZappName));
        zapp.click();
    }

    function loginMessage(expected){
        waitFor($('#login-message'), 'getText', function(newText){ return expected === newText})
    }

    function enterLoginPage(username,password){
        // add username
        element(by.model('login.email')).clear().sendKeys(username);

        // add password
        element(by.model('login.password')).clear().sendKeys(password);

        submitButton = $('.input-container.password-login-button');
        expect(submitButton.isDisplayed()).toBeTruthy();
        submitButton.click();
        var pageContent = $('#page-content');
        expect(pageContent.getInnerHtml()).toBeTruthy();
        waitLocation(pageContent, {x: 0});
    }

    function enterMailForgotPassword(email){
        $('.email.input-container input').clear().sendKeys(email);
        $('.email.input-container button').click();
    }

    function runZappByName(zappname){
        var zapp = element(by.cssContainingText('.ng-binding' , zappname));
        zapp.click();
    }

    function logoutOrg(){
        browser.get('https://app.capriza.com/v2/');
        ptor.sleep(3000);
        $('#navigation-bar .menu').click();
        $('#signout-container').click();

        var loginView = $('#login-view');
        waitFor(loginView, 'isDisplayed', function(isDisplayed){return isDisplayed;}, 30 * 1000)

        ptor.sleep(1000);

        $('#mode-switcher').click();
    }

    function testAllZappByOrgName(orgName){

        Object.keys(data.org[orgName].zapps).forEach(function(key){
            enterLoginPage("" + data.org[orgName].username, "" + data.org[orgName].password);
            runZappByName("" + key);
            ptor.sleep(10000);


            Object(data.org[orgName].zapps[key].elements).forEach(function(element){
                expect($("" + element).isDisplayed()).toBeTruthy();
            })
            logoutOrg();
        })
    }

    it('should load the login page', function(){
        browser.get('https://app.capriza.com/v2/');
        ptor.waitForAngular();
        browser.driver.manage().window().setSize(1024, 768);
    });

    var loginView, submitButton;
    it('should get some elements', function(){
        loginView = $('#login-view');
    });

    it('show wait for login page to be displayed', function(){
        waitFor(loginView, 'isDisplayed', function(isDisplayed){return isDisplayed;}, 30 * 1000)
    });


    it('should click on mode switcher', function(){
        ptor.sleep(2000)
        $('#mode-switcher').click();
    });

    //Starting zapp test

    it('will check life of DirecTV',function(){
        var orgName = 'derectTV';
        testAllZappByOrgName(orgName);
    });

   it('will check life of tivo',function(){
        var orgName = 'Tivo';
        testAllZappByOrgName(orgName);
    });

    it('will check life of Brocade',function(){
        var orgName = 'Brocade';
        testAllZappByOrgName(orgName);
    });

    it('will check file of Ciber',function(){
       var orgName = 'Ciber';
        testAllZappByOrgName(orgName);
    })

    it('will check life of BezeInt',function(){
        var orgName = 'BezeInt';
        testAllZappByOrgName(orgName);
    })

    it('will check life of Dell',function(){
        var orgName = 'Dell';
        testAllZappByOrgName(orgName);
    })

    it('will check life of Olympus',function(){
        var orgName = 'Olympus';
        testAllZappByOrgName(orgName);
    })

    it('will check life of Colonial',function(){
        var orgName = 'Colonial';
        testAllZappByOrgName(orgName);
    })

    it('will check life of KKR',function(){
        var orgName = 'KKR';
        testAllZappByOrgName(orgName);
    })

    it('will check life of JDSU',function(){
        var orgName = 'JDSU';
        testAllZappByOrgName(orgName);
    })

    it('will check life of Bezeq',function(){
        var orgName = 'Bezeq';
        testAllZappByOrgName(orgName);
    })
});
