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

var app = angular.module('myDI', []);

//way 1:
app.config(function($provide){
    $provide.provider('greeting', function(){
        this.$get = function(){
             return function(name) {
                 console.log("Hello, " + name);
            };
        };
    });
});/**
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

function MainController($scope, greeting) {
  $scope.onClick = function(){
        greeting('Angular');
  };      
}/**
app.controller('MainController', function($scope, greeting){
    $scope.onClick = function(){
        greeting('Angular');
    };
});
**/
//Add this line, otherwise can't invoke the service
//refer angular.injector(modules). http://docs.angularjs.org/api/angular.injectorvar injector = angular.injector(['myDI', 'ng']);
var greeting = injector.get('greeting');
console.log(greeting);
greeting('Ford Prefect');


