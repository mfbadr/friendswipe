(function(){
  'use strict';
  angular.module('friendswipe', ['ionic', 'openfb', 'friendswipe.controllers', 'friendswipe.services'])

  .run(function($rootScope, $state, $ionicPlatform, $window, OpenFB){
    OpenFB.init('800505460012061');

    $ionicPlatform.ready(function(){
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar){
        StatusBar.styleDefault();
      }
    });

    $rootScope.$on('$stateChangeStart', function(event, toState){
      if(toState.name !== 'login' && toState.name !== 'logout' && !$window.sessionStorage.fbtoken){
        $state.go('login');
          event.preventDefault();
        }
    });

    $rootScope.$on('OAuthException', function(){
      $state.go('login');
    });

  })

  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider

      //Menu state
      .state('init',{
        url: '/init',
        templateUrl: 'templates/init.html',
        controller: 'AppCtrl'
      })

      .state('menu',{
        url: '/menu',
        templateUrl: 'templates/menu.html',
        controller: 'MenuCtrl'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

      .state('logout', {
        url: '/logout',
        templateUrl: 'templates/logout.html',
        controller: 'LogoutCtrl'
      })

      .state('swipe',{
        url: '/swipe',
        templateUrl: 'templates/swipe.html',
        controller: 'SwipeCtrl'
      })

      .state('match',{
        url: '/match',
        templateUrl: 'templates/match.html',
        controller: 'MatchCtrl'
      });

      /*
      .state('header.swipe',{
        url: '/swipe',
        templateUrl: 'templates/swipe.html',
        controller: 'SwipeCtrl'
        views: {
          'header-swipe': {
            templateUrl: 'templates/swipe.html',
            controller: 'SwipeCtrl'
          }
        }
      })
      */
       //*******************************
      ///********************************

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/menu');
  });

})();
