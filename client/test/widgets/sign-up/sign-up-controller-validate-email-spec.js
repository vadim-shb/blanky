describe('Sign up controller', function() {
    var underTest, $scope;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        var $mod_lang = $injector.get('$mod_lang');
        var isValid = $injector.get('isValid');

        $scope = {};

        underTest = $controller('SignUpCtrl', {$scope: $scope, $mod_lang: $mod_lang, isValid: isValid});
    }));

    it('should validate right email as "valid"', function() {
        // GIVEN right email in scope. Errors found before.
        $scope.user = {
            data: {
                email: 'john@smith.com'
            },
            hasError: {
                email: true
            }
        };

        // WHEN validating email
        $scope.validateEmail();

        // THEN hasError.email section mark false
        expect($scope.user.hasError.email).toBeFalsy();
    });

    it('should validate empty email as "invalid"', function() {
        // GIVEN empty email in scope. No errors found yet.
        $scope.user = {
            data: {
                email: ''
            },
            hasError: {
                email: false
            }
        };

        // WHEN validating email
        $scope.validateEmail();

        // THEN hasError.email section mark true
        expect($scope.user.hasError.email).toBe('msg_emailShouldBeFilledIn');
    });

    it('should validate invalid email as "invalid"', function() {
        // GIVEN invalid email in scope. No errors found yet.
        $scope.user = {
            data: {
                email: 'not email at all'
            },
            hasError: {
                email: false
            }
        };

        // WHEN validating email
        $scope.validateEmail();

        // THEN hasError.email section mark true
        expect($scope.user.hasError.email).toBe('msg_invalidEmail');
    });

});
