describe('languageModule without lang in local storage', function() {
    var $mod_lang;
    var supportedLangs = ['en', 'ru'];

    beforeEach(function() {
        localStorage.removeItem('lang');
        module('languageModule');
        inject(function($injector) {
            $mod_lang = $injector.get('$mod_lang');
        })
    });

    it('should contain [en] lang', function() {
        expect($mod_lang.langs).toHaveObject('en');
    });

    it('should contain [ru] lang', function() {
        expect($mod_lang.langs).toHaveObject('ru');
    });

    it('should contain currentLangName = [en]', function() {
        expect($mod_lang.currentLangName).toBe('en');
    });

    it('should contain english as currentLang', function() {
        expect($mod_lang.currentLang).toEqual($mod_lang.langs['en']);
    });

    it('should contain language name for all langs', function() {
        for (lang in supportedLangs) {
            lang = supportedLangs[lang];
            expect($mod_lang.langs[lang]).toHaveNonEmptyString('languageName');
        }
    });

});

describe('languageModule with [ru] lang in local storage', function() {
    var $mod_lang;

    beforeEach(function() {
        localStorage.setItem('lang', 'ru');
        module('languageModule');
        inject(function($injector) {
            $mod_lang = $injector.get('$mod_lang');
        })
    });

    it('should contain currentLangName = [ru]', function() {
        expect($mod_lang.currentLangName).toBe('ru');
    });

    it('should contain russian as currentLang', function() {
        expect($mod_lang.currentLang).toEqual($mod_lang.langs['ru']);
    });

});
