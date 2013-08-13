/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var app = angular.module('app',[]);

app.factory('game', function(){
    var tileNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
        'that-guy', 'zeppelin'];

    return new Game(tileNames);
})

app.controller('GameCtrl', function($scope, game){
    $scope.game = game;
})

