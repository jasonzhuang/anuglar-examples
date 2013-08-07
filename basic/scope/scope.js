//http://www.thinkster.io/pick/51dc70a1fc30e44f96000001/digest
var app = angular.module('app',[]);

app.config(function() {
    console.log('Config reached!');
    })
    .controller('Ctrl', function ($scope, $timeout, $http) {
        var ctr = 0;
        var make_request = function() {
            $http({
                url: "http://google.com",
                method: "GET"
            }).success(console.log("GET request success!"));
        };
        // app-wide $digest() watcher
        $scope.$watch(function () {
            ctr += 1;
            console.log("digest called " + ctr);
        });
        $timeout(function() {
            make_request();
            console.log('End timeout!');
        }, 2000);
    });

app.controller('MyCtrl', function($scope){
   console.log($scope);
});

app.directive('myDirective', function($http){
    return {
        link: function(scope, element){  // in the argument, the order is important. The first argument is always scope, no matter what you name it, same as the other argument
            console.log(scope);
            console.log($http);
        }
    }
})