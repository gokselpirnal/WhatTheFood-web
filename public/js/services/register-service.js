/**
 * Created by Gox-PC on 23.12.2015.
 */

angular.module('wtf')
    .factory('RegisterService', ['$http', '$rootScope', function ($http, $rootScope) {

        var service = {};

        service.register = function (email, password, callback) {
            var user = {email: email, password: password};
            $http({
                method: 'POST',
                url: $rootScope.serviceUrl + "/register",
                data: user,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response.data);
                })

        };

        return service;

    }]);