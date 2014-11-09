(function(){
  'use strict';

  angular.module('friendswipe.controllers', ['openfb'])

  .controller('SwipeCtrl', function($scope, $rootScope, TDCardDelegate, OpenFB, SwipeApi, $http){


    OpenFB.api({path:'/me'}).then(function(data){
      console.log(data.data.id);
      $rootScope.myFacebookId = data.data.id;
      OpenFB.api({path:'/me/friends'}).then(parseFriends, errorHandler);
    }, function(data){
      console.log(data);
    });
    //OpenFB.api({path:'/me/friends'}).then(parseFriends, errorHandler);
    //parseFriends({test:'test'});


    console.log('SWIPE CTRL');

    /*
    var cardTypes = [
      {image: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'},
      {image: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'},
      {image: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'}
    ];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0);
    */

    console.log('$scope.cards ', $scope.cards);

    var cardTypes;

    $scope.cardDestroyed = function(index){
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function(){
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    };

    function parseFriends(friendData){
      // friendData.data = [{name:, id:}]
      // console.log('FB FRIEND DATA', friendData);
      $scope.friends = friendData.data.data;

      $http.get('http://friendswipe-php.herokuapp.com?swipes&sender=' + $rootScope.myFacebookId).then(parseSwipes, swipesFail);
      function parseSwipes(sData){
        console.log('parseSwipes data', sData.data);
        var recipientIds = sData.data.map(function(obj){return obj.recipient;});
        console.log('ids array', recipientIds);
        console.log('unfiltered $scope.friends', $scope.friends);
        $scope.friends = _.reject($scope.friends, function(fObj){return recipientIds.indexOf(parseInt(fObj.id)) !== -1;});
        $rootScope.fbFriendsArray = $scope.friends;
        console.log('filtered $scope.friends', $scope.friends);
      }
      function swipesFail(data){
        console.log('shit went bad in parseFriends');
      }

      cardTypes = $scope.friends;
      $scope.cards = Array.prototype.slice.call(cardTypes, 0);
      console.log('$scope.cards ', $scope.cards);
      console.log('$scope.friends', $scope.friends);
    }
    /*
    function parseFriends(friendData){
      // friendData.data = [{name:, id:}]
      console.log('FB FRIEND DATA', friendData);
      $scope.friends = friendData.data.data;
      cardTypes = $scope.friends;
      $scope.cards = Array.prototype.slice.call(cardTypes, 0);
      console.log('$scope.cards ', $scope.cards);
      console.log('$scope.friends', $scope.friends);
    }
    */

    function errorHandler(a, b, c, d){
      console.log('shit went south', a, b, c, d);
    }
  })

  .controller('CardCtrl', function($scope, TDCardDelegate, $http, $rootScope){
    console.log('CARD CTRL');

    $scope.cardSwipedLeft = function(index){
      console.log('LEFT SWIPE');
      console.log('this is the index', index);
      console.log('HTTP LOG', {swipe: true, choice: 'ignore', sender: parseInt($rootScope.myFacebookId), recipient:1});
      $http.post('http://friendswipe-php.herokuapp.com/?swipe&choice=ignore&sender='+$rootScope.myFacebookId+'&recipient='+$rootScope.fbFriendsArray[index].id).then(function(data){console.log(data);});

      //$scope.addCard();
    };

    $scope.cardSwipedRight = function(index){
      console.log('RIGHT SWIPE');
    };

  })


  .controller('MatchCtrl', function($scope, $ionicListDelegate){
    $scope.matches = [
      {'name': 'Bob'},
      {'name': 'alice'},
      {'name': 'suzy'},
      {'name': 'joe'}
    ];
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
      OpenFB.login('public_profile,email,user_photos,read_stream,user_friends').then(
        function(){
          $location.path('/menu');
        },
        function(){
          alert('OpenFB login failed');
        });
    };

  });
})();
