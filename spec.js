// spec.js
describe('login', function() {
    var ptor = protractor.getInstance();

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
        waitFor(elem, 'getLocation', function(curCoord){
            var isOk = false;

            if (targetCoord.x !== undefined){
                isOk = curCoord.x == targetCoord.x;
            }

            if (targetCoord.y !== undefined){
                if (targetCoord.x !== undefined){
                    isOk &= curCoord.y == targetCoord.y;
                } else {
                    isOk = curCoord.y == targetCoord.y;
                }
            }
            return isOk;
        });
    }

    function loginMessage(expected){
        waitFor($('#email-login-message-error'), 'getText', function(newText){ return expected === newText})
    }

    function loginPasswordMessage(expected){
        waitFor($('#password-login-message-error'), 'getText', function(newText){ return expected === newText})
    }

    function enterLoginPage(username,password){
        // add username
        element(by.model('login.email')).clear().sendKeys(username);

        // add password
        element(by.model('login.password')).clear().sendKeys(password);

        submitButton = $('.input-container.password-login-button button');
        expect(submitButton.isDisplayed()).toBeTruthy();
        submitButton.click();
    }

    function enterMailForgotPassword(email){
        $('.email.input-container input').clear().sendKeys(email);
        $('.email.input-container button').click();
    }

    function checkIfElementIsContaind(big,small){
        big.getSize().then(function(rectB){
            //console.log(rectB.width);
            small.getSize().then(function(rectS){
                //console.log(rectB.width);
                //console.log(rectS.width);
                expect(rectB.width>rectS.width && rectB.height>rectS.height).toBeTruthy();
            })
        });
    }


    function logoutOrg(){
        browser.get('http://local.capriza.com/store/');
        ptor.sleep(3000);
        $('#navigation-bar .menu').click();
        $('#signout-container').click();
        var loginView = $('#login-view');
        waitFor(loginView, 'isDisplayed', function(isDisplayed){return isDisplayed;}, 30 * 1000)

        ptor.sleep(1000);

        $('#mode-switcher').click();
    }
    
    it('should change to the store context', function(){
    	wdBrowser.contexts().then(function (contexts) { 
        	console.log(contexts);
        	wdBrowser.context(contexts[1]);
    	});
    });
    
    var loginView, submitButton;
    it('should get some elements', function(){
        loginView = $('#login-view');
    });

    it('show wait for login page to be displayed', function(){
        waitFor(loginView, 'isDisplayed', function(isDisplayed){return isDisplayed;}, 30 * 1000)
    });

    it('should click on mode switcher-new', function(){
        ptor.sleep(2000);
        expect($('#mode-switcher').getText()).toBe('Have a password?');
        $('#mode-switcher').click(); ptor.sleep(1000);
        expect($('#mode-switcher').getText()).toBe("Don't have a password?");
    });

    it('will check entering empty username and empty password',function(){
        enterLoginPage('','');
        loginPasswordMessage('Email address must be specified');
    });

    it('will check invalid email message',function(){
        enterLoginPage('dcdcdcdc','');
        loginPasswordMessage('Invalid email address')
    });

    it('will check entering valid email but empty password',function(){
        enterLoginPage('nor_real@osher.co.il','');
        loginPasswordMessage('Password must be specified');
    });

    //no reconnection
    //it('will redresh the page',function (){
    //    browser.refresh();
    //    waitFor($('#login-view .header'), 'getText', function(newxt){ return 'Productivity Awaits.' === newText})
    //});

    //this can locke osher@osher
    //it('will check entering wrong password',function(){
    //    enterLoginPage('osher@osher.co.il','asas');
    //    loginMessage('Invalid email or password.');
    //});


    //  =====  forgot password  =====
    it('will check the forgot password',function(){
        $('.password.input-container span').click();

        waitFor($('#login-view .header'), 'getText', function(newText){ return 'Enter your Capriza email address' === newText})
    })


    it('will enter an empty mail in forgot password input',function(){
        enterMailForgotPassword('');
        loginMessage('Email address must be specified');
    })

    it('will enter invalid email in forgot password input',function() {
        enterMailForgotPassword('fcdfswdfdssdsdfg');
        loginMessage('Invalid email address');
    });

    it('will enter not registered email in forgot password input',function() {
        enterMailForgotPassword('g@d.c');
        loginMessage('Email address is not registered');
    });

    it('will return to main login',function(){
        $('#mode-switcher').click();
        waitFor($('#login-view .header'), 'getText', function(newText){ return 'Productivity Awaits.' === newText})
    });

    it('will login to osher@osher user',function() {
        enterLoginPage('osher@osher.co.il', 'capriza123');
    });

    it ('will check the passcode',function(){
        ptor.sleep(1000);
        $('.focus-changer').click();
        ptor.sleep(1000);
        $('.numeric-keyboard').sendKeys('1111');
        ptor.sleep(1000);
        $('.focus-changer').click();
        ptor.sleep(1000);
        $('.numeric-keyboard').sendKeys('1111');
        ptor.sleep(2000);
        var pageContent = $('#page-content');
        expect(pageContent.getInnerHtml()).toBeTruthy();
        waitLocation(pageContent, {x: 0});
    });

    it('will check if loged in the correct user',function(){
        $('#navigation-bar .menu').click();
        expect($('.menu .user-name-label').getText()).toBe('osher@osher.co.il');
    });

    it('will log-out the osher@osher user',function(){
        $('#signout-container span').click();
        waitFor($('#login-view .header'), 'getText', function(newText){ return 'Productivity Awaits.' === newText})
    });

    it('will check messages after loging out from a user',function(){
        waitFor($('#login-view .header'), 'getText', function(newText){ return 'Productivity Awaits.' === newText})
            enterLoginPage('','');
            loginPasswordMessage('Email address must be specified');

            enterLoginPage('dcdcdcdc','');
            loginPasswordMessage('Invalid email address')

            enterLoginPage('nor_real@osher.co.il','');
            loginPasswordMessage('Password must be specified');
    })

    it('will make a successful log in to wrapper@eggplant and will make sure logged-in to the correct user',function(){
        enterLoginPage('wrapper@eggplant.com', 'capriza123');
        var pageContent = $('#page-content');
        expect(pageContent.getInnerHtml()).toBeTruthy();
        waitLocation(pageContent, {x: 0});
        $('#navigation-bar .menu').click();
        expect($('.menu .user-name-label').getText()).toBe('wrapper@eggplant.com');
    });

    it('will check sending feedback',function(){
        element(by.css('.menu-items .send-feedback')).click();
        browser.wait(function() {return ptor.isElementPresent($('.popup.send-feedback.popup-in'));}, 8000);
        $('.popup.send-feedback.popup-in textarea').sendKeys("#dump #protractor : this is a feedback test.");
        $('.popup.send-feedback.popup-in .footer').click();
        waitFor($('#messages .content'), 'getText', function(newText){ return 'Sending feedback' === newText});
        waitFor($('#messages .content'), 'getText', function(newText){ return 'Feedback sent' === newText});
    });

    it('will close the person menu',function(){
      $('#page-content').click();
    });
    //Zapp detail popup box


    it('will show the detail box of Map zapp',function(){
       ptor.sleep(2000);
        var Mapinfo = element(by.cssContainingText('.ng-binding' ,"EggPlant-zap")).element(by.xpath('..')).element(by.xpath('..')).element(by.css('.info'));
        Mapinfo.click();
    });

    it('will check if the poup box is displayed',function(){
        var popup = $('.popup-container .popup.zapp-info');
        waitFor(popup, 'isDisplayed', function(isDisplayed){return isDisplayed;}, 30 * 1000)
    });

    it('will check the text info in the detail popup',function(){
        ptor.sleep(2000);
        expect($('.popup.zapp-info.popup-in .content .ng-binding').getText()).toBe("EggPlant-zap. Created using staticpages.capriza.com");
    });

    it('will check if the run zapp button is located in the details box',function(){
        ptor.sleep(2000);
        var runBtn = $('.popup.popup-in.zapp-info .footer span');
        expect(runBtn.getText()).toBe('Run Zapp');
    });

    it('will close the detales popup',function(){
        $('.popup.popup-in.zapp-info .header .exit').click();
        ptor.sleep(2000);
    });

    it('will open the Request a Zapp popup',function(){
        $("#navigation-bar .request").click();
        ptor.sleep(1000);
        var popup = $('.popup.zapp-request.popup-in');
        waitFor(popup, 'isDisplayed', function(isDisplayed){return isDisplayed;}, 30 * 1000);
        ptor.sleep(1000);
    });

    it('will check the Request a Zapp popup',function(){
        expect($('.popup.zapp-request.popup-in .header span').getText()).toBe("Request a Zapp");
        expect($('.popup.zapp-request.popup-in .spacer .content span').getText()).toBe("Please describe your desired zapp");
    })

    it('will check the button functionalety',function(){
        expect(($('.popup.zapp-request.popup-in .footer.inactive')).isDisplayed()).toBeTruthy();
        $('.popup.zapp-request.popup-in .spacer .content textarea').sendKeys('text text text');
        expect($('.popup.zapp-request.popup-in .footer').isDisplayed()).toBeTruthy();
    })

    it('will exite the pop up',function(){
        $('.popup.zapp-request.popup-in .header .exit').click();
        ptor.sleep(4000);
    });

    it('will log out and log in to wrapper@eggplant',function(){
        //logoutOrg();
        $('#navigation-bar .menu').click();
        ptor.sleep(2000);
        $('#signout-container').click();
        ptor.sleep(7000);
        //var loginView = $('#login-view');
        //waitFor(loginView, 'isDisplayed', function(isDisplayed){return isDisplayed;}, 30 * 1000)

        //ptor.sleep(1000);

        $('#mode-switcher').click();

        enterLoginPage('wrapper@eggplant.com', 'capriza123');
        var pageContent = $('#page-content');
        expect(pageContent.getInnerHtml()).toBeTruthy();
        waitLocation(pageContent, {x: 0});
    });


    xit('will open the detail popup of manual grab zapp',function() {
        ptor.sleep(2000);
        var Mapinfo = element(by.cssContainingText('.ng-binding', "ManualGrab")).element(by.xpath('..')).element(by.xpath('..')).element(by.css('.info'));
        Mapinfo.click();
        ptor.sleep(5000);
    });

    xit('will test very long details on the detail popup',function(){
        var a = $('.popup.zapp-info.popup-in .content .ng-binding');
        expect(a.getText()).toBe("ManualGrabv. Created using staticpages.capriza.com text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text");
        var b = $('.ng-scope.popup-container.active .popup.zapp-info.popup-in')
        checkIfElementIsContaind(b,a);
    });

    xit('will log out and login at instent login',function(){
        browser.get('http://local.capriza.com/store/');

        ptor.sleep(5000);
        $('#navigation-bar .menu').click();
        $('#signout-container').click();

        var loginView = $('#login-view');
        waitFor(loginView, 'isDisplayed', function(isDisplayed){return isDisplayed;}, 30 * 1000)
        ptor.sleep(2000);

        $('#login-view .form-container .email.input-container input').clear().sendKeys('instantlogin@instantlogin.com');
        $('.email.input-container button').click();
        var pageContent = $('#page-content');
        waitLocation(pageContent, {x: 0});
        expect($('#zapps-container  .zapp-add').isDisplayed()).toBeTruthy();
    });
});