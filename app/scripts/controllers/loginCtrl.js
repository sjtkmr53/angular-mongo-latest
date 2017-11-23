'use strict';

/**
 * @ngdoc function
 * @name angular1App.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the angular1App
 */
angular.module('angular1App')
  .controller('loginCtrl',['$scope', '$state','$http', function ($scope, $state,$http) {
  	$scope.hideCreateAccount = false;
   function allFieldRequiredMessages(){
      return swal('Oops...','All Fields are required.','error')
    } 
    $scope.accountCreate = {};
    $scope.userLogin = {};
  	$scope.adminCreateAccount = function(){
      if($scope.accountCreate.name && $scope.accountCreate.password && $scope.accountCreate.email && $scope.accountCreate.passcode){
         $http.post('http://localhost:3000/createAccount',$scope.accountCreate)
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
        $http.post('http://localhost:3000/login',$scope.userLogin)
        .then(function(data) {
         if(data.data.status){
          console.log(data);
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
