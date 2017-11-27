'use strict';
angular.module('angular1App')
  .controller('userCtrl',['$scope', '$state','$http','$rootScope','$window',function ($scope, $state,$http,$rootScope,$window) {
  	$scope.userEmail = $window.localStorage.email;
    $scope.activeAttendance = 'active';
    $scope.showAttendance = true
    $scope.loginDate = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
    $scope.init = function(){
      $http.post('http://localhost:3000/getUserInformation',{'email':$scope.userEmail} )
      .then(function(data) {
       if(data.data.status){
        $scope.userInformation = data.data.data;
          if(_.find(data.data.data,{'loginDate':$scope.loginDate,'isLogin':true})){
            $scope.loginBtnDisabled = 'disabled';
          }
          if(_.find(data.data.data,{'loginDate':$scope.loginDate,'isLogout':true})){
            $scope.logoutBtnDisabled = 'disabled';
          }
        }else{
          swal('Oops...',data.data.messages,'error')
        }
      },function(error){
          console.log("error")
      }); 
    }

  $scope.attendanceLogin = function(){
    var d = new Date();
    var data = {
      'loginDate':   $scope.loginDate,
      'email': $scope.userEmail,
      'loginTime' : d.getHours()+':'+ d.getMinutes()
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
    var d = new Date();
    var data = {
      'loginDate': $scope.loginDate,
      'email': $scope.userEmail,
      'logoutTime' : d.getHours()+':'+ d.getMinutes()
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
    var data = {
      'loginDate': $scope.loginDate,
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
  if($scope.showAttendance){
    $scope.init();
  }
  $scope.Attendance = function(){
    $scope.showAttendance = true;
    $scope.init();
  }
  $scope.leaveList = function(){
    $scope.showAttendance = false;
    $scope.leavList = true;
  }
  // setInterval(function(){
  //  $scope.init();
  // }, 6000)
  
  
  }]);