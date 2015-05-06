describe('languageModule without lang in local storage', function() {
    var $mod_lang;

    var supportedLangs = ['en', 'ru'];
    var phrases = [
        'welcome',
        'namePrompt',
        'passwordPrompt',
        'emailPrompt',
        'signUp'
    ];

    beforeEach(function() {
        module('languageModule');
        inject(function($injector) {
            $mod_lang = $injector.get('$mod_lang');
        })
    });

    it('should contain defined phrases for all langs', function() {
        for (lang in supportedLangs) {
            lang = supportedLangs[lang];
            for (phrase in phrases) {
                phrase = phrases[phrase];
                expect($mod_lang.langs[lang]).toHaveNonEmptyString(phrase);
            }
        }
    });

});

