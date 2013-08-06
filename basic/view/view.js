/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var app = angular.module('app',[]);

app.run(function($rootScope,$log, $templateCache){
    $rootScope.$myLog = $log;
    console.log($templateCache);
})

app.directive("dumbPassword", function () {
    var validElement = angular.element('<div>{{ model.input }}</div>');
    var link = function (scope) {
        scope.$watch("model.input", function (value) {
            if(value === "password") {
                validElement.toggleClass("alert-box alert");
            }
        });
    };
    return {
        restrict: "E",
        replace: true,
        template:'<div>\n    <input type="text" ng-model=\'model.input\'>\n</div>',
        compile: function (tElem) {
            tElem.append(validElement);
            return link;
        }
    }
});
