/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('FoodCtrl', ['$scope', 'FoodService', '$state', '$stateParams', '$rootScope', '$location', '$cookies', '$http',
        function ($scope, FoodService, $state, $stateParams, $rootScope, $location, $cookies, $http) {

            $scope.profile = {};
            $scope.foods = {};
            $scope.food = {};
            $scope.page = 0;

            $scope.getPage = function (page) {
                $scope.page = page;
                FoodService
                    .profile(page, function (response) {
                        if (!response.error) {
                            if (response.user_id) {
                                $scope.profile = response;
                            }
                        }
                    })
            };

            $scope.detail = function () {
                FoodService.detail($stateParams.foodId, function (response) {
                    if (!response.error) {
                        $scope.food = response;
                    }
                })
            };

        }]);