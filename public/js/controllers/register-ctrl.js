/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('RegisterCtrl', ['$scope', 'UserService', '$rootScope', '$location', '$cookies', 'ngNotify', '$http',
        function ($scope, UserService, $rootScope, $location, $cookies, ngNotify, $http) {

            $scope.user = {
                email: "",
                password: ""
            };

            $scope.msg = {show: false};

            $scope.register = function (user) {

                var email = user.email;
                var password = user.password;

                UserService
                    .register(email, password, function (response) {
                        if (response.data.msg) {
                            ngNotify.set(response.data.msg, {
                                position: 'bottom',
                                type: 'warn',
                                duration: 2000,
                                button: true,
                                sticky: true
                            });
                        } else if (response.status == 200) {
                            ngNotify.set('Kaydınız tamamlandı. Giriş yapabilirsiniz.', {
                                position: 'bottom',
                                type: 'error',
                                duration: 2000,
                                button: true,
                                sticky: true
                            });
                            $location.path('#/login');
                        }
                    })
            }

        }]);