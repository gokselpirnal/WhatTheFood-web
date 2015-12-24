/**
 * Created by Gox-PC on 23.12.2015.
 */

angular.module('wtf')
    .factory('LoginService', ['$http', '$rootScope', function ($http, $rootScope) {

        var service = {}

        service.login = function (email, password, callback) {
            var user = {email: email, password: password};
            $http({
                method: 'POST',
                url: $rootScope.serviceUrl + "/login",
                data: user,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response.data);
                })

        };

        service.setCredentials = function (user) {
            $rootScope.globals = {
                currentUser: {
                    _id: user.user_id,
                    email: user.email,
                    token: user.token.token
                }
            };
        };

        return service;

    }]);