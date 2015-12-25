/**
 * Created by Gox-PC on 23.12.2015.
 */

angular.module('wtf')
    .factory('CategoryService', ['$http', '$rootScope', function ($http, $rootScope) {

        var service = {};

        service.getAll = function (callback) {
            $http({
                method: 'GET',
                url: $rootScope.serviceUrl + '/category/all',
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response.data);
                })
        };

        service.getFoods = function (categoryId, page, callback) {
            $http({
                method: 'GET',
                url: $rootScope.serviceUrl + '/category/' + categoryId + '/' + page,
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response.data);
                })
        };

        return service;

    }]);