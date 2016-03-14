App.controller('MeetingController', ['$rootScope','$firebaseAuth', 'FIREBASE_URL', '$firebaseArray', function($rootScope, $firebaseAuth, FIREBASE_URL, $firebaseArray){
    var MeetCtrl = this;  
    
    var ref = new Firebase(FIREBASE_URL);
    auth = $firebaseAuth(ref);
    
    auth.$onAuth(function(authUser){
        if(authUser){
            var meetingRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/meetings');
            var meetingsInfo = $firebaseArray(meetingRef);
            console.log(meetingsInfo);
            
            meetingsInfo.$loaded().then(function(data){
                $rootScope.howManyMeetings = meetingsInfo.length;   
            });
            
            meetingsInfo.$watch(function(data){
                $rootScope.howManyMeetings = meetingsInfo.length; 
            });
            
            MeetCtrl.meetings = meetingsInfo;
            
            MeetCtrl.addMeeting = function(){
                meetingsInfo.$add({
                    name: MeetCtrl.meetingName,
                    date: Firebase.ServerValue.TIMESTAMP
                }).then(function(){
                    MeetCtrl.meetingName="";   
                })   
            };
            
             MeetCtrl.deleteMeeting = function(key){
                meetingsInfo.$remove(key);
             };
        };
    }
                 )
}]);
                 