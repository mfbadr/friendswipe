angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope){
})

.controller('FriendsCtrl', function($scope, Friends){
  'use strict';
  $scope.friends = Friends.all();

})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends){
  'use strict';
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope){
})

.controller('SwipeCtrl', function($scope){
})

.controller('MatchCtrl', function($scope){
})

.controller('MenuCtrl', function($scope){
});
