'use strict';
angular.module('angular1App')
  .controller('adminCtrl',['$scope', '$state','$http','$rootScope','$window',function ($scope, $state,$http,$rootScope,$window) {
  	$scope.createUser = {};
    $scope.adminCreateUserActive = 'active';
    $scope.containerCreateUser = true;
  	$scope.adminEmail =  $window.localStorage.email;
    $scope.userList = true;
    //for attendance 
      var getAllAttendance = function(){
        $http.get('http://localhost:3000/admin/getAllUserAttendance')
        .then(function(data) {
         if(data.data.status){
          $scope.userInformation = data.data.data;
         }else{
          swal('Oops...',data.data.messages,'error')
         }
        },function(error){
          console.log("error")
        });
      }
    //end

    // for user List
    var getAllUser = function(){
      $http.get('http://localhost:3000/admin/getAllUsers').then(function(data) {
       if(data.data.status){
        $scope.users= data.data.data;
       }else{console.log("error")}
      },function(error){
        console.log("error")
      });
    }

    var getAllLeaves = function(){
      $http.get('http://localhost:3000/admin/getAllLeaveList').then(function(data) {
       if(data.data.status){
        $scope.leaves= data.data.data;
       }else{console.log("error")}
      },function(error){
        console.log("error")
      });
    }

    $scope.userCreateAccount = function(){
      $http.post('http://localhost:3000/admin/createUserAccount',$scope.createUser)
        .then(function(data) {
         if(data.data.status){
            getAllUser();
            swal('user Account Created')
         }else{
          swal('Oops...',data.data.messages,'error')
         }
        },function(error){
          console.log("error")
        });
    }


    $scope.showUser = function(){
      $scope.userList = true;
    }
    $scope.showCreateUser = function(){
      $scope.userList = false;
    }
    // for tab change 
      $scope.attendance = function(){
        $scope.adminCreateUserActive = '';
        $scope.adminLeaveActive = '';
        $scope.adminHolidayList ='';
        $scope.adminAttendance = 'active';
        $scope.containerCreateUser = false;
        $scope.containerLeaveAplication = false;
        $scope.containerHolidayList = false;
        $scope.containerAttendance = true;
        getAllAttendance ();
      }
      $scope.holiday = function(){
        $scope.adminCreateUserActive = '';
        $scope.adminLeaveActive = '';
        $scope.adminHolidayList ='active';
        $scope.adminAttendance = '';
        $scope.containerCreateUser = false;
        $scope.containerLeaveAplication = false;
        $scope.containerHolidayList = true;
        $scope.containerAttendance = false;
      }
      $scope.leave = function(){
        $scope.adminCreateUserActive = '';
        $scope.adminLeaveActive = 'active';
        $scope.adminHolidayList ='';
        $scope.adminAttendance = '';
        $scope.containerCreateUser = false;
        $scope.containerLeaveAplication = true;
        $scope.containerHolidayList = false;
        $scope.containerAttendance = false;
        getAllLeaves();
      }
      $scope.adminUser = function(){
        $scope.adminCreateUserActive = 'active';
        $scope.adminLeaveActive = '';
        $scope.adminHolidayList ='';
        $scope.adminAttendance = '';
        $scope.containerCreateUser = true;
        $scope.containerLeaveAplication = false;
        $scope.containerHolidayList = false;
        $scope.containerAttendance = false;
        getAllUser();
      }
    //end attandance 
      if($scope.containerCreateUser){
        getAllUser();
      }
      $scope.deleteUser = function(value){
        $http.post('http://localhost:3000/admin/deleteUser',{email:value}).then(function(data) {
          if(data.data.status){
            getAllUser();
           }else{console.log("error")}
          },function(error){
            console.log("error")
        });
      }

      $scope.approveLeave =function(id, value){
        $http.post('http://localhost:3000/admin/leaveApprove',{'id':id,'value':value}).then(function(data) {
          if(data.data.status){
            getAllLeaves();
           }else{console.log("error")}
          },function(error){
            console.log("error")
        });
      }

  	$scope.logout = function(){
  		$state.go("login");
  	}
  
  }]);
