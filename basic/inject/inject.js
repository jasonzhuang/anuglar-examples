var app = angular.module( 'app', [] );

//A provider is an object with a $get() method. The injector calls the $get method to create a new instance of a service.
var MyFunc = function() {
    this.name = "default name";
    this.$get = function() {
        this.name = "new name"
        return "Hello from MyFunc.$get(). this.name = " + this.name;
    };

    return "Hello from MyFunc(). this.name = " + this.name;
};

// returns the actual function
app.service( 'myService', MyFunc );

// returns the function's return value
app.factory( 'myFactory', MyFunc );

// returns the output of the function's $get function
app.provider( 'myProv', MyFunc );

function MyCtrl( $scope, myService, myFactory, myProv ) {
    $scope.serviceOutput = "myService = " + myService;
    $scope.factoryOutput = "myFactory = " + myFactory;
    $scope.providerOutput = "myProvider = " + myProv;
}

//way 1:
app.config(function($provide){
    $provide.provider('greeting', function(){
        this.$get = function(){
             return function(name) {
                 console.log("Hello, " + name);
            };
        };
    });
});

/**
//way2(same as way1):
app.provider('greeting', function(){
    this.$get = function(){
        return function(name) {
             console.log("Hello, " + name);
        };
    };
});

//way3: use factory
app.config(function($provide){
    $provide.factory('greeting', function(){
        return function(name) {
             console.log("Hello, " + name);
        };
    });
});


//way4: use value
app.config(function($provide){
    $provide.value('greeting', function(){
        console.log("Hello, " + name);
    });
});
**/

//refer angular.injector(modules). http://docs.angularjs.org/api/angular.injector
var injector = angular.injector(['app']);//Add this line, otherwise can't invoke the service
var greeting = injector.get('greeting');
greeting('Ford Prefect');
//another way:
angular.injector(['app']).invoke(function(greeting){
   greeting('Ford Prefect');
})

var divide = function(numerator, denominator) {
    return numerator / denominator;
}

var ret = angular.injector().annotate(divide);
angular.injector().annotate(divide) == ["numerator", "denominator"];

var MyController2 = ['$http', '$scope22', function($scope, $http) {
    $http.get('https://api.github.com/repos/angular/angular.js/commits')
        .success(function(commits) {
            $scope.commits = commits;
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

