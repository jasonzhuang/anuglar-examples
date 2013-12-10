/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
'use strict';
angular.module('fantasyApp.controllers.nfl', ['fantasyApp.services.nfl'])
    .controller('NFLController', ['$scope','$routeParams','NFL',
        function($scope, $routeParams, NFL) {
            $scope.nflteams = NFL.teams;
            $scope.nflteam = NFL.teams[$routeParams['nflTeamId']];
        }]);