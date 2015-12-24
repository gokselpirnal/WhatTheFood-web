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
                                $scope.msg.show = true;
                                $scope.msg.text = response.message;
                                $scope.msg.textColor = "text-danger";
                            }else if(response.id){
                                $scope.msg.show = true;
                                $scope.msg.text = "Kayıt başarılı.";
                                $scope.msg.textColor = "text-success";
                            }

                        }
                    })
            }

        }]);