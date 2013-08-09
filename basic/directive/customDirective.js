/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var app = angular.module('customDirective', []);

app.directive('rating', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            console.log('Recognized the rating directive usage');
        }
    }
})

