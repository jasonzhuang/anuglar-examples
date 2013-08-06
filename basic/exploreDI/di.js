var divide = function(numerator, denominator) {
  return numerator / denominator;
}

var ret = angular.injector().annotate(divide);
console.log(ret);
console.log(typeof ret);
angular.injector().annotate(divide) == ["numerator", "denominator"];

var MyController2 = ['$http', '$scope22', function($scope, $http) {
  $http.get('https://api.github.com/repos/angular/angular.js/commits')
    .success(function(commits) {
      $scope.commits = commits
    })
}]

console.log(angular.injector().annotate(MyController2));


/**
 * following is the same way
 * the second way can be more intuitive since the $scope is still injected
 */
//way1
app.controller("AppCtrl", function ($scope) {
    $scope.sayHi = function () {
        alert("hi");
    };
});

//way2:
var controllers = {};
controllers.AppCtrl = function ($scope) {
    $scope.sayHi = function () {
        alert("hi");
    };
};
app.controller(controllers);

var directives = {};
directives.panel = function () {
    return {
        restrict: "E"
    };
};
app.directive(directives);
