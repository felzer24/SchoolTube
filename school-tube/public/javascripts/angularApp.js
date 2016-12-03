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
  		if (!$scope.content || $scope.content === '') { return; }
  		if (!$scope.video || $scope.video === '') { return; }

	 	$scope.posts.push({
	 		title: $scope.title,
		 	author: $scope.author,
		 	content: $scope.content,
		 	tag: $scope.tag,
		 	video: getVideoUID($scope.video),
		 	likes: 0,
		 	comments: [
				{author: 'Joe', body: 'Cool post!', likes: 0},
				{author: 'Bob', body: 'Great idea but everything is wrong!', likes: 0}
			]
		});
  		$scope.title = '';
  		$scope.author = '';
  		$scope.content = '';
  		$scope.tag = '';
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

app.controller('UsersCtrl', [
'$scope',
'$stateParams',
'posts',
'users',
function($scope, $stateParams, posts, users) {
	$scope.user = users.users[$stateParams.id];

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
	})

	.state('users', {
		url: 'users/{name}',
		templateUrl: '/users.html',
		controller: 'UsersCtrl'
	});

  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function() {
  var o = {
    //posts: []
    posts: [
    	{title: 'Watch me whip', author: 'bobby95', content: '', tag: '', video: getVideoUID('https://www.youtube.com/watch?v=vjW8wmF5VWc'), likes: 20, comments: [{author: 'bobby', body: 'This sucks', likes: 0}]},
    	{title: 'Baking!', author: 'CakeMaster', content: '', tag: '', video: getVideoUID('https://www.youtube.com/watch?v=mVBUTEhklcU'), likes: 4, comments: [{author: 'bobby', body: 'This sucks', likes: 0}]},
    	{title: 'Very doge, much happy', author: 'dogz4lyfe', content: '', tag: '', video: getVideoUID('https://www.youtube.com/watch?v=2J5GzHoKl1Q'), likes: 0, comments: [{author: 'bobby', body: 'This sucks', likes: 0}]}
	]
  };
  return o;
}]);





