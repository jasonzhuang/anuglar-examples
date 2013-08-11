/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var myApp = angular.module('myApp',[]);

myApp.controller('Tweet',function($scope){
    $scope.loadMore = function(){
        console.log("Loading more tweets...");
    }
})

/**
 * Transclusion Basics
 * With transclude enabled, anything that exists inside the panel element in
 * the view will be appended to the contents of whichever element in the template has the ng-transclude attribute.
 */
myApp.directive('myPanel', function(){
    return {
        restrict:'E',
        transclude:true,
        template: '<div class="panel" ng-transclude>This is panel component</div>'
    }
})

myApp.directive('enter', function () {
    return function (scope, element, attrs) {
        element.bind("mouseenter", function () {
          scope.$apply(attrs.enter);// <div enter="loadMore()"> This makes the string parameter available to us as attrs.enter in the directive
        })
    }
});

/**
 * directive talking to controller
 */
myApp.directive('superhero', function(){
    return {
        restrict:'E',
        scope: {},//isolate scope
        controller: function($scope){
            $scope.abilities = [];

            this.addStrength = function() {
                $scope.abilities.push("strength");
            }

            this.addSpeed = function(){
                $scope.abilities.push('speed');
            }

            this.addFlight = function(){
                $scope.abilities.push('flight');
            }
        },

        link: function(scope, element, attrs) {
            element.addClass('button');
            element.bind('mouseenter',function(){
                console.log(scope.abilities);
            });
        }
    }
});

myApp.directive('strength', function(){
    return {
        require: 'superhero',
        link: function(scope, element, attrs, superCtrl) {
            superCtrl.addStrength();
        }
    }
});

myApp.directive('speed', function(){
    return {
        require: 'superhero',
        link: function(scope, element, attrs, superCtrl) {
            superCtrl.addSpeed();
        }
    }
});

myApp.directive('flight', function(){
    return {
        require: 'superhero',
        link: function(scope, element, attrs, superCtrl) {
            superCtrl.addFlight();
        }
    }
});

/**
 * container and component
 */
myApp.directive('clock', function(){
   return {
       restrict:'E',
       scope:{
         timezone:'@'
       },
       template:'<div >12:00pm {{timezone}}</div>'
   }
});

myApp.directive('panel', function(){
    return {
        restrict:'E',
        scope:{
            title:'@'
        },
        transclude: true,
        template: "<div style='border: 3px solid #000000'>" +
            "<div class='alert-box'>{{title}}</div>" +
            "<div ng-transclude></div></div>"
    }
})

/**
 * directive communication
 */
myApp.directive('country', function(){
    return {
        restrict:'E',
        controller: function($scope){
           this.saySomething = function(message){
               console.log('country says: ' + message);
           }
        }
    }
})

myApp.directive('state',function(){
    return {
        restrict:'E',
        require:'^country',
        controller: function($scope){
           this.makeLaw = function(message) {
               console.log('state says: ' + message);
           }
        },
        link: function(scope, element, attrs, countryCtrl){
          countryCtrl.saySomething('This is state');
        }
    }
})

myApp.directive('city',function(){
    return {
        restrict:'E',
        require:['^country','^state'],
        link: function(scope, element, attrs, ctrls){
             ctrls[0].saySomething('This city rocks');
             ctrls[1].makeLaw('Jump');
        }
    }
})

