app.config(function($routeProvider)
{
	$routeProvider
	.when('/home', {
		templateUrl: 'mains.html',
		controller: 'UserController'
	})
	.when('/addBlog', {
		templateUrl: 'blogAdd.html',
		controller: 'blogController'		
	})
	.when('/welcome', {
		templateUrl: 'app/components/home/welcome.html'
	})
	.when('/userRequests', {
		templateUrl: 'app/components/user/userRequests.html',
		controller: 'UserController'
	})
	
	
});

app.run( function ($rootScope, $location,$cookieStore, $http) {
	 
	 // keep user logged in after page refresh
    $rootScope.currentUser = $cookieStore.get('currentUser') || {};
    if ($rootScope.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.currentUser; 
    }

});