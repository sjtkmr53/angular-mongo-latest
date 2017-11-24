'use strict';
angular.module('angular1App')
  .controller('userCtrl',['$scope', '$state','$http','$rootScope','$window',function ($scope, $state,$http,$rootScope,$window) {
  	$scope.userEmail = $window.localStorage.email;
		$http.post('http://localhost:3000/getUserInformation',{'email':$scope.userEmail} )
      .then(function(data) {
       if(data.data.status){
        $scope.userInformation = data.data.data;
       }else{
        swal('Oops...',data.data.messages,'error')
       }
      },function(error){
        console.log("error")
      }); 

  $scope.attendanceLogin = function(){
    var loginDate = new Date().getDate()+""+(new Date().getMonth()+1)+""+new Date().getFullYear();
    var data = {
      'loginDate': loginDate,
      'email': $scope.userEmail,
      'loginTime' : new Date()
    };
    $http.post('http://localhost:3000/userAttendance/login',data)
      .then(function(data) {
       if(data.data.status){
        $scope.loginBtnDisabled = data.data.btnStatus;
       }
      },function(error){
        console.log("error")
      });
  }
  $scope.attendanceLogout = function(){
    var loginDate = new Date().getDate()+""+(new Date().getMonth()+1)+""+new Date().getFullYear();
    var data = {
      'loginDate': loginDate,
      'email': $scope.userEmail,
      'logoutTime' : new Date()
    };
    $http.post('http://localhost:3000/userAttendance/logout',data)
      .then(function(data) {
       if(data.data.status){
        $scope.logoutBtnDisabled = data.data.btnStatus;
       }
      },function(error){
        console.log("error")
      });
  }
  $scope.addStatus = function(){
    var loginDate = new Date().getDate()+""+(new Date().getMonth()+1)+""+new Date().getFullYear();
    var data = {
      'loginDate': loginDate,
      'email': $scope.userEmail,
      'status': $scope.dailyStatus
    };
    $http.post('http://localhost:3000/userAttendance/dailyStatus',data)
      .then(function(data) {
      },function(error){
        console.log("error")
      });
  }

  $scope.logout = function(){
    $state.go("login");
  }
  
  }]);