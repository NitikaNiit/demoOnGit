'use strict';

app
		.controller(
				'UserController',
				[
						'$scope',
						'UserService',
						'$location',
						'$rootScope',
						'$cookieStore',
						'$http',
						'$route',
						function($scope, UserService, $location, $rootScope,
								$cookieStore, $http,$route) {
							console.log("UserController...")
							var self = this;

							self.user = {
								id : '',
								name : '',
								password : '',
								mobile : '',
								address : '',

								isOnline : '',
								role : '',
								errorCode : '',
								errorMessage : ''
							};

							self.currentUser = {
								id : '',
								name : '',
								password : '',
								mobile : '',
								address : '',

								isOnline : '',
								role : '',
								errorCode : '',
								errorMessage : ''

							};

							self.userLoggedIn = "";

							self.users = []; // json array
							
							self.fetchAllUsers = function() {
								console.log("fetchAllUsers...")
								UserService
										.fetchAllUsers()
										.then(
												function(d) {
													self.users = d;
													$rootScope.users=d;
												},
												function(errResponse) {
													console
															.error('Error while fetching Users');
												});
							};
							self.fetchAllUsers();
							
							self.accept = function(id) {
								console.log("accept...")
								UserService
										.accept(id)
										.then(
												function(d) {
													self.user = d;
													self.fetchAllUsers
													$location
															.path("/userRequests")
															$route.reload()
													alert(self.user.errorMessage)

												},

												function(errResponse) {
													console
															.error('Error while updating User.');
												});
							};

							self.reject = function(id) {
								console.log("reject...")
								var reason = prompt("Please enter the reason");
								UserService.reject(id, reason).then(
										function(d) {
											self.user = d;
											self.fetchAllUsers
											$location.path("/userRequests")
											alert(self.user.errorMessage)

										}, null);
							};
							
							self.submit = function() {
								{
									console.log('Saving New User', self.user);
									self.createUser(self.user);
								}
								self.reset();
							};

							self.createUser = function(user) {
								console.log("createUser...")
								UserService
										.createUser(user)
										.then(
												function(d) {
													self.user = d;
													alert("Thank you for registration")
													alert(self.user.errorCode)
													$location.path("/")
												},
												function(errResponse) {
													console
															.error('Error while creating User.');
												});
							};

							self.authenticate = function(user) {
								console.log("authenticate...")
								UserService
										.authenticate(user)
										.then(

												function(d) {

													self.user = d;
													console
															.log("user.errorCode: "
																	+ self.user.errorCode)
													if (self.user.errorCode == "404")

													{
														/* alert(self.user.errorMessage) */

													self.user.name ='';
													self.user.password = '';
													self.user.mobile = '',
													self.user.address = '';
													self.user.isOnline = '';
													self.user.role = ''
														self.user.status='';

													} else { // valid
														// credentials
														console
																.log("Valid credentials. Navigating to home page")
														self.userLoggedIn = "true"
														if (self.user.role == "admin") {
															console
																	.log("You are admin")
															 self.fetchAllUsers(); 
														}

														console
																.log('Current user : '
																		+ self.user)
														$rootScope.currentUser = self.user
														$cookieStore.put(
																'currentUser',
																self.user);

														$http.defaults.headers.common['Authorization'] = 'Basic '
																+ $rootScope.currentUser;
														$location.path('/');
														self.reset();

													}

												},
												function(errResponse) {

													console
															.error('Error while authenticate Users');
												});
							};

							self.login = function() {
								{
									console.log('login validation????????',
											self.user);
									self.authenticate(self.user);

								}

							};

							self.logout = function() {
								console.log("logout")
								self.userLoggedIn = "false"
								$rootScope.currentUser = {};
								$cookieStore.remove('currentUser');
								UserService.logout().then(function(d) {
									self.user =d;
									self.user.name ='';
									self.user.password = '';
									self.user.mobile = '',
									self.user.address = '';
									self.user.isOnline = '';
									self.user.role = '';
										self.user.status='';
									$location.path('/');
								})
								

							};

							self.updateUser = function(currentUser) {
								console.log("updateUser...")
								UserService.updateUser(currentUser).then(
										alert("You have successfully updated"));
							};

							self.update = function() {
								{
									console.log('Update the user details',
											$rootScope.currentUser);
									self.updateUser($rootScope.currentUser);
								}
								self.reset();
							};

							self.reset = function() {
								self.user = {
									id : '',
									name : '',
									password : '',
									mobile : '',
									address : '',

									isOnline : '',
									role : '',
									errorCode : '',
									errorMessage : ''

								};

								$scope.myForm.$setPristine(); // reset Form
							};

						} ]);
