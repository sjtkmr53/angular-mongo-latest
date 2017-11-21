'use strict';

/**
 * @ngdoc function
 * @name angular1App.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the angular1App
 */
angular.module('angular1App')
  .controller('loginCtrl',['$scope', '$state', function ($scope, $state) {
  	$scope.hideCreateAccount = true;
  	$scope.login = function(){
  		if($scope.userName === "sujit.kumar@navaratan.com" && $scope.password === "1234"){
  			$state.go('home');
  		}else{
  			swal ( "Oops" ,  "Something went wrong!" ,  "error" )
  		}
  	}

  
  }]);
