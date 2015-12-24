/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('UserCtrl', ['$scope', 'UserService', '$rootScope', '$location', '$cookies', '$http',
        function ($scope, UserService, $rootScope, $location, $cookies, $http) {

            $scope.profile = {};
            $scope.foods = {};

            $scope.profile = function () {
                UserService.profile(function (response) {
                    if (!response.error) {
                        if (response.user_id) {
                            $scope.profile = response;
                        }
                    }
                })
            };

            $scope.foods = function () {
                UserService.foods(function (response) {
                    if (!response.error) {
                        $scope.foods = response;
                    }
                })
            };

            $scope.profile();
            $scope.foods();

        }]);