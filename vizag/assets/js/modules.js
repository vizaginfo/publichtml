var app = angular.module('vizag', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'users/login.html',
        controller: 'UserController'
    }).when('/location', {
        templateUrl: 'users/location.html',
        controller: 'LocationController'
    }).otherwise({
        redirectTo: "/"
    })
});
app.controller("UserController", function ($scope, $route) {
    $scope.loadedTime = new Date();
});