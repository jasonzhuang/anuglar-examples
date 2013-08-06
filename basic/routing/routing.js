/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var app = angular.module('app', []);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/resolve',{
            templateUrl:'view/promise.html',
            controller:'ViewCtrl',
            resolve:{
                loadData: viewCtrl.loadData
            }
        })
        .when('/',{
            templateUrl: "app.html",
            controller: "AppCtrl"
        })
        .when('/app/:country/:province',
        {
            templateUrl: "app.html",
            controller: "CountryCtrl"
        })
        .when('/pizza', {
            redirectTo:function(routeParams, path, search){
                console.log(routeParams);
                console.log(path);
                console.log(search);
                return '/' + routeParams.crust;
            }
        }).
        when('/deep',{
            template:'Deep Page'
        }).
        otherwise({
            redirectTo:'/'
        })
});

app.controller('AppCtrl', function($scope, $q, $rootScope){
    $rootScope.$on('$routeChangeError', function(event,current,previous,rejection){
        console.log(rejection);
    });
     $scope.model = {
         message: 'This is my App!!'
     }
})

app.controller("CountryCtrl", function ($scope,$routeParams, $q, $location) {
    var defer = $q.defer();
    defer.promise.then(function(){
        console.log('this is from $q then');
    });
    defer.resolve();
    console.log($location.url());
    $scope.model = {
        message: 'Your country is ' +
                    $routeParams.country + " ," + " province is " + $routeParams.province
    }
});

var viewCtrl = app.controller('ViewCtrl',function($scope,$route){
    console.log($route);
    $scope.model = {
        message: "I'm a great app!"
    }
});

viewCtrl.loadData = function($q, $timeout){
    var defer = $q.defer();
    $timeout(function(){
      defer.resolve();
      //defer.reject('Something is down');
    }, 2000);
    return defer.promise;
}