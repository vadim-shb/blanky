'use strict';

angular
    .module('webClient', [
        'ngRoute',
        'languageModule',
        'validationModule'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sign-up', {templateUrl: 'pages/sign-up/sign-up.html'});
        $routeProvider.otherwise({redirectTo: '/sign-up'});
    }]);
