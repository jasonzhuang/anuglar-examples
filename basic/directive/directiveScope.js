/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var app = angular.module('myApp',[]);

app.controller("ChoreCtrl", function($scope){
    $scope.logChore = function(chore){
        alert(chore + " is done!");
    };
});

/**
 * scope @
 */
app.directive("kid", function() {
    return {
        restrict: "E",
        scope: {
            doStuff: "@done"// {localName: '@attrName'}
        },
        template: '<input type="text" ng-model="chore">' +
            '{{chore}}' +
            '<div class="button" ng-click="doStuff({chore: chore})">I\'m done</div>'
    };
});

/**
 * scope =
 * Must pass an object, not {{string}}
 * in the template, must refer localName, namely 'myFlavor'
 */
app.controller("AppCtrl", function ($scope) {
    $scope.ctrlFlavor = "blackberry";
})

app.directive('drink', function(){
  return {
      scope:{
        myFlavor:'=flavor'//{localName: '@attrName'}
      },
      template:'<input type="text" ng-model="myFlavor"> '
  }
})

/**
 * scope &
 */
app.controller("AppCtrl2", function ($scope) {
    $scope.callMe = function(message) {
        console.log(message);
    }
});

app.directive("phone", function () {
    return {
        scope: {
            dial: "&"
        },
        template: '<input type="text" ng-model="inputMessage">' +
            '<div class="button" ng-click="dial({message:inputMessage})">Call home!</div>'
    };
});