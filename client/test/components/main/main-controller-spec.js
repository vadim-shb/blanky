describe('main-controller-spec', function() {
    //var $rootScope;
    var $controller;
    beforeEach(module('webClient'));
    beforeEach(inject(function($injector) {
        //
        //    $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        //    $scope = $rootScope.$new();
        //
    }));


    it('should initiate with "Thats something" words', function() {
        var scope = {};
        $controller('mainCtrl', {$scope: scope});
        expect(scope.something).toBe("That's something");
    })
});
