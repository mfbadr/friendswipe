angular.module('friendswipe.controllers', [])

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
});
