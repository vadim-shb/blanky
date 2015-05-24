'use strict';

angular.module('webClient').controller('SignUpCtrl', ['$rootScope', '$scope', '$http', '$location', 'isValid', function($rootScope, $scope, $http, $location, isValid) {

    var signUpUrl = 'http://localhost:8085/api/sign-up';

    $scope.user = {
        data: {
            name: '',
            email: '',
            password: ''
        },
        hasError: {
            name: false,
            email: false,
            password: false
        }
    };

    $scope.signUpUser = function() {
        if (validateAll()) {
            var newUser = $scope.user.data;
            newUser.lang = localStorage.getItem('lang');
            $http.post(signUpUrl, newUser).
                success(function(response) {
                    localStorage.setItem('user', JSON.stringify(response));
                    //localStorage.setItem('authToken', response.authToken);
                    $location.path('/main');
                }).
                error(function(response) {
                    console.log('Error')
                });
        }
    };

    var validateAll = function() {
        $scope.validateName();
        $scope.validateEmail();
        $scope.validatePassword();

        return !(
            $scope.user.hasError.name ||
            $scope.user.hasError.email ||
            $scope.user.hasError.password
        );

    };

    $scope.validateName = function() {
        if ($scope.user.data.name.length == 0)
            $scope.user.hasError.name = 'msg_nameOfUserShouldBeFilledIn';
        else
            $scope.user.hasError.name = false;

    };

    $scope.validateEmail = function() {
        if ($scope.user.data.email.length == 0) {
            $scope.user.hasError.email = 'msg_emailShouldBeFilledIn';
            return;
        }
        if (!isValid.email($scope.user.data.email)) {
            $scope.user.hasError.email = 'msg_invalidEmail';
            return;
        }
        $scope.user.hasError.email = false;
    };

    $scope.validatePassword = function() {
        if ($scope.user.data.password.length == 0)
            $scope.user.hasError.password = 'msg_passwordShouldBeFilledIn';
        else
            $scope.user.hasError.password = false;
    };

}]);
