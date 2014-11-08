(function(){
  'use strict';

  angular.module('friendswipe.controllers', [])

  .controller('SwipeCtrl', function($scope, TDCardDelegate){

    var cardTypes = [
      {image: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'},
      {image: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'},
      {image: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'}
    ];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0);

    $scope.cardDestroyed = function(index){
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function(){
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    };

    $scope.cardDestroyed = function(index){
      $scope.cards.splice(index, 1);
    };

    $scope.cardSwipedLeft = function(index){
      console.log('LEFT SWIPE');
      $scope.addCard();
    };

    $scope.cardSwipedRight = function(index){
      console.log('RIGHT SWIPE');
      $scope.addCard();
    };
  })

  .controller('MatchCtrl', function($scope){
  })

  .controller('MenuCtrl', function($scope){
  })

  .controller('AppCtrl', function($scope, $state, OpenFB){

    $scope.logout = function(){
      OpenFB.logout();
      $state.go('login');
    };

    $scope.revokePermissions = function(){
      OpenFB.revokePermissions().then(
        function(){
          $state.go('login');
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
          $location.path('/menu');
        },
        function(){
          alert('OpenFB login failed');
        });
    };

  });
})();
