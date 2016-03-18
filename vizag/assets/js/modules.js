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
    $scope.data = {
        //customProperty:$route.current.companyName,
        //queryString: $route.current.params.city, 
        //pathParams : $route.current.pathParams.id
    };

    $scope.loadedTime = new Date();



});