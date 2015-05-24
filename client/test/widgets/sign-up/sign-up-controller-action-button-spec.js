describe('Sign up controller', function() {
    var underTest, $httpBackend, $scope, $location;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        localStorage.clear();
        var $controller = $injector.get('$controller');
        var $http = $injector.get('$http');
        var $mod_lang = $injector.get('$mod_lang');

        $httpBackend = $injector.get('$httpBackend');
        $scope = {};
        $location = {path: jasmine.createSpy()};

        underTest = $controller('SignUpCtrl', {$scope: $scope, $http: $http, $mod_lang: $mod_lang, $location: $location});
    }));


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send valid sign-up request to server', function() {
        // GIVEN valid sign-up user data in scope
        $scope.user = {
            data: {
                name: 'User Name',
                email: 'someone@example.com',
                password: 'securePassword'
            },
            hasError: {
                name: false,
                email: false,
                password: false
            }
        };
        // AND server response for sign-up request
        var savedUser = {id: 1};
        $httpBackend.when('POST', 'http://localhost:8085/api/sign-up').respond(savedUser);

        // AND russian lang in local storage
        localStorage.setItem('lang', 'ru');

        // WHEN push sign-up button
        $scope.signUpUser();

        // THEN send sign-up http request with russian language in
        var requestWithLang = angular.copy($scope.user.data);
        requestWithLang.lang = 'ru';
        $httpBackend.expectPOST('http://localhost:8085/api/sign-up', requestWithLang);
        $httpBackend.flush();

        // AND redirect to main page
        expect($location.path).toHaveBeenCalledWith('/main');

        // AND registered user id in local storage
        expect(JSON.parse(localStorage.getItem('user'))).toEqual(savedUser);

    });

    it('should not send invalid sign-up request to server', function() {
        // GIVEN valid sign-up user data in scope
        $scope.user = {
            data: {
                name: '',
                email: 'someone@example.com',
                password: 'securePassword',
                lang: 'en'
            },
            hasError: {
                name: 'error_message_link',
                email: false,
                password: false
            }
        };

        // WHEN push sign-up button
        $scope.signUpUser();

        // THEN do not send sign-up http request
    });

    it('should verify all params before send sign-up request to server', function() {
        // GIVEN invalid user name in scope. No errors found yet.
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

        // AND validation functions
        spyOn($scope, 'validateName').and.callThrough();
        spyOn($scope, 'validateEmail').and.callThrough();
        spyOn($scope, 'validatePassword').and.callThrough();

        // WHEN push sign-up button
        $scope.signUpUser();

        // THEN all validation functions have been called
        expect($scope.validateName).toHaveBeenCalled();
        expect($scope.validateEmail).toHaveBeenCalled();
        expect($scope.validatePassword).toHaveBeenCalled();

        // AND don't send sign-up http request
    });

});
