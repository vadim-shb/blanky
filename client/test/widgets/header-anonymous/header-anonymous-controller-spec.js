describe('Header anonymous controller', function() {
    var underTest, $rootScope, $scope, $mod_lang;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        $mod_lang = $injector.get('$mod_lang');

        //scopes of tested controller
        $scope = {};
        $rootScope = {};

        // tested controller
        underTest = $controller('HeaderAnonymousCtrl', {$rootScope: $rootScope, $scope: $scope, $mod_lang: $mod_lang});
    }));

    it('should fill languages list in scope', function() {
        var expectedLanguages = [
            {value: 'ru', name: 'Русский'},
            {value: 'en', name: 'English'}
        ];
        expect($scope.languages).toEqual(expectedLanguages);
    });

    it('should change language if selected new one', function() {
        // GIVEN english set as language to use in local storage
        localStorage.setItem('lang', 'en');

        // AND in language module
        $mod_lang.setLang('en');

        // AND in root scope
        $rootScope.$L = $mod_lang.langs.en;

        // WHEN selected russian language
        $scope.changeLang('ru');

        // THEN russian language in local storage
        expect(localStorage.getItem('lang')).toBe('ru');

        // AND in language module
        expect($mod_lang.currentLangName).toBe('ru');
        expect($mod_lang.currentLang).toEqual($mod_lang.langs.ru);

        // AND in root scope
        expect($rootScope.$L).toEqual($mod_lang.langs.ru);
    });

    it('should not change language if selected one is not defined', function() {
        // GIVEN english set as language to use in local storage
        localStorage.setItem('lang', 'en');

        // AND in language module
        $mod_lang.setLang('en');

        // AND in root scope
        $rootScope.$L = $mod_lang.langs.en;

        // WHEN selected to strange language
        $scope.changeLang('none');

        // THEN language in local storage doesn't change
        expect(localStorage.getItem('lang')).toBe('en');

        // AND language in language module doesn't change
        expect($mod_lang.currentLangName).toBe('en');
        expect($mod_lang.currentLang).toEqual($mod_lang.langs.en);

        // AND language in root scope doesn't change
        expect($rootScope.$L).toEqual($mod_lang.langs.en);
    });

});
