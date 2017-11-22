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
  	$scope.hideCreateAccount = true;
  	$scope.login = function(){
      var data = {
        userName:"sujit.kumar@gmail.com",
        password:"1234"
      }
      $http.post('http://localhost:27017/createAccount',data)
        .then(function(data) {
          alert("save")
        },function(error){
          console.log("error")
        });
  	}

  
  }]);
