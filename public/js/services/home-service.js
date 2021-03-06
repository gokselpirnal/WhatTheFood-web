/**
 * Created by Gox-PC on 23.12.2015.
 */

angular.module('wtf')
    .factory('HomeService', ['$http', '$rootScope', function ($http, $rootScope) {

        var service = {};


        service.latestFoods = function (callback) {
            $http({
                method: 'GET',
                url: $rootScope.serviceUrl + "/food/all/0",
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response.data);
                })
        };

        service.search = function (searchText, callback) {
            var data = {search: searchText};
            $http({
                method: 'POST',
                url: $rootScope.serviceUrl + "/food/search",
                data: data,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response.data);
                })
        };

        return service;

    }]);