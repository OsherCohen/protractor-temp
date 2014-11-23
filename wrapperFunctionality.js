// spec.js
describe('login', function() {
    var ptor = protractor.getInstance();

    /**
     * Wait for something
     * @param elem
     * @param name
     * @param func
     * @param timeWait
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

    function RunZappByName(ZappName){
        var zapp = element(by.cssContainingText('.ng-binding' , ZappName));
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
    }

    function enterMailForgotPassword(email){
        $('.email.input-container input').clear().sendKeys(email);
        $('.email.input-container button').click();
    }

    it('should load the login page', function(){
        browser.get('https://appdev.capriza.com');
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
        //expect($('#mode-switcher').getText()).toBe('Have a password?');
        //var modeSwitcher = $('#mode-switcher');
        //expect(modeSwitcher.isDisplayed()).toBeTruthy();
        //modeSwitcher.click();
        $('#mode-switcher').click();
        //expect($('#mode-switcher').getText()).toBe("Don't have a password?");
    });

    xit('will check entering empty username and empty password',function(){
        enterLoginPage('','');
        loginMessage('Email address must be specified');
    });

    xit('will check invalid email message',function(){
        enterLoginPage('dcdcdcdc','');
        loginMessage('Invalid email address')
    });

    xit('will check entering valid email but empty password',function(){
        enterLoginPage('nor_real@osher.co.il','');
        loginMessage('Password must be specified');
    });

    //no reconnection
    //it ('will redresh the page',function (){
    //    browser.refresh();
    //    waitFor($('#login-view .header'), 'getText', function(newText){ return 'Productivity Awaits.' === newText})
    //});

    //this can locke osher@osher
    //xit('will check entering wrong password',function(){
    //    enterLoginPage('osher@osher.co.il','asas');
    //    loginMessage('Invalid email or password.');
    //});


    //  =====  forgot password  =====
    xit('will check the forgot password',function(){
        $('.password.input-container span').click();

        waitFor($('#login-view .header'), 'getText', function(newText){ return 'Enter your Capriza email address' === newText})
    })


    xit('will enter an empty mail in forgot password input',function(){
        enterMailForgotPassword('');
        loginMessage('Email address must be specified');
    })

    xit('will enter invalid email in forgot password input',function() {
        enterMailForgotPassword('fcdfswdfdssdsdfg');
        loginMessage('Invalid email address');
    });

    xit('will enter not registered email in forgot password input',function() {
        enterMailForgotPassword('g@d.c');
        loginMessage('Email address is not registered');
    });

    xit('will return to main login',function(){
        $('#mode-switcher-new').click();
        waitFor($('#login-view .header'), 'getText', function(newText){ return 'Productivity Awaits.' === newText})
    });

    it('will login to osher@osher user',function() {
        enterLoginPage('osher@osher.co.il', 'capriza123');
        var pageContent = $('#page-content');
        expect(pageContent.getInnerHtml()).toBeTruthy();
        waitLocation(pageContent, {x: 0});
    });


    //testing stuff
    it ('will open the Request a Zapp popup',function(){
        $("#navigation-bar .request").click();
        ptor.sleep(1000);
        var popup = $('.popup.zapp-request.popup-in');
        waitFor(popup, 'isDisplayed', function(isDisplayed){return isDisplayed;}, 30 * 1000);
        ptor.sleep(1000);
    });

    it ('will check the Request a Zapp popup',function(){
        expect($('.popup.zapp-request.popup-in .header span').getText()).toBe("Request a Zapp");
        expect($('.popup.zapp-request.popup-in .spacer .content span').getText()).toBe("Please describe your desired zapp");
    })


    it ('will check the button bunctionalety',function(){
//        var button =$('.popup.zapp-request.popup-in .footer.inactive');
        var button =$('.popup.zapp-request.popup-in .footer');
        expect((button).isDisplayed()).toBeTruthy();
        $('.popup.zapp-request.popup-in .spacer .content textarea').sendKeys('text text text');
        expect($(button).getAttribute('class')).toBe('sdsdsdsd');
        //expect($(button).getAttribute()).toBeFalsy();
    })



    xit('will test swiping main page',function(){
        //var a = element(By.css('.menu')).getLocation();


         //expect($('.menu').getLocation.y).toBe(3);


        ptor.sleep(4000);
       //browser.actions().dragAndDrop({x: 50, y: 10}, {x: 50, y: 200}).perform();

        browser.actions().mouseDown($('#page-content'), {x:20,y:50}).mouseMove({x:10000,y:50}).perform();

        ptor.sleep(2000);

    })

    xit ('will check if loged in the correct user',function(){
        $('#navigation-bar .menu').click();
        expect($('.menu .user-name-label').getText()).toBe('osher@osher.co.il');
    });

    xit('will log-out the osher@osher user',function(){
        $('#signout-container span').click();
        waitFor($('#login-view .header'), 'getText', function(newText){ return 'Productivity Awaits.' === newText})
    });

    xit('will check messages after loging out from a user',function(){
        waitFor($('#login-view .header'), 'getText', function(newText){ return 'Productivity Awaits.' === newText})
        enterLoginPage('','');
        loginMessage('Email address must be specified');

        enterLoginPage('dcdcdcdc','');
        loginMessage('Invalid email address')
        enterLoginPage('nor_real@osher.co.il','');
        loginMessage('Password must be specified');
    })

    xit('will make a successful log in to wrapper@eggplant and will make sure logged-in to the correct user',function(){
        enterLoginPage('wrapper@eggplant.com', 'capriza123');
        var pageContent = $('#page-content');
        expect(pageContent.getInnerHtml()).toBeTruthy();
        waitLocation(pageContent, {x: 0});
        $('#navigation-bar .menu').click();
        expect($('.menu .user-name-label').getText()).toBe('wrapper@eggplant.com');
    });

    xit('will check sending feedback',function(){
        element(by.css('.menu-items .send-feedback')).click();
        browser.wait(function() {return ptor.isElementPresent($('.popup.send-feedback.popup-in'));}, 8000);
        $('.popup.send-feedback.popup-in textarea').sendKeys("#dump #protractor : this is a feedback test.");
        $('.popup.send-feedback.popup-in .footer').click();
        waitFor($('#messages .content'), 'getText', function(newText){ return 'Sending feedback' === newText});
        waitFor($('#messages .content'), 'getText', function(newText){ return 'Feedback sent' === newText});
    });

    xit('will close the person menu',function(){
        $('#page-content').click();
    });

    //Zapp detail popup box

    xit('should show the details of the first box', function(){
        //this works
        var d = element.all(by.css('#zapps-container .info'));
        d.get(0).click();
    });

    xit('will check if the poup box is displayed',function(){
        var popup = $('.popup-container .popup.zapp-info');
        waitFor(popup, 'isDisplayed', function(isDisplayed){return isDisplayed;}, 30 * 1000)
    });

    xit('will check if the run zapp button is located in the details box',function(){
        ptor.sleep(2000);
        var runBtn = $('.popup.popup-in.zapp-info .footer span');
        expect(runBtn.getText()).toBe('Run Zapp');
    });

    xit('will close the detales popup',function(){
        $('.popup.popup-in.zapp-info .header .exit').click();
    });
});