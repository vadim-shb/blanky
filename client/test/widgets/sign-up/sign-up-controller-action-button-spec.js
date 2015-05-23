describe('Sign up controller', function() {
    var underTest, $httpBackend, $scope;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        var $http = $injector.get('$http');
        var $mod_lang = $injector.get('$mod_lang');

        $httpBackend = $injector.get('$httpBackend');
        $scope = {};

        underTest = $controller('SignUpCtrl', {$scope: $scope, $http: $http, $mod_lang: $mod_lang});
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
                password: 'securePassword',
                lang: 'en'
            },
            hasError: {
                name: false,
                email: false,
                password: false
            }
        };
        // AND server response for sign-up request
        $httpBackend.when('POST', 'http://localhost:8085/api/sign-up').respond({});

        // WHEN push sign-up button
        $scope.signUpUser();

        // THEN send sign-up http request
        $httpBackend.expectPOST('http://localhost:8085/api/sign-up', $scope.user.data);
        $httpBackend.flush();
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

    it('should verify user name before send sign-up request to server', function() {
        // GIVEN invalid user name in scope. No errors found yet.
        $scope.user = {
            data: {
                name: '',
                email: 'someone@example.com',
                password: 'securePassword',
                lang: 'en'
            },
            hasError: {
                name: false,
                email: false,
                password: false
            }
        };

        // WHEN push sign-up button
        $scope.signUpUser();

        // THEN hasError.name marked as error message
        expect($scope.user.hasError.name).toBe('msg_nameOfUserShouldBeFilledIn');

        // AND don't send sign-up http request
    });

    it('should verify email before send sign-up request to server', function() {
        // GIVEN invalid email in scope. No errors found yet.
        $scope.user = {
            data: {
                name: 'User Name',
                email: '',
                password: 'securePassword',
                lang: 'en'
            },
            hasError: {
                name: false,
                email: false,
                password: false
            }
        };

        // WHEN push sign-up button
        $scope.signUpUser();

        // THEN hasError.email section mark true
        expect($scope.user.hasError.email).toBe('msg_emailShouldBeFilledIn');

        // AND don't send sign-up http request
    });

    it('should verify password before send sign-up request to server', function() {
        // GIVEN invalid email in scope. No errors found yet.
        $scope.user = {
            data: {
                name: 'User Name',
                email: 'someone@example.com',
                password: '',
                lang: 'en'
            },
            hasError: {
                name: false,
                email: false,
                password: false
            }
        };

        // WHEN push sign-up button
        $scope.signUpUser();

        // THEN hasError.password section mark true
        expect($scope.user.hasError.password).toBe('msg_passwordShouldBeFilledIn');

        // AND don't send sign-up http request
    });
});
