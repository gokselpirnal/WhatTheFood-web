/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('FoodCtrl', ['$scope', 'FoodService', 'CategoryService', 'UserService', '$state', '$stateParams', '$rootScope', '$location', '$cookies', '$http',
        function ($scope, FoodService, CategoryService, UserService, $state, $stateParams, $rootScope, $location, $cookies, $http) {

            $scope.profile = {};
            $scope.foods = {};
            $scope.food = {};
            $scope.newFood = {};
            $scope.page = 0;
            $scope.categories = [];
            $scope.selectedCategoryName = "Kategori Seçiniz";
            $scope.material = '';
            $scope.isLastPage = false;

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

            $scope.detail = function (foodId) {
                foodId = (foodId || $stateParams.foodId);
                FoodService.detail(foodId, function (response) {
                    $scope.food = response;
                });
            };

            $scope.getUserProfile = function (userId) {
                UserService.profile(userId, function (response) {
                    return response;
                });
            };

            $scope.saveFood = function () {
                FoodService.create($scope.newFood, function (response) {
                    if (!response.error) {
                        console.log(response);
                        $scope.food = response;
                    }
                })
            };

            $scope.getFoodsFromCategoryId = function () {
                if ($scope.isLastPage) {
                    return;
                }
                CategoryService.getFoods($stateParams.categoryId, $scope.page++, function (response) {
                    if (!response.error) {
                        console.log(response);
                        if (response.length == 0 || response.length < 6)
                            $scope.isLastPage = true;
                        Array.prototype.push.apply($scope.foods, response);
                    }
                });
            };

            $scope.getCategories = function () {
                if ($rootScope.categories) {
                    $scope.categories = $rootScope.categories;
                    return;
                }
                CategoryService.getAll(function (response) {
                    if (!response.error) {
                        $scope.categories = response;
                    }
                });
            };

            $scope.setCategory = function (category) {
                $scope.newFood.category_id = category.category_id;
                $scope.selectedCategoryName = category.name;
            };

            $scope.addMaterial = function (material) {
                if (!material)
                    return;
                if (!$scope.newFood.materials) {
                    $scope.newFood.materials = material;
                } else {
                    $scope.newFood.materials += '\n' + material;
                }
                $scope.material = '';
            };

        }]);