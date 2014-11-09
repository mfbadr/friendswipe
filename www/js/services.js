(function(){
  'use strict';
  angular.module('friendswipe.services', ['openfb'])

  .factory('FBApi', function(OpenFB){
    var o = {};

    return o;
  })

  .factory('SwipeApi', function($http, $rootScope, OpenFB){
    var o = {
      getSwipes: getSwipes
    };

    function getSwipes(){
      // do stuff;
    }

    return o;
  });
})();
