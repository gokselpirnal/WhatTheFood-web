/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('LoginCtrl', ['$scope', 'LoginService', '$rootScope', '$location', '$cookies', '$http',
        function ($scope, LoginService, $rootScope, $location, $cookies, $http) {

            var url = window.location.hash;

            if (url == "#/logout") {
                $cookies.putObject('globals', {});
            }

            $scope.user = {
                email: "",
                password: ""
            };

            $scope.login = function (user) {

                var email = user.email;
                var password = user.password;

                LoginService
                    .login(email, password, function (response) {
                        if (!response.error) {
                            LoginService.setCredentials(response);
                            $cookies.putObject('globals', $rootScope.globals);

                            // http isteklerinin headerına token ekle
                            $http.defaults.headers.common["token"] = $rootScope.globals.currentUser.token;

                            $location.path('/');
                        }
                    })
            }

        }]);