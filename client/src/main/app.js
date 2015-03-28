'use strict';

angular
    .module('webClient', [
        'ngRoute'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/main', {templateUrl: 'components/main/main.html', controller: 'mainCtrl'});
        $routeProvider.otherwise({redirectTo: '/main'});
    }]);
