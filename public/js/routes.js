'use strict';

angular.module('wtf', ['ui.bootstrap', 'ui.router', 'ngNotify', 'angular-loading-bar', 'ngCookies', 'angularMoment'])

    .run(['$rootScope', '$cookieStore', '$location', '$http', 'ngNotify',
        function ($rootScope, $cookieStore, $location, $http, ngNotify) {

            ngNotify.config({
                theme: 'pure',
                position: 'bottom',
                duration: 1000,
                type: 'info',
                sticky: false,
                html: false
            });
            
            var host = window.location.host;
            
            $rootScope.serviceUrl = "http://" + host + "/vtys_WhatTheFood/api";
            $rootScope.globals = $cookieStore.get("globals") || {};

            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common["token"] = $rootScope.globals.currentUser.token;
            }

            $rootScope.$on('$locationChangeStart', function () {
                // Check for user is signed in or not
                if ($location.path() == "/register" && !$rootScope.globals.currentUser) {
                    $location.path("/register");
                }else if ($location.path() != "/login" && !$rootScope.globals.currentUser) {
                    $location.path("/login");
                }
                if ($location.path() == "/login" && $rootScope.globals.currentUser) {
                    $location.path('/');
                }
            });


        }
    ])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            // For unmatched routes
            $urlRouterProvider.otherwise('/');

            // Application routes
            $stateProvider
                .state('index', {
                    url: '/',
                    views: {
                        "header": {
                            templateUrl: "templates/header/header.html",
                            controller: "HeaderCtrl"
                        },
                        "footer": {
                            templateUrl: "templates/footer/footer.html",
                            controller: "FooterCtrl"
                        },
                        "content": {
                            templateUrl: "templates/home/home.html",
                            controller: "HomeCtrl"
                        }
                    }
                })
                .state('about', {
                    url: '/about',
                    views: {
                        "header": {
                            templateUrl: "templates/header/header.html",
                            controller: "HeaderCtrl"
                        },
                        "footer": {
                            templateUrl: "templates/footer/footer.html",
                            controller: "FooterCtrl"
                        },
                        "content": {
                            templateUrl: "templates/about/about.html",
                            controller: "AboutCtrl"
                        }
                    }
                })
                .state('profile', {
                    url: '/profile',
                    views: {
                        "header": {
                            templateUrl: "templates/header/header.html",
                            controller: "HeaderCtrl"
                        },
                        "footer": {
                            templateUrl: "templates/footer/footer.html",
                            controller: "FooterCtrl"
                        },
                        "content": {
                            templateUrl: "templates/profile/profile.html",
                            controller: "UserCtrl"
                        }
                    }
                })

                .state('food_detail', {
                    url: '/food/:food_id',
                    views: {
                        "header": {
                            templateUrl: "templates/header/header.html",
                            controller: "HeaderCtrl"
                        },
                        "footer": {
                            templateUrl: "templates/footer/footer.html",
                            controller: "FooterCtrl"
                        },
                        "content": {
                            templateUrl: "templates/food/detail.html",
                            controller: "FoodCtrl"
                        }
                    }
                })

                .state('login', {
                    url: '/login',
                    views: {
                        "full": {
                            templateUrl: "templates/user/login.html",
                            controller: "LoginCtrl"
                        }
                    }
                })
                .state('register', {
                    url: '/register',
                    views: {
                        "full": {
                            templateUrl: "templates/user/register.html",
                            controller: "RegisterCtrl"
                        }
                    }
                })
                .state('logout', {
                    url: '/logout',
                    views: {
                        "full": {
                            templateUrl: "templates/user/login.html",
                            controller: "LoginCtrl"
                        }
                    }
                })

        }
    ]);