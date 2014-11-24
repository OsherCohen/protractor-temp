/**
 * Created by osher on 24/11/14.
 */

describe('login', function() {
    var ptor = protractor.getInstance();

    function waitFor(elem, name, func, timeWait) {
        var isOk = false;

        browser.wait(function () {
            elem[name]().then(function () {
                isOk = func.apply(this, arguments);
            });
            return isOk;
        }, timeWait ? timeWait : 10 * 1000);
    }

    function waitLocation(elem, targetCoord) {
        waitFor(elem, 'getLocation', function (curCoord) {
            var isOk = false;

            if (targetCoord.x !== undefined) {
                isOk = curCoord.x == targetCoord.x;
            }

            if (targetCoord.y !== undefined) {
                if (targetCoord.x !== undefined) {
                    isOk &= curCoord.y == targetCoord.y;
                } else {
                    isOk = curCoord.y == targetCoord.y;
                }
            }
            return isOk;
        });
    }

    function loginMessage(expected) {
        waitFor($('#email-login-message-error'), 'getText', function (newText) {
            return expected === newText
        })
    }

    function loginPasswordMessage(expected) {
        waitFor($('#password-login-message-error'), 'getText', function (newText) {
            return expected === newText
        })
    }

    function enterLoginPage(username, password) {
        // add username
        element(by.model('login.email')).clear().sendKeys(username);

        // add password
        element(by.model('login.password')).clear().sendKeys(password);

        submitButton = $('.input-container.password-login-button button');
        expect(submitButton.isDisplayed()).toBeTruthy();
        submitButton.click();
    }

    function enterMailForgotPassword(email) {
        $('.email.input-container input').clear().sendKeys(email);
        $('.email.input-container button').click();
    }

    function checkIfElementIsContaind(big, small) {
        big.getSize().then(function (rectB) {
            //console.log(rectB.width);
            small.getSize().then(function (rectS) {
                //console.log(rectB.width);
                //console.log(rectS.width);
                expect(rectB.width > rectS.width && rectB.height > rectS.height).toBeTruthy();
            })
        });
    }


    function logoutOrg() {
        browser.get('http://local.capriza.com/store/');
        ptor.sleep(3000);
        $('#navigation-bar .menu').click();
        $('#signout-container').click();
        var loginView = $('#login-view');
        waitFor(loginView, 'isDisplayed', function (isDisplayed) {
            return isDisplayed;
        }, 30 * 1000)

        ptor.sleep(1000);

        $('#mode-switcher').click();
    }

    function RunZappByName(ZappName){
        var zapp = element(by.cssContainingText('.ng-binding',ZappName));
        zapp.click();
    }


    it('should change to the store context', function () {
        wdBrowser.contexts().then(function (contexts) {
            //console.log(contexts);
            wdBrowser.context(contexts[1]);
        });
    });

    var loginView, submitButton;
    it('should get some elements', function () {
        loginView = $('#login-view');
    });

    it('show wait for login page to be displayed', function () {
        waitFor(loginView, 'isDisplayed', function (isDisplayed) {
            return isDisplayed;
        }, 30 * 1000)
    });

    it('should click on mode switcher-new', function () {
        ptor.sleep(2000);
        expect($('#mode-switcher').getText()).toBe('Have a password?');
        $('#mode-switcher').click();
        ptor.sleep(1000);
        expect($('#mode-switcher').getText()).toBe("Don't have a password?");
    });

    it('will will login to wrapper@eggplant', function () {
        enterLoginPage('wrapper@eggplant.com', 'capriza123');
        ptor.sleep(10000)
    });

    it('will run EggPlant-zap zapp',function() {
        ptor.sleep(10000)
        RunZappByName('testing');
        ptor.sleep(10000)
        //wdBrowser.contexts().then(function (contexts) {
        //    console.log(contexts);
        //    wdBrowser.context(contexts[2]);
        //});
    });

    xit ('will log in to SF',function(){
    $('#page0mc43input').sendKeys('sfdemo@capriza.com')
        ptor.sleep(10000);
    })
});