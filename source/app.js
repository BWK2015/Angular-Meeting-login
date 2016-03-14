var App = angular.module('app', ['ngRoute', 'firebase']);

App.run(['$rootScope', '$location', function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(event, next, previous, error){
        if(error == 'AUTH_REQUIRED'){
            $rootScope.$broadcast('success_page_error');
            $location.path('/login');
        }
    })
}]);

App.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/login', {
        templateUrl: '../source/views/login.html',
        controller: 'RegistrationController',
        controllerAs: 'RegCtrl'
    })
    .when('/register', {
        templateUrl: '../source/views/register.html',
        controller: 'RegistrationController',
        controllerAs: 'RegCtrl'
    })
    .when('/checkins/:uId/:mId', {
        templateUrl: '../source/views/checkins.html',
        controller: 'CheckinsController',
        controllerAs: 'ChkInCtrl'
    })
    .when('/checkins/:uId/:mId/checkinsList', {
        templateUrl: '../source/views/checkinslist.html',
        controller: 'CheckinsController',
        controllerAs: 'ChkInCtrl'
    })
    .when('/meetings', {
        templateUrl: '../source/views/meetings.html',
        controller: 'MeetingController',
        controllerAs: 'MeetCtrl',
        resolve: {
            currentAuth: function(Authentication){
                return Authentication.requireAuth();   
            }
        }
    })
    .otherwise({redirectTo: '/login'})
}]);

