'use strict';

angular.module('webClient').controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

    var signUpUrl = 'http://localhost:8085/api/sign-up';
    var newUser = {
        name: 'Uzzzer',
        lang: 'en',
        email: 'ivan@ivanov.com',
        password: 'qwerty123'
    };

    $scope.signUpUser = function() {
        $http.post(signUpUrl, newUser).
            success(function(response) {
                console.log('All OK')
            }).
            error(function(response) {
                console.log('Error')
            });
        //$http.post(signUpUrl, newUser).
        //    success(function(response) {
        //        console.log('All OK')
        //    }).
        //    error(function(response) {
        //        console.log('Error')
        //    });
    }
}]);
