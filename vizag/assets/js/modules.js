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
app.controller("UserController", function ($scope, $route, $http) {
    $scope.loadedTime = new Date();
    $scope.formData = {};
    $scope.processForm = function () {
        $http({
                method: 'POST',
                url: 'process.php',
                data: $.param($scope.formData), // pass in data as strings
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                } // set the headers so angular passing info as form data (not request payload)
        })
        .success(function (data) {
            if (!data.success) {
                // if not successful, bind errors to error variables
                $scope.errormyName = data.errors.myName;
                $scope.errorPassword = data.errors.password;
            } else {
                // if successful, bind success message to message
                $scope.message = data.message;
            }
        });
    };
});