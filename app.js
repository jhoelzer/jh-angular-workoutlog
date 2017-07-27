(function() {
	var app = angular.module('workoutlog', [
		'ui.router',
		'workoutlog.define',
		'workoutlog.logs',
		'workoutlog.history',
		//'workoutlog.feed',
		'workoutlog.auth.signup',
		'workoutlog.auth.signin'
		])
	.factory('socket', function(socketFactory) {
		var myIoSocket = io.connect('http://localhost:3000');

		var socket = socketFactory({
			ioSocket: myIoSocket
		});
		return socket;
	})

	function config($urlRouterProvider) {
		$urlRouterProvider.otherwise('/signin');
	}

	config.$inject = [ '$urlRouterProvider' ];
	app.config(config);

	var API_BASE = location.hostname === "localhost" ?
		"//localhost:3000/api/" : "https://data.heroku.com/datastores/8f950197-301a-4213-b5b2-6c60dbb09506";
	app.constant('API_BASE', API_BASE);
})();