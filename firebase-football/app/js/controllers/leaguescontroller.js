/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
angular.module('fantasyApp.controllers.leagues', ['fantasyApp.services.leagues'])
    .controller('LeaguesController', ['$scope','$routeParams', '$location', 'angularFire', 'Leagues',
        function($scope, $routeParams, $location, angularFire, Leagues) {

            $scope.league = {};
            $scope.leagueId = $routeParams.leagueId;

            $scope.findLeagues = function() {
                $scope.leagues = Leagues.collection();
            }

            $scope.findOneLeague = function (leagueId) {
                if(!!$scope.leagueId) {
                    angularFire(Leagues.find($routeParams.leagueId), $scope, 'league')
                }
            }

            $scope.createLeague = function() {
                var leagueId = Leagues.create($scope.league, $scope.auth, function(err){
                   if(!err){
                       $scope.league = null;
                       $location.path('/leagues/'+leagueId);
                       $scope.$apply();
                   }
                });
            }

            $scope.removeLeague = function(leagueId) {
                Leagues.removeLeague(leagueId);
            }
        }])