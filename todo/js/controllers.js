//filterFilter is a default service in angular
todo.controller('TodoCtrl', function($scope, $location, todoStorage, filterFilter){
    var todos = $scope.todos = todoStorage.get();
    $scope.newTodo = "";
    $scope.editedTodo = null;
    
    $scope.$watch('todos', function() {
        $scope.remainingCount = filterFilter(todos, {
            completed : false
        }).length;
        $scope.completedCount = todos.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount;
        todoStorage.put(todos);
    }, true);

    if ($location.path() === '') {
        $location.path('/');
    }

    $scope.location = $location;

    $scope.$watch('location.path()', function(path) {
        //here filter is object
        $scope.statusFilter = (path === '/active') ? {
            completed : false
        } : (path === '/completed') ? {
            completed : true
        } : null;
    }); 

    
    $scope.addTodo = function(){
        var newTodo = $scope.newTodo.trim();
        if (!newTodo.length) {
            return;
        }
        
        todos.push({
            title: newTodo,
            completed: false
        });
        
        $scope.newTodo = '';
    };
    
    $scope.editTodo = function(todo){
        $scope.editedTodo = todo;
        $scope.originalTodo = angular.extend({}, todo);
    };
    
    $scope.removeTodo = function(todo) {
       todos.splice(todos.indexOf(todo), 1);
    }
    
    //use filter, do NOT use forEach to check
    $scope.clearCompletedTodos = function(){
        $scope.todos = todos = todos.filter(function (val) {
            return !val.completed;
        });
    }
    
    //undo the edit
    $scope.revertEditing = function(todo){
        todos[todos.indexOf(todo)] = $scope.originalTodo;
        $scope.doneEditing($scope.originalTodo);
    }
    
    $scope.doneEditing = function(todo){
        $scope.editedTodo = null;
        todo.title = todo.title.trim();
        
        if (!todo.title) {
            $scope.removeTodo(todo);
        }
    };
    
    $scope.markAll = function(completed){
        angular.forEach(todos, function(todo, index){
            todo.completed = completed;
        });
    };
    
    
});
