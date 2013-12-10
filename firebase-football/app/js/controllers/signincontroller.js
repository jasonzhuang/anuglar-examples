'use strict';

angular.module('fantasyApp.controllers.signin', ['fantasyApp.services.login'])
  .controller('SigninCtrl', ['$scope', 'loginService', '$location', '$rootScope',
    function($scope, loginService, $location) {

      $scope.$on('angularFireAuth:login', function () {
          // in the angularFire.js source code, $rootScope.$broadcast("angularFireAuth:login", user);
          console.log("user login, $scope !== $rootScope");
          $location.path('/');
      })

      $scope.email = null;
      $scope.pass = null;
      $scope.name = null;

      $scope.login = function(callback) {
        $scope.err = null;
        loginService.login($scope.email, $scope.pass, '/', function(err, user) {
          $scope.err = err||null;
          typeof(callback) === 'function' && callback(err, user);
        });
      };
    }])
  