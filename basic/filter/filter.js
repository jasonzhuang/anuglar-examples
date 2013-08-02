var app = angular.module('myApp',[]);

//Note: in th filter factory, we can't get the $scope
app.filter('reverse',function(){
    return function(input, upper) {//second paramter is passed through reverse:true
        //$scope.message can't receive'
        var out = input.split('').reverse().join('');
        if(upper) {
            out = out.toUpperCase();
        }
        return out;
    }
})

function FilterCtrl($scope) {
    $scope.message = "";
}

