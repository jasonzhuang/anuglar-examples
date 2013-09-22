'use strict';

var app = angular.module('myApp',[]);

//Note: in th filter factory, we can't get the $scope
app.filter('reverse',function(){
    return function(input, upper) {//second paramter is passed through reverse:true
        var out = input.split('').reverse().join('');
        if(upper) {
            out = out.toUpperCase();
        }
        return out;
    }
})

//define filter as service, MUST name as xxxFilter, and in the html, use as XXX, NOT xxxFilter
app.factory('oddFilter', function(){
    return function(input){
        var out = [];
        for(var i=0;i<input.length; i++) {
            if(i%2 == 0){
                out.push(i);
            }
        }
        return out;
    }
})

app.filter('filmFilter',function(){
    return function(input, text){
        if(!text) {
            return input;
        }
        var result = [];
        angular.forEach(input, function(item, key){
            if(item.indexOf(text) !== -1){
                result.push(item);
            }
        });
        return result;
    };
});

app.controller("FilterCtrl",function($scope){
    $scope.films = [];
    for(var i=0;i<20;i++){
        $scope.films.push("film " + i);
    }
});

