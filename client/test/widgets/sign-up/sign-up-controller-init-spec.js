describe('Sign up controller', function() {
    var underTest, $scope;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        $scope = {};
        underTest = $controller('SignUpCtrl', {$scope: $scope});
    }));

    it('should init with all valid form fields', function() {
        // THEN name is valid
        expect($scope.user.hasError.name).toBeFalsy();
        // AND email is valid
        expect($scope.user.hasError.email).toBeFalsy();
        // AND password is valid
        expect($scope.user.hasError.password).toBeFalsy();
        // AND all elements of form is valid
        expect($scope.user.hasError.any).toBeFalsy();
    });
});
