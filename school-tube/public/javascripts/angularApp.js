// var app = angular.module('schoolTube', ['ui.router', 'ui.bootstrap']);

// app.config(["$sceDelegateProvider", function($sceDelegateProvider) {
//     $sceDelegateProvider.resourceUrlWhitelist([
//         'self',
//         "https://www.youtube.com/embed/**",
//         "http://www.youtube.com/embed/**"
//     ]);
// }]);

// // Taken from https://gist.github.com/takien/4077195
// function getVideoUID(url) {
// 	var ID = '';
//   	url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
//   	if (url[2] !== undefined) {
//     	ID = url[2].split(/[^0-9a-z_\-]/i);
//     	ID = ID[0];
//   	}
//   	else {
//     	ID = url;
//   	}
//   	var video = 'https://www.youtube.com/embed/' + ID; // + '?autoplay=1';
//     return video;
// }

// app.controller('MainCtrl', [
// '$scope',
// 'posts',
// 'auth',
// function($scope, posts, auth){
// 	$scope.isLoggedIn = auth.isLoggedIn;
// 	$scope.posts = posts.posts;
// 	$scope.author = auth.currentUser; // added by me

// 	$scope.search = '';

// 	$scope.addPost = function() {
//   		if (!$scope.title || $scope.title === '') { return; }
//   		if (!$scope.description || $scope.description === '') { return; }
//   		if (!$scope.video || $scope.video === '') { return; }

// 		posts.create({
// 			title: $scope.title,
// 			//author: $scope.author,
// 			author: 'user',
// 			description: $scope.description,
// 			video: getVideoUID($scope.video),
// 		});
//   		$scope.title = '';
//   		$scope.description = '';
//   		$scope.video = '';

//   		alert('Upload complete!');
//   		window.location.href = '#/home'; // redirect back to home page after successful upload
// 	};

// 	$scope.like = function(post) {
// 		posts.like(post);
// 	};

// }]);

// app.controller('PostsCtrl', [
// '$scope',
// 'posts',
// 'post',
// 'auth',
// function($scope, posts, post, auth) {
// 	$scope.isLoggedIn = auth.isLoggedIn;
// 	$scope.post = post;

// 	$scope.currentUser = auth.currentUser; // added by me

// 	$scope.addComment = function(){
// 	  if ($scope.body === '') { return; }
// 	  posts.addComment(post._id, {
// 	  	author: $scope.currentUser,
// 	  	body: $scope.body,
// 	  }).success(function(comment) {
// 	  	$scope.post.comments.push(comment);
// 	  });
// 	  $scope.body = '';
// 	};

// 	$scope.like = function(comment) {
// 		posts.likeComment(post, comment);
// 	};
// }]);

// app.controller('AuthCtrl', [
// '$scope',
// '$state',
// 'auth',
// function($scope, $state, auth){
//   $scope.user = {};

//   $scope.register = function(){
//     auth.register($scope.user).error(function(error){
//       $scope.error = error;
//     }).then(function(){
//       $state.go('home');
//     });
//   };

//   $scope.logIn = function(){
//     auth.logIn($scope.user).error(function(error){
//       $scope.error = error;
//     }).then(function(){
//       $state.go('home');
//     });
//   };
// }]);

// app.controller('NavCtrl', [
// '$scope',
// 'auth',
// function($scope, auth) {
// 	$scope.isLoggedIn = auth.isLoggedIn;
// 	$scope.currentUser = auth.currentUser;
// 	$scope.logOut = auth.logOut;
// }]);

// app.config([
// '$stateProvider',
// '$urlRouterProvider',
// function($stateProvider, $urlRouterProvider) {

//   	$stateProvider
//     .state('home', {
//       url: '/home',
//       templateUrl: '/home.html',
//       controller: 'MainCtrl',
//       resolve: {
//       	postPromise: ['posts', function(posts) {
//       		return posts.getAll();
//       	}]
//       }
//     })

//     .state('posts', {
// 	  url: '/posts/{id}',
// 	  templateUrl: '/posts.html',
// 	  controller: 'PostsCtrl',
// 	  resolve: {
// 	  	post: ['$stateParams', 'posts', function($stateParams, posts) {
// 	  		return posts.get($stateParams.id);
// 	  	}]
// 	  }
// 	})

// 	.state('upload', {
// 		url: '/upload',
// 		templateUrl: '/upload.html',
// 		controller: 'MainCtrl'
// 	})

// 	.state('login', {
// 		url: '/login',
// 		templateUrl: '/login.html',
// 		controller: 'AuthCtrl',
// 		onEnter: ['$state', 'auth', function($state, auth) {
// 			if (auth.isLoggedIn()) {
// 				$state.go('home');
// 			}
// 		}]
// 	})

// 	.state('register', {
// 		url: '/register',
// 		templateUrl: '/register.html',
// 		controller: 'AuthCtrl',
// 		onEnter: ['$state', 'auth', function($state, auth) {
// 			if (auth.isLoggedIn()) {
// 				$state.go('home');
// 			}
// 		}]
// 	});

//   $urlRouterProvider.otherwise('home');
// }]);

// app.factory('posts', ['$http', 'auth', function($http, auth) {
//   var o = {
//     posts: []
//   };
//   o.getAll = function() {
//     return $http.get('/posts').success(function(data){
//       angular.copy(data, o.posts);
//     });
//   };

//   	o.get = function(id) {
//   		console.log($http.get('/posts/' + id).then(function(res){
	    
// 	  }));
// 	  return $http.get('/posts/' + id).then(function(res){
// 	    return res.data;
// 	  });
// 	};

//  //  o.create = function(post) {
//  //  	return $http.post('/posts', post, {
//  //  		headers: {Authorization: 'Bearer '+auth.getToken()}
//  //  	}).success(function(data) {
//  //  		o.posts.push(data);
//  //  	});
//  //  };

//  //  o.like = function(post) {
//  //  	console.log($http.put('/posts/' + post._id + '/like', null, {
//  //  		headers: {Authorization: 'Bearer '+auth.getToken()}
//  //  	}));
//  //  	return $http.put('/posts/' + post._id + '/like', null, {
//  //  		headers: {Authorization: 'Bearer '+auth.getToken()}
//  //  	}).success(function(data) {
//  //  		post.likes += 1;
//  //  	});
//  //  };

// 	// o.addComment = function(id, comment) {
// 	// 	return $http.post('/posts/' + id + '/comments', comment, {
// 	// 		headers: {Authorization: 'Bearer '+auth.getToken()}
// 	// 	});
// 	// };

// 	// o.likeComment = function(post, comment) {
// 	// 	return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/like', null, {
// 	// 		headers: {Authorization: 'Bearer '+auth.getToken()}
// 	// 	}).success(function(data) {
// 	// 		comment.likes += 1;
// 	// 	});
// 	// };

// 	o.create = function(post) {
//   return $http.post('/posts', post, {
//     headers: {Authorization: 'Bearer '+auth.getToken()}
//   }).success(function(data){
//     o.posts.push(data);
//   });
// };

// o.like = function(post) {
// 	console.log($http.put('/posts/' + post._id + '/like', null, {
//     headers: {Authorization: 'Bearer '+auth.getToken()}
//   }));
//   return $http.put('/posts/' + post._id + '/like', null, {
//     headers: {Authorization: 'Bearer '+auth.getToken()}
//   }).success(function(data){
//     post.likes += 1;
//   });
// };

// o.addComment = function(id, comment) {
//   return $http.post('/posts/' + id + '/comments', comment, {
//     headers: {Authorization: 'Bearer '+auth.getToken()}
//   });
// };

// o.upvoteComment = function(post, comment) {
//   return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/like', null, {
//     headers: {Authorization: 'Bearer '+auth.getToken()}
//   }).success(function(data){
//     comment.likes += 1;
//   });
// };

//   return o;
// }]);

// app.factory('auth', ['$http', '$window', function($http, $window) {
// 	var auth = {};

// 	auth.saveToken = function(token) {
// 		$window.localStorage['school-tube-token'] = token;
// 	};

// 	auth.getToken = function() {
// 		return $window.localStorage['school-tube-token'];
// 	}

// 	auth.isLoggedIn = function() {
// 		var token = auth.getToken();

// 		if (token) {
// 			var payload = JSON.parse($window.atob(token.split('.')[1]));
// 			return payload.exp > Date.now() / 1000;
// 		} else {
// 			return false;
// 		}
// 	};

// 	auth.currentUser = function() {
// 		if (auth.isLoggedIn()) {
// 			var token = auth.getToken();
// 			var payload = JSON.parse($window.atob(token.split('.')[1]));

// 			return payload.username;
// 		}
// 	};

// 	auth.register = function(user) {
// 		return $http.post('/register', user).success(function(data) {
// 			auth.saveToken(data.token);
// 		});
// 	};

// 	auth.logIn = function(user) {
// 		return $http.post('/login', user).success(function(data) {
// 			auth.saveToken(data.token);
// 		});
// 	};

// 	auth.logOut = function() {
// 		$window.localStorage.removeItem('school-tube-token');
// 	};

// 	return auth;
// }]);

var app = angular.module('schoolTube', ['ui.router', 'ui.bootstrap']);

app.config(["$sceDelegateProvider", function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        "https://www.youtube.com/embed/**",
        "http://www.youtube.com/embed/**"
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
'auth',
function($scope, posts, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.posts = posts.posts;

	$scope.search = '';

	$scope.addPost = function() {
  		if (!$scope.title || $scope.title === '') { return; }
  		if (!$scope.description || $scope.description === '') { return; }
  		if (!$scope.video || $scope.video === '') { return; }

		posts.create({
			title: $scope.title,
			description: $scope.description,
			video: getVideoUID($scope.video),
		});
  		$scope.title = '';
  		$scope.description = '';
  		$scope.video = '';

  		alert('Upload complete!');
  		window.location.href = '#/home'; // redirect back to home page after successful upload
	};

	$scope.like = function(post) {
		console.log("trying to like a post");
		posts.like(post);
	};

}]);

app.controller('PostsCtrl', [
'$scope',
'posts',
'post',
'auth',
function($scope, posts, post, auth) {
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.post = post;

	$scope.currentUser = auth.currentUser; // added by me

	$scope.addComment = function(){
	  if ($scope.body === '') { return; }
	  posts.addComment(post._id, {
	  	author: $scope.currentUser,
	  	body: $scope.body,
	  }).success(function(comment) {
	  	$scope.post.comments.push(comment);
	  });
	  $scope.body = '';
	};

	$scope.like = function(comment) {
		posts.likeComment(post, comment);
	};
}]);

app.controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.user = {};

  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };
}]);

app.controller('NavCtrl', [
'$scope',
'auth',
function($scope, auth) {
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser;
	$scope.logOut = auth.logOut;
}]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  	$stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
      	postPromise: ['posts', function(posts) {
      		return posts.getAll();
      	}]
      }
    })

    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl',
	  resolve: {
	  	post: ['$stateParams', 'posts', function($stateParams, posts) {
	  		return posts.get($stateParams.id);
	  	}]
	  }
	})

	.state('upload', {
		url: '/upload',
		templateUrl: '/upload.html',
		controller: 'MainCtrl'
	})

	.state('login', {
		url: '/login',
		templateUrl: '/login.html',
		controller: 'AuthCtrl',
		onEnter: ['$state', 'auth', function($state, auth) {
			if (auth.isLoggedIn()) {
				$state.go('home');
			}
		}]
	})

	.state('register', {
		url: '/register',
		templateUrl: '/register.html',
		controller: 'AuthCtrl',
		onEnter: ['$state', 'auth', function($state, auth) {
			if (auth.isLoggedIn()) {
				$state.go('home');
			}
		}]
	});

  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', ['$http', '$window', 'auth', function($http, $window, auth) {
  var o = {
    posts: []
  };
  o.getAll = function() {
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };

  o.create = function(post) {
  	return $http.post('/posts', post, {
  		headers: {Authorization: 'Bearer ' + auth.getToken()}
  	}).success(function(data) {
  		o.posts.push(data);
  	});
  };

  o.like = function(post) {
  	return $http.put('/posts/' + post._id + '/like', null, {
  		headers: {Authorization: 'Bearer ' + auth.getToken()}
  	}).success(function(data) {
  		post.likes += 1;
  	});
  };

	o.get = function(id) {
	  return $http.get('/posts/' + id).then(function(res){
	    return res.data;
	  });
	};

	o.addComment = function(id, comment) {
		return $http.post('/posts/' + id + '/comments', comment, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		});
	};

	o.likeComment = function(post, comment) {
		return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/like', null, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		}).success(function(data) {
			comment.likes += 1;
		});
	};

  return o;
}]);

app.factory('auth', ['$http', '$window', function($http, $window) {
	var auth = {};

	auth.saveToken = function(token) {
		$window.localStorage['school-tube-token'] = token;
	};

	auth.getToken = function() {
		return $window.localStorage['school-tube-token'];
	}

	auth.isLoggedIn = function() {
		var token = auth.getToken();

		if (token) {
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	auth.currentUser = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.username;
		}
	};

	auth.register = function(user) {
		return $http.post('/register', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.logIn = function(user) {
		return $http.post('/login', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.logOut = function() {
		$window.localStorage.removeItem('school-tube-token');
	};
	return auth;
}]);