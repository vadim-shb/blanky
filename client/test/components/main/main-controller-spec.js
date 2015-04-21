describe('main-controller-spec', function() {
    //var $rootScope;
    var controller, $httpBackend, $http, $scope;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        var $controllers = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        $http = $injector.get('$http');

        //scope of tested controller
        $scope = {};

        // tested controller
        controller = $controllers('mainCtrl', {$scope: $scope, $http: $http});
    }));

    afterEach(function() {
        $httpBackend.flush();
    });


    it('should send sign-up request to server', function() {

        // GIVEN sign-up user data in scope
        var signUpUser = {
            name: 'User Name',
            email: 'someone@example.com',
            password: 'securePassword',
            lang: 'en'
        };
        $scope.user = signUpUser;

        // AND server response for sign-up request
        $httpBackend.when('POST', 'http://localhost:8085/api/sign-up').respond({});

        // WHEN push sign-up button
        $scope.signUpUser();

        // THEN send sign-up http request
        $httpBackend.expectPOST('http://localhost:8085/api/sign-up', signUpUser);
    })
});
