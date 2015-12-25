/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('LoginCtrl', ['$scope', 'UserService', '$rootScope', '$location', '$cookies', 'ngNotify', '$http',
        function ($scope, UserService, $rootScope, $location, $cookies, ngNotify, $http) {

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

                UserService
                    .login(email, password, function (response) {
                        if(response.data.msg){
                            ngNotify.set(response.data.msg, {
                                position: 'bottom',
                                type: 'error',
                                duration: 2000,
                                button: true,
                                sticky: true
                            });
                        } else if (response.status == 200) {
                            UserService.setCredentials(response.data);
                            $cookies.putObject('globals', $rootScope.globals);

                            // http isteklerinin headerına token ekle
                            $http.defaults.headers.common["token"] = $rootScope.globals.currentUser.token;

                            $location.path('/');
                        }
                    })
            }

        }]);