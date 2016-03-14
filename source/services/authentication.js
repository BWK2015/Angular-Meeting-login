App.factory('Authentication', ['$firebaseAuth', 'FIREBASE_URL', '$location', '$rootScope', '$firebaseObject', '$q',function($firebaseAuth, FIREBASE_URL, $location, $rootScope, $firebaseObject, $q){
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    
    auth.$onAuth(function(authUser){
        if(authUser){
            var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
        } else {
            $rootScope.currentUser = ''   
        }
    });
    
    var myObject = {
        login: function(user){
            return auth.$authWithPassword({
                    email: user.email,
                    password: user.password
                }).then(function(response){
                    $location.path('/meetings');
                    return {
                        email: user.email   
                    }
                }, function(error){
                    return error;
                })
        },
        logout: function(){
            return auth.$unauth();  
        },
        register: function(user){
            return auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function(response){
                var regRef = new Firebase(FIREBASE_URL + 'users')
                    .child(response.uid)
                        .set({
                            date: Firebase.ServerValue.TIMESTAMP,
                            regUser: response.uid,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email
                        });
                return myObject.login(user);
            },function(error){
                console.log(error);
                return $q.reject(error);
            })
        },
        requireAuth: function(){
            return auth.$requireAuth();
        }   
    }
    return myObject;
}]);