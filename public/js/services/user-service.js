/**
 * Created by Gox-PC on 23.12.2015.
 */

angular.module('wtf')
    .factory('UserService', ['$http', '$rootScope', function ($http, $rootScope) {

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
                    callback(response);
                })

        };

        service.login = function (email, password, callback) {
            var user = {email: email, password: password};
            $http({
                method: 'POST',
                url: $rootScope.serviceUrl + "/login",
                data: user,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response);
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

        service.profile = function (userId, callback) {
            $http({
                method: 'GET',
                url: $rootScope.serviceUrl + "/user/" + (userId || $rootScope.globals.currentUser._id) + "/profile",
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response.data);
                })

        };

        service.foods = function (userId, page, callback) {
            $http({
                method: 'GET',
                url: $rootScope.serviceUrl + '/user/' + (userId || $rootScope.globals.currentUser._id) + '/foods/' + (page || 0),
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response.data);
                })
        };

        service.updateProfile = function (profile, callback) {
            $http({
                method: 'PUT',
                url: $rootScope.serviceUrl + '/user/profile',
                data: profile,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response);
                })
        };

        return service;

    }]);