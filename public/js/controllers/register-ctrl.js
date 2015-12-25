/**
 * Created by Gox-PC on 14.12.2015.
 */

angular.module('wtf')
    .controller('RegisterCtrl', ['$scope', 'RegisterService', '$rootScope', '$location', '$cookies', '$http',
        function ($scope, RegisterService, $rootScope, $location, $cookies, $http) {

            $scope.user = {
                email: "",
                password: ""
            };

            $scope.msg = {show: false};

            $scope.register = function (user) {

                var email = user.email;
                var password = user.password;

                RegisterService
                    .register(email, password, function (response) {
                        if (!response.error) {
                            if (response.message) {
                                ngNotify.set('Kaydınız tamamlandı. Giriş yapabilirsiniz.', {
                                    position: 'bottom',
                                    duration: 2000,
                                    button: true,
                                    sticky: true,
                                    default:error
                                });
                            }else if(response.id){
                                ngNotify.set('Kaydınız tamamlandı. Giriş yapabilirsiniz.', {
                                    position: 'bottom',
                                    duration: 2000,
                                    button: true,
                                    sticky: true,
                                    default:error
                                });
                            }

                        }
                    })
            }

        }]);