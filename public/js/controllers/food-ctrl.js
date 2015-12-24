/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('UserCtrl', ['$scope', 'FoodService', '$rootScope', '$location', '$cookies', '$http',
        function ($scope, FoodService, $rootScope, $location, $cookies, $http) {

            $scope.profile = {};
            $scope.foods = {};
            $scope.page = 0;

            $scope.getPage = function (page) {
                $scope.page = page;
                FoodService
                    .profile(page,function (response) {
                        if (!response.error) {
                            if (response.user_id) {
                                $scope.profile = response;
                            }
                        }
                    })
            };

            $scope.detail = function (foodId) {
                FoodService
                    .detail(foodId,function (response) {
                        if (!response.error) {
                            $scope.foods = response;
                        }
                    })
            };

            $scope.getPage($scope.page);
        }]);