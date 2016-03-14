App.controller('CheckinsController', ['$firebaseArray', '$firebaseObject', '$routeParams', '$rootScope', 'FIREBASE_URL', '$location', function($firebaseArray, $firebaseObject, $routeParams, $rootScope, FIREBASE_URL, $location){
    
    var ChkInCtrl = this;
    
    ChkInCtrl.whichMeeting = $routeParams.mId;
    ChkInCtrl.whichUser = $routeParams.uId;
    ChkInCtrl.order = "firstname";
    ChkInCtrl.direction = null;
    ChkInCtrl.query = '';
    ChkInCtrl.recordId = '';
    
    var ref = new Firebase(FIREBASE_URL + 'users/' + ChkInCtrl.whichUser + '/meetings/' + ChkInCtrl.whichMeeting + '/checkins');
    
    var checkinsList = $firebaseArray(ref);
    ChkInCtrl.checkins = checkinsList;
    
    ChkInCtrl.deleteCheckIn = function(id){
        var refDel = new Firebase(FIREBASE_URL + 'users/' + ChkInCtrl.whichUser + '/meetings/' + ChkInCtrl.whichMeeting + '/checkins/' + id);
        var record = $firebaseObject(refDel);
        record.$remove(id);
    };
    
    ChkInCtrl.pickRandom = function(){
        var whichRecord = Math.round(Math.random()*(checkinsList.length-1));
        ChkInCtrl.recordId = checkinsList.$keyAt(whichRecord);
        console.log(ChkInCtrl.recordId)
    };
    
    ChkInCtrl.addCheckin = function(){
        var checkinsInfo = $firebaseArray(ref);
        var myData = {
            firstname: ChkInCtrl.user.firstname,
            lastname: ChkInCtrl.user.lastname,
            email: ChkInCtrl.user.email,
            date: Firebase.ServerValue.TIMESTAMP
        };
        checkinsInfo.$add(myData).then(function(response){
            $location.path('/checkins/' + ChkInCtrl.whichUser + '/' + ChkInCtrl.whichMeeting + '/checkinsList');
        });
    };
    
    ChkInCtrl.showLove =function(checkin){
        console.log(checkin);
        checkin.show = !checkin.show;
        if(checkin.userState == "expanded"){
            checkin.userState = "";   
        }else {
            checkin.userState = "expanded";
        }
    };
    
    ChkInCtrl.giveLove = function(checkin, giftText){
        var refLove = new Firebase(FIREBASE_URL + 'users/' + ChkInCtrl.whichUser + '/meetings/' + ChkInCtrl.whichMeeting + '/checkins/' + checkin.$id + '/awards');
        var checkinsArray = $firebaseArray(refLove);
        var myData = {
            name: giftText,
            date: Firebase.ServerValue.TIMESTAMP
        };
        checkinsArray.$add(myData);
    };
    
    ChkInCtrl.deleteLove = function(checkinId, award){
        var refDelLove = new Firebase(FIREBASE_URL + 'users/' + ChkInCtrl.whichUser + '/meetings/' + ChkInCtrl.whichMeeting + '/checkins/' + checkin.$id + '/awards');
        var record = $firebaseObject(refDelLove);
        record.$remove(award);
    };
}])