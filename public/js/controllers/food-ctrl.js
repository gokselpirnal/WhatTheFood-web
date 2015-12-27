/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('FoodCtrl', ['$scope', 'FoodService', 'CommentService', 'CategoryService', 'UserService', '$state', '$stateParams', '$rootScope', '$location', '$cookies', 'ngNotify', '$http',
        function ($scope, FoodService, CommentService, CategoryService, UserService, $state, $stateParams, $rootScope, $location, $cookies, ngNotify, $http) {

            $scope.profile = {};
            $scope.foods = {};
            $scope.comments = [];
            $scope.food = {};
            $scope.newFood = {};
            $scope.newComment = {};
            $scope.page = 0;
            $scope.commentsPage = 0;
            $scope.categories = [];
            $scope.selectedCategoryName = "Kategori Seçiniz";
            $scope.material = '';
            $scope.isLastPage = false;
            $scope.isLastCommentsPage = false;
            $scope.user = $cookies.getObject("globals").currentUser;

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

            $scope.getComments = function () {
                if ($scope.isLastCommentsPage) {
                    return;
                }
                FoodService.getComments($stateParams.foodId, $scope.commentsPage++, function (response) {
                    if (!response.error) {
                        console.log(response);
                        if (response.data.length == 0 || response.data.length < 10)
                            $scope.isLastCommentsPage = true;
                        Array.prototype.push.apply($scope.comments, response.data);
                    }
                });
            };


            $scope.sendComment = function (comment) {
                CommentService.create(comment, function (response) {
                    if (!response.error) {
                        console.log(response);
                        $scope.comments.unshift(response.data);
                        $scope.newComment = {};

                        ngNotify.set('Yorumunuz Kaydedildi', {
                            position: 'bottom',
                            type: 'error',
                            duration: 2000,
                            button: true,
                            sticky: true
                        });
                    }
                });
            };

            $scope.removeComment = function (commentId) {
                CommentService.remove(commentId, function (response) {
                    if (response.status == 200) {
                        ngNotify.set('Yorumunuz Silindi', {
                            position: 'bottom',
                            type: 'error',
                            duration: 2000,
                            button: true,
                            sticky: true
                        });
                    } else {
                        ngNotify.set('Yorumunuz silinemedi', {
                            position: 'bottom',
                            type: 'info',
                            duration: 2000,
                            button: true,
                            sticky: true
                        });
                    }
                })
            };


            $scope.detail = function (foodId) {
                foodId = (foodId || $stateParams.foodId);
                FoodService.detail(foodId, function (response) {
                    if (response.status == 200) {
                        $scope.food = response.data;
                    } else {
                        ngNotify.set('Tarif bulunamadı !', {
                            position: 'bottom',
                            type: 'error',
                            duration: 2000,
                            button: true,
                            sticky: true
                        });
                    }
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

                        ngNotify.set('Tarifiniz Kaydedildi', {
                            position: 'bottom',
                            type: 'error',
                            duration: 2000,
                            button: true,
                            sticky: true
                        });
                    }
                });
            };

            $scope.removeFood = function (foodId) {
                FoodService.remove(foodId, function (response) {
                    if (response.status == 200) {
                        ngNotify.set('Tarfiniz Silindi', {
                            position: 'bottom',
                            type: 'error',
                            duration: 2000,
                            button: true,
                            sticky: true
                        });
                    } else {
                        ngNotify.set('Tarfiniz silinemedi', {
                            position: 'bottom',
                            type: 'info',
                            duration: 2000,
                            button: true,
                            sticky: true
                        });
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