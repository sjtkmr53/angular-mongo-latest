'use strict';
angular.module('angular1App')
  .controller('adminCtrl',['$scope', '$state','$http','$rootScope','$window',function ($scope, $state,$http,$rootScope,$window) {
  	$scope.createUser = {};
  	$scope.adminEmail =  $window.localStorage.email;
  	$scope.userCreateAccount = function(){
  		$http.post('http://localhost:3000/createUserAccount',$scope.createUser)
        .then(function(data) {
         if(data.data.status){
         	 swal('user Account Created')
         }else{
          swal('Oops...',data.data.messages,'error')
         }
        },function(error){
          console.log("error")
        });
  	}
  	$scope.logout = function(){
  		$state.go("login");
  	}
  
  }]);
