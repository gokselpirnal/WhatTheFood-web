/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('HeaderCtrl', ['$scope', '$rootScope', '$cookies', 'CategoryService', function ($scope,$rootScope, $cookies, CategoryService) {

        $scope.title = "WhatTheFood";
        $scope.user = $cookies.getObject("globals").currentUser;

        $scope.getCategories = function () {
            CategoryService.getAll(function (response) {
                $scope.categories = response;
                $rootScope.categories = $scope.categories;
            });
        };

        if(!$rootScope.categories){
            $scope.getCategories();
        }

    }]);