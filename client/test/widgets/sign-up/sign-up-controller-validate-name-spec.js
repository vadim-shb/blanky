describe('Sign up controller', function() {
    var underTest, $scope;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        var $mod_lang = $injector.get('$mod_lang');

        $scope = {};

        underTest = $controller('SignUpCtrl', {$scope: $scope, $mod_lang: $mod_lang});
    }));

    it('should validate not empty name as "valid"', function() {
        // GIVEN not empty name in scope. Errors found before.
        $scope.user = {
            data: {
                name: 'John'
            },
            hasError: {
                name: true
            }
        };

        // WHEN validating name
        $scope.validateName();

        // THEN hasError.name section mark false
        expect($scope.user.hasError.name).toBeFalsy();
    });

    it('should validate empty name as "invalid"', function() {
        // GIVEN empty name in scope. No errors found yet.
        $scope.user = {
            data: {
                name: ''
            },
            hasError: {
                name: false
            }
        };

        // WHEN validating user name
        $scope.validateName();

        // THEN hasError.name marked as error message
        expect($scope.user.hasError.name).toBe('msg_nameOfUserShouldBeFilledIn');
    });
});
