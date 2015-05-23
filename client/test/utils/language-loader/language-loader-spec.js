describe('Language loader with [ru] lang in local storage', function() {
    //var $rootScope;
    var languageLoader, $rootScope, $mod_lang;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        localStorage.setItem('lang', 'ru');
        var $controller = $injector.get('$controller');
        $mod_lang = $injector.get('$mod_lang');

        $rootScope = {};

        // tested controller
        languageLoader = $controller('LanguageLoader', {$rootScope: $rootScope, $mod_lang: $mod_lang});
    }));

    it('should set lang to russian', function() {
        expect($rootScope.$L).toEqual($mod_lang.langs.ru);
    })
});

describe('Language loader with [en] lang in local storage', function() {
    //var $rootScope;
    var languageLoader, $rootScope, $mod_lang;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        localStorage.setItem('lang', 'en');
        var $controller = $injector.get('$controller');
        $mod_lang = $injector.get('$mod_lang');

        $rootScope = {};

        // tested controller
        languageLoader = $controller('LanguageLoader', {$rootScope: $rootScope, $mod_lang: $mod_lang});
    }));

    it('should set lang to english', function() {
        expect($rootScope.$L).toEqual($mod_lang.langs.en);
    })
});

describe('Language loader with null lang in local storage', function() {
    //var $rootScope;
    var languageLoader, $rootScope, $mod_lang;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        localStorage.removeItem('lang');
        var $controller = $injector.get('$controller');
        $mod_lang = $injector.get('$mod_lang');

        $rootScope = {};

        // tested controller
        languageLoader = $controller('LanguageLoader', {$rootScope: $rootScope, $mod_lang: $mod_lang});
    }));

    it('should set lang to english', function() {
        expect($rootScope.$L).toEqual($mod_lang.langs.en);
    })
});
