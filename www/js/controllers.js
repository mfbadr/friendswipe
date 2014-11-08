(function(){
  'use strict';

  angular.module('friendswipe.controllers', [])

  .controller('SwipeCtrl', function($scope){
  })

  .controller('MatchCtrl', function($scope){
  })

  .controller('MenuCtrl', function($scope){
  })

  .controller('AppCtrl', function($scope, $state, OpenFB){

    $scope.logout = function(){
      OpenFB.logout();
      $state.go('app.login');
    };

    $scope.revokePermissions = function(){
      OpenFB.revokePermissions().then(
        function(){
          $state.go('app.login');
        },
        function(){
          alert('Revoke permissions failed');
        });
    };
  })

  .controller('LoginCtrl', function($scope, $location, OpenFB){

    $scope.facebookLogin = function(){
      OpenFB.login('email,read_stream,publish_stream').then(
        function(){
          $location.path('/app/person/me/feed');
        },
        function(){
          alert('OpenFB login failed');
        });
    };

  });
})();
