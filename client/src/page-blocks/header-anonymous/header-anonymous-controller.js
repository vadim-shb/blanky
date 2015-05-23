'use strict';

angular.module('webClient').controller('HeaderAnonymousCtrl', ['$rootScope', '$scope', '$mod_lang', function($rootScope, $scope, $mod_lang) {

    var fillLangBox = function() {
        $scope.languages = [];
        for (var i in $mod_lang.langs) {
            $scope.languages.push({
                value: i,
                name: $mod_lang.langs[i].languageName
            })
        }
    };

    var componentInit = function() {
        fillLangBox();
    };

    $scope.changeLang = function(lang) {
        if (typeof $mod_lang.langs[lang] != 'undefined') {
            $mod_lang.setLang(lang);
            $rootScope.$L = $mod_lang.currentLang;
            localStorage.setItem('lang', lang);
        }
    };

    componentInit();
}]);
