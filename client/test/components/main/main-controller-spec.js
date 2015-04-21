describe('main-controller-spec', function() {
    //var $rootScope;
    var $controllers, $httpBackend, $http;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        //
        //    $rootScope = $injector.get('$rootScope');
        $controllers = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        $http = $injector.get('$http');
        //    $scope = $rootScope.$new();
        //
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
        var scope = {
            user: signUpUser
        };

        //// AND server response for sign-up request
        $httpBackend.when('POST', 'http://localhost:8085/api/sign-up').respond({});

        // WHEN push sign-up button
        var controller = $controllers('mainCtrl', {$scope: scope, $http: $http});
        scope.signUpUser();

        // THEN send sign-up http request
        $httpBackend.expectPOST('http://localhost:8085/api/sign-up', signUpUser);
    })
});
