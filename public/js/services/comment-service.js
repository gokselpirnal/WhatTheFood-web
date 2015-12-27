/**
 * Created by Gox-PC on 23.12.2015.
 */

angular.module('wtf')
    .factory('CommentService', ['$http', '$rootScope', function ($http, $rootScope) {

        var service = {};

        service.create = function (comment, callback) {
            $http({
                method: 'POST',
                url: $rootScope.serviceUrl + '/comment',
                data: comment,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response);
                })

        };

        service.remove = function (commentId, callback) {
            $http({
                method: 'DELETE',
                url: $rootScope.serviceUrl + "/comment/" + commentId,
                data: null,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function successCallback(response) {
                    callback(response);
                })

        };

        return service;

    }]);