/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('UserCtrl', ['$scope', 'UserService', '$state', '$stateParams', '$filter', '$rootScope', '$location', '$cookies', 'ngNotify', '$http',
        function ($scope, UserService, $state, $stateParams, $filter, $rootScope, $location, $cookies, ngNotify, $http) {

            $scope.profile = {};
            $scope.userFoods = {};
            $scope.page = 0;
            $scope.isLastPage = false;

            $scope.profile = function (userId) {
                userId = (userId || $stateParams.userId);
                UserService.profile(userId, function (response) {
                    if (!response.error) {
                        if (response.user_id) {
                            $scope.profile = response;
                        }
                    }
                })
            };

            $scope.foods = function () {
                if ($scope.isLastPage) {
                    return;
                }
                UserService.foods($stateParams.userId, $scope.page++, function (response) {
                    if (!response.error) {
                        console.log("response");
                        console.log(response);
                        if (response.length == 0 || response.length < 6)
                            $scope.isLastPage = true;
                        Array.prototype.push.apply($scope.userFoods, response);
                    }
                });
            };

            $scope.updateProfile = function (profile) {
                UserService.updateProfile(profile, function (response) {
                    console.log(response);

                    if (response.status == 200) {
                        ngNotify.set('Profiliniz güncellendi', {
                            position: 'bottom',
                            type: 'error',
                            duration: 4000,
                            button: true,
                            sticky: true
                        });
                        $location.path('#/profile/' + $rootScope.currentUser._id)
                    } else {
                        ngNotify.set('Profiliniz güncellenemedi', {
                            position: 'bottom',
                            type: 'error',
                            duration: 4000,
                            button: true,
                            sticky: true
                        });
                    }

                })
            };


            $scope.profile();
            $scope.foods();

        }]);