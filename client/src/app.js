'use strict';

angular
    .module('webClient', [
        'ngRoute',
        'languageModule'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sign-up', {templateUrl: 'components/sign-up/sign-up.html', controller: 'signUpCtrl'});
        $routeProvider.otherwise({redirectTo: '/sign-up'});
    }]);
