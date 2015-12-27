/**
 * Created by Gox-PC on 23.12.2015.
 */

angular.module('wtf')
    .factory('FoodService', ['$http', '$rootScope', function ($http, $rootScope) {

        var service = {};

        service.getPage = function (page, callback) {
            $http({
                method: 'GET',
                url: $rootScope.serviceUrl + '/food/all/' + page,
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response);
                })
        };

        service.getComments = function (foodId, page, callback) {
            $http({
                method: 'GET',
                url: $rootScope.serviceUrl + '/food/' + foodId + '/comments/' + page,
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response);
                })
        };

        service.detail = function (foodId, callback) {
            $http({
                method: 'GET',
                url: $rootScope.serviceUrl + '/food/' + foodId,
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function (response) {
                    callback(response);
                });

        };

        service.create = function (food, callback) {
            $http({
                method: 'POST',
                url: $rootScope.serviceUrl + '/food',
                data: food,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response);
                })

        };

        service.update = function (food, callback) {
            $http({
                method: 'PUT',
                url: $rootScope.serviceUrl + "/food/" + food.food_id,
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response);
                })

        };

        service.remove = function (foodId, callback) {
            $http({
                method: 'DELETE',
                url: $rootScope.serviceUrl + "/food/" + foodId,
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response);
                })

        };

        return service;

    }]);