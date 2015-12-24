/**
 * Created by Gox-PC on 23.12.2015.
 */

angular.module('wtf')
    .factory('UserService', ['$http', '$rootScope', function ($http, $rootScope) {

        var service = {};

        service.profile = function (callback) {
            $http({
                method: 'GET',
                url: $rootScope.serviceUrl + "/user/" + $rootScope.globals.currentUser._id + "/profile",
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response.data);
                })

        };

        service.foods = function (callback) {
            $http({
                method: 'GET',
                url: $rootScope.serviceUrl + "/user/" + $rootScope.globals.currentUser._id + "/foods/0",
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response.data);
                })

        };

        return service;

    }]);