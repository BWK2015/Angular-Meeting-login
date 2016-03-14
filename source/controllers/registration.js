App.controller('RegistrationController', ['Authentication', '$location', '$scope',function(Authentication, $location, $scope){
    var RegCtrl = this;
    
    $scope.$on('success_page_error', function(event){
        console.log(event);
        RegCtrl.pageLoadError = 'Back the fuck up';
    });
    
    RegCtrl.login = function(){
      Authentication.login(RegCtrl.user);
    };
    RegCtrl.logout = function(){
        Authentication.logout();     
    };
    RegCtrl.register = function(){
        Authentication.register(RegCtrl.user)
            .then(function(response){
                RegCtrl.message = 'Hi ' + RegCtrl.user.firstname + ". Thanks for registering.";
            }, function(error){
                console.log('There has been an error')
                RegCtrl.message = error.message;
            });   
    }
    
}]);