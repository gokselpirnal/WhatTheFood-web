/**
 * Created by Gox-PC on 23.12.2015.
 */

angular.module('wtf')
    .controller('MasterCtrl', ['$scope', '$cookies', MasterCtrl]);

function MasterCtrl($scope, $cookies) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    var welcome = (window.location.hash == "#/login" || window.location.hash == "#/register") ? true : false;
    var random  = Math.floor(Math.random() * 6);

    console.log(welcome)
    console.log(random)

    $scope.getWidth = function () {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function (newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookies.get('toggle'))) {
                $scope.toggle = !$cookies.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function () {
        $scope.toggle = !$scope.toggle;
        $cookies.put('toggle', $scope.toggle);
    };

    window.onresize = function () {
        $scope.$apply();
    };
}