var app = angular.module('schoolTube', ['ui.router', 'ui.bootstrap']);

app.config(["$sceDelegateProvider", function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        "https://www.youtube.com/embed/**",
        "http://www.youtube.com/embed/**",
    ]);
}]);

// Taken from https://gist.github.com/takien/4077195
function getVideoUID(url) {
	var ID = '';
  	url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  	if (url[2] !== undefined) {
    	ID = url[2].split(/[^0-9a-z_\-]/i);
    	ID = ID[0];
  	}
  	else {
    	ID = url;
  	}
  	var video = 'https://www.youtube.com/embed/' + ID; // + '?autoplay=1';
    return video;
}

app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){

	$scope.posts = posts.posts;

	$scope.search = '';

	$scope.addPost = function(){
  		if (!$scope.title || $scope.title === '') { return; }
  		if (!$scope.author || $scope.author === '') { return; }
  		if (!$scope.description || $scope.description === '') { return; }
  		if (!$scope.video || $scope.video === '') { return; }

	 	$scope.posts.push({
	 		title: $scope.title,
		 	author: $scope.author,
		 	description: $scope.description,
		 	video: getVideoUID($scope.video),
		 	likes: 0,
		 	comments: [
				{author: 'Joe', body: 'Cool post!', likes: 0},
				{author: 'Bob', body: 'Great idea but everything is wrong!', likes: 0}
			]
		});
  		$scope.title = '';
  		$scope.author = '';
  		$scope.description = '';
  		$scope.video = '';

  		alert('Upload complete!');
  		window.location.href = '#/home'; // redirect back to home page after successful upload
	};

	$scope.like = function(post) {
	  post.likes += 1;
	};

}]);

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts) {
	$scope.post = posts.posts[$stateParams.id];

	$scope.addComment = function(){
	  if ($scope.body === '') { return; }
	  $scope.post.comments.push({
	  	author: 'user',
	    body: $scope.body,
	    likes: 0
	  });
	  $scope.body = '';
	};

	$scope.like = function(comment) {
	  comment.likes += 1;
	};
}]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  	$stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })

    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl'
	})

	.state('upload', {
		url: '/upload',
		templateUrl: '/upload.html',
		controller: 'MainCtrl'
	});

  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function() {
  var o = {
    //posts: []
    posts: [
    	{title: 'Watch me whip', author: 'bobby95', description: 'I\'m cool', video: getVideoUID('https://www.youtube.com/watch?v=vjW8wmF5VWc'), likes: 20, comments: [{author: 'bobby', body: 'This sucks', likes: 0}]},
    	{title: 'Baking!', author: 'CakeMaster', description: 'Cake = good', video: getVideoUID('https://www.youtube.com/watch?v=mVBUTEhklcU'), likes: 4, comments: [{author: 'bobby', body: 'This sucks', likes: 0}]},
    	{title: 'Very doge, much happy', author: 'dogz4lyfe', description: 'nuff said', video: getVideoUID('https://www.youtube.com/watch?v=2J5GzHoKl1Q'), likes: 30, comments: [{author: 'bobby', body: 'This sucks', likes: 0}]},
    	{title: 'Banana', author: 'fruits', description: 'eat more fruit', video: getVideoUID('https://www.youtube.com/watch?v=Uz4Or95Lg8E'), likes: -3, comments: [{author: 'bobby', body: 'This sucks', likes: 0}]},
    	{title: 'More catz plz', author: 'kitty', description: 'catz', video: getVideoUID('https://www.youtube.com/watch?v=tntOCGkgt98'), likes: 401, comments: [{author: 'bobby', body: 'This sucks', likes: 0}]},
    	{title: 'Sportz', author: 'footbol', description: 'like and subscribe', video: getVideoUID('https://www.youtube.com/watch?v=h7Fspb7DNe0'), likes: 21, comments: [{author: 'ted', body: 'bueno', likes: 3}]}
	]
  };
  return o;
}]);





