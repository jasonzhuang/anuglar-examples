/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
angular.module('timedown',[])
    .controller('TimeCtrl', function($scope){
        var time = new Date();
        time.setDate(18);
        $scope.endTime = time;
    })
    .directive('timedown',['$compile', function($compile){
         return {
             restrict:'E',
             scope: {
                 interval: '=interval',
                 endTime: '=endTime'
             },
             controller: ['$scope','$element','$attrs' ,function(scope, elem, attrs){
                 console.log(elem);
                 if (elem.html().trim().length === 0) {
                     elem.append($compile('<span>{{millis}}</span>')(scope));
                 }

                 scope.startTime = null;
                 scope.timeoutId = null;

                 function resetTimeout() {
                     if (scope.timeoutId) {
                         clearTimeout(scope.timeoutId);
                     }
                 }

                 scope.start = elem[0].start = function () {
                     scope.endTime = scope.endTime ? new Date(scope.endTime) : new Date();
                     resetTimeout();
                     tick();
                 };

                 function calculateTimeUnits() {
                     scope.seconds = Math.floor((scope.millis / 1000) % 60);
                     scope.minutes = Math.floor(((scope.millis / (60000)) % 60));
                     scope.hours = Math.floor(((scope.millis / (3600000)) % 24));
                     scope.days = Math.floor(((scope.millis / (3600000)) / 24));
                 }

                 function endCount(){
                     scope.seconds = scope.minutes = scope.hours = scope.days = 0;
                 }

                 var tick = function(){
                     scope.millis = scope.endTime - new Date();
                     var adjustment = scope.millis % 1000;
                     calculateTimeUnits();
                     if(scope.seconds < 0){
                         resetTimeout();
                         endCount();
                     }
                     scope.timeoutId = setTimeout(function () {
                         tick();
                         scope.$digest();
                     }, scope.interval - adjustment);
                 };

                 scope.start();
             }]
         };
    }]);