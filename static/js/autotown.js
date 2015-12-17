autotown = angular.module('autotown', ['ngRoute']).
    filter('relDate', function() {
        return function(dstr) {
            return moment(dstr).fromNow();
        };
    }).
    filter('agecss', function() {
        return function(dstr) {
            if (moment(dstr).diff(moment(), 'days') < -14) {
                return 'old'
            } else if (moment(dstr).diff(moment()) > 0) {
                return 'unavailable';
            }
            return '';
        };
    }).
    filter('calDate', function() {
        return function(dstr) {
            return moment(dstr).calendar();
        };
    }).
    filter('tomillis', function() {
        return function(seconds) {
            return (seconds * 1000).toFixed(2);
        };
    }).
    config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $locationProvider.html5Mode(true);
                $locationProvider.hashPrefix('!');

                $routeProvider.
                    when('/', {
                        templateUrl: '/static/partials/home.html',
                        controller: 'IndexCtrl'
                    }).
                    when('/tune/:tuna', {
                        templateUrl: '/static/partials/tune.html',
                        controller: 'TuneCtrl'
                    }).
                    when('/crash/', {
                        templateUrl: '/static/partials/crashes.html',
                        controller: 'CrashCtrl'
                    }).
                    otherwise({
                        redirectTo: '/'
                    });
            }]);

autotown.controller('IndexCtrl', ['$scope', '$http',
                                  function($scope, $http) {
                                      $http.get("/api/recentTunes").success(function(data) {
                                          $scope.recentTunes = data;
                                      });
                                  }]);


autotown.controller('TuneCtrl', ['$scope', '$http', '$routeParams',
                                 function($scope, $http, $routeParams) {
                                     $http.get("/api/tune?tune=" +
                                               encodeURIComponent($routeParams.tuna)
                                              ).success(function(data) {
                                                  $scope.tune = data;
                                              });
                                 }]);

autotown.controller('CrashCtrl', ['$scope', '$http',
                                  function($scope, $http) {
                                      $http.get("/api/recentCrashes").success(function(data) {
                                          $scope.recentCrashes = data;
                                          $scope.crashServer = 'https://console.developers.google.com/m/cloudstorage/b/dronin-autotown.appspot.com/o/';
                                      });
                                  }]);
