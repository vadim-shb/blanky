'use strict';

angular.module('webClient').controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

    var signUpUrl = 'http://localhost:8085/api/sign-up';

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
