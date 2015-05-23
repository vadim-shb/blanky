'use strict';

angular.module('validationModule', []).service('isValid', function() {

    this.email = function(email) {
        var regExpEmail = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        return regExpEmail.test(email);
    };

});
