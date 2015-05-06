'use strict';

angular.module('webClient').controller('mainCtrl', ['$scope', '$http', '$mod_lang', function($scope, $http, $mod_lang) {

    var signUpUrl = 'http://localhost:8085/api/sign-up';

    $scope.$L = $mod_lang.currentLang;

    $scope.user = {
        lang: 'en'
    };

    $scope.signUpUser = function() {
        var newUser = $scope.user;

        $http.post(signUpUrl, newUser).
            success(function(response) {
                console.log('All OK')
            }).
            error(function(response) {
                console.log('Error')
            });
    }
}]);
