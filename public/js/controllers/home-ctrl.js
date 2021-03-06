/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('HomeCtrl', ['$scope', 'HomeService', '$rootScope', '$location', '$cookies', '$http',
        function ($scope, HomeService, $rootScope, $location, $cookies, $http) {

            $scope.latestFoods = [];
            $scope.searchedFoods = undefined;
            $scope.searchText = '';

            $scope.latestFoods = function () {
                HomeService.latestFoods(function (response) {
                    if (!response.error) {
                        $scope.latestFoods = response;
                    }
                })
            };

            $scope.search = function (searchText) {
                HomeService.search(searchText,function (response) {
                    if (!response.error) {
                        $scope.searchedFoods = response;
                    }
                })
            };

            $scope.latestFoods();

        }]);