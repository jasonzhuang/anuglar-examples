/**
 * Created with JetBrains WebStorm.
 * User: yougen
 * Date: 13-8-12
 * Time: 下午8:38
 * To change this template use File | Settings | File Templates.
 */
var app = angular.module('app',[]);
app.run(['$rootScope', function($rootScope){
   $rootScope.includeLibraries = true;
}])

app.factory('myFoo',['$http', function($http){
   var foo = 'foo';
    return foo;
}])

app.factory('myBar',['$http','myFoo', function($http, foo){
    var bar ="bar2";
    return foo.toString() + bar;
}])

app.controller('Ctrl', ['$scope','myFoo', 'myBar', function($scope,myFoo,myBar){
     console.log(myBar);
    $scope.isAdmin = false;
}])

