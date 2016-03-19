var app = angular.module('vizag', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'users/login.html',
        controller: 'UserController'
    }).when('/location', {
        templateUrl: 'users/location.html',
        controller: 'LocationController'
    }).when('/:id', {
        templateUrl: 'users/location_details.html',
        controller: 'LdetailsController'
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
app.controller("LocationController", function ($scope, $route, $http) {
    
});
app.controller("LdetailsController", function ($scope, $route, $http) {
    
    $http({
            method: 'POST',
            url: 'locationdetails.php',
            data: $.param($route.current.pathParams.id), // pass in data as strings
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        })
        .success(function (data) {
            if (!data.success) {
                
            } else {
                
            }
        });
    var cities = [
    {
        city : 'Vishakapattanam',
        desc : 'This is the best city in the world!',
        lat : 17.6883,
        long : 83.2186
    },
    
];
var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(17.6883, 83.2186),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
    for (i = 0; i < cities.length; i++){
        createMarker(cities[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});
