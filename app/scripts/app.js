'use strict';

/**
 * @ngdoc overview
 * @name angular1App
 * @description
 * # angular1App
 *
 * Main module of the application.
 */
var app=angular
  .module('angular1App', [
    'ngRoute',
    'ui.router',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch'
  ]);

app.config(config);
config.$inject=['$stateProvider','$urlRouterProvider','$locationProvider'];
function config($stateProvider,$urlRouterProvider,$locationProvider){
        $stateProvider
           .state('login',{
            url:'/login',
            templateUrl:'views/login.html',
            controller:'loginCtrl'
            })
            .state('admin',{
            url:'/admin',
            templateUrl:'views/admin.html',
            controller:'adminCtrl'
            })
            .state('user',{
            url:'/user',
            templateUrl:'views/user.html',
            controller:'userCtrl'
            })

            $urlRouterProvider.otherwise("/login");
}


  // .config(function ($stateProvider,$urlRouterProvider) {
  //   $stateProvider
  //     .when('/', {
  //       templateUrl: 'views/main.html',
  //       controller: 'MainCtrl',
  //       controllerAs: 'main'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  // });
