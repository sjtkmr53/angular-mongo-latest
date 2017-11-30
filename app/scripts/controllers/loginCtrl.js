'use strict';

/**
 * @ngdoc function
 * @name angular1App.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the angular1App
 */
angular.module('angular1App')
  .controller('loginCtrl',['$scope', '$state','$http','$rootScope','$window', function ($scope, $state,$http,$rootScope,$window) {
  	$scope.hideCreateAccount = false;
   function allFieldRequiredMessages(){
      return swal('Oops...','All Fields are required.','error')
    } 
    $scope.accountCreate = {};
    $scope.userLogin = {};
  	$scope.adminCreateAccount = function(){
      if($scope.accountCreate.name && $scope.accountCreate.password && $scope.accountCreate.email && $scope.accountCreate.passcode){
         $http.post('http://localhost:3000/admin/createAccount',$scope.accountCreate)
        .then(function(data) {
         if(data.data.status){
          $scope.hideCreateAccount = false;
         }else{
          swal('Oops...',data.data.messages,'error'
        )
         }
        },function(error){
          console.log("error")
        });
      }else{
        allFieldRequiredMessages()
      }
  	}
    $scope.createAccount = function(){
      $scope.hideCreateAccount = true;
    }
    $scope.alreadyAccount = function(){
      $scope.hideCreateAccount = false;
    }
    
    $scope.login = function(){
      if($scope.userLogin.email && $scope.userLogin.password){
        $http.post('http://localhost:3000/common/login',$scope.userLogin)
        .then(function(data) {
         if(data.data.status){
          $window.localStorage.setItem("email", data.data.email);
          if(data.data.type ==="Admin"){
            $state.go('admin');
          }else{
            $state.go('user');
          }
         }else{
          swal('Oops...',data.data.messages,'error'
        )
         }
        },function(error){
          console.log("error")
        });
      }else{
         allFieldRequiredMessages()
      }
    }


  
  }]);
