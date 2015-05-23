'use strict';

angular.module('webClient').controller('LanguageLoader', ['$rootScope', '$mod_lang', function($rootScope, $mod_lang) {

    $rootScope.$L = $mod_lang.currentLang;

}]);
