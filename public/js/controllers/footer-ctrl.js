/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('FooterCtrl', ['$scope', '$cookies', function ($scope, $cookies) {

        $scope.title = "WhatTheFood";
        $scope.user = $cookies.getObject("globals").currentUser;

    }]);