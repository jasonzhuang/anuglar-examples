//see http://docs.angularjs.org/api/angular.Module:
//controller(name, construct)
app.controller("mainController", function($scope, $http){
	$scope.apiKey = ['0a03aafe07c9b98770ffa0b783e99d51'];
	$scope.results = [];
	$scope.filterText = null;
	//this is generate dynamiclly
	$scope.availableGenres = [];
	$scope.genreFilter = null;
	$scope.orderFields = ["Air Date", "Rating"];
	//the orderField value MUST in the orderFields
	$scope.orderField = "Air Date";
	$scope.orderDirections = ["Descending", "Ascending"];
	$scope.orderReverse = false;
    $scope.init = function() {
		var today = new Date();
		var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
    	$http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 30 + '/?callback=JSON_CALLBACK').success(function(data) {
    		//As we are getting our data from an external source, we need to format the data so we can use it to our desired effect
            //For each day, get all the episodes
            angular.forEach(data, function(value, index){
            	var date = value.date;
            	angular.forEach(value.episodes, function(tvshow, index){
            		//Create a date string from the timestamp so we can filter on it based on user text input
            		tvshow.date = date;
            		$scope.results.push(tvshow);
            		//Loop through each genre for this episode
            		angular.forEach(tvshow.show.genres, function(genre, index){
            			//Only add to the availableGenres array if it doesn't already exist
            			var exists = false;
                        angular.forEach($scope.availableGenres, function(avGenre, index){
                            if (avGenre == genre) {
                                exists = true;
                            }
                        });
                        if (exists === false) {
                            $scope.availableGenres.push(genre);
                        }
            		});
            	});
            });
    	}).error(function(error){
    		
    	})
    };
    
	$scope.setGenreFilter = function(genre) {
	    $scope.genreFilter = genre;
	}
	
	$scope.customOrder = function(tvshow) {
	    switch ($scope.orderField) {
	        case "Air Date":
	            return tvshow.episode.first_aired;
	            break;
	        case "Rating":
	            return tvshow.episode.ratings.percentage;
	            break;
	    }
	};
});
//customer filter
//see http://docs.angularjs.org/api/angular.Module
//filter(name, filterFactory)
app.filter("isGenre", function(){
	return function(input, genre) {
		console.log("input is: ", input, " genre is :", genre);
		if(genre == "undefined" || genre == null){
			return input;
		} else {
			var out = [];
			for(var a=0; a<input.length; a++){
				for(var b=0;b < input[a].show.genres.length; b++){
					if(input[a].show.genres[b] == genre) {
                        out.push(input[a]);
                    }
				}
			}
			return out;
		}
	}
});
