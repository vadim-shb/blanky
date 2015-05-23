describe('Sign up controller', function() {
    var underTest, $scope;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        var $mod_lang = $injector.get('$mod_lang');

        $scope = {};

        underTest = $controller('SignUpCtrl', {$scope: $scope, $mod_lang: $mod_lang});
    }));

    it('should validate not empty password as "valid"', function() {
        // GIVEN not empty password in scope. Errors found before.
        $scope.user = {
            data: {
                password: 'John@Smith.com'
            },
            hasError: {
                password: true
            }
        };

        // WHEN validating password
        $scope.validatePassword();

        // THEN hasError.password section mark false
        expect($scope.user.hasError.password).toBeFalsy();
    });

    it('should validate empty password as "invalid"', function() {
        // GIVEN empty password in scope. No errors found yet.
        $scope.user = {
            data: {
                password: ''
            },
            hasError: {
                password: false
            }
        };

        // WHEN validating password
        $scope.validatePassword();

        // THEN hasError.password section mark true
        expect($scope.user.hasError.password).toBe('msg_passwordShouldBeFilledIn');
    });
});
