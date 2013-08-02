todo.directive('todoBlur', function() {
    return function(scope, elem, attrs) {
        elem.bind('blur', function() {
            scope.$apply(attrs.todoBlur);
        });
    };
});


todo.directive('todoFocus', function todoFocus($timeout) {
    return function(scope, elem, attrs) {
        scope.$watch(attrs.todoFocus, function(newVal) {
            if (newVal) {
                $timeout(function() {
                    elem[0].focus();
                }, 0, false);
            }
        });
    };
});


todo.directive('todoEscape', function() {
    var ESCAPE_KEY = 27;
    return function(scope, elem, attrs) {
        elem.bind('keydown', function(event) {
            if (event.keyCode === ESCAPE_KEY) {
                scope.$apply(attrs.todoEscape);
            }
        });
    };
});


