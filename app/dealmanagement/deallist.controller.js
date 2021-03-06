(function(){
    'use strict';
    
    var angMod = angular.module("Deals",[]);
    angMod.controller('DeallistController', ['$scope','UserService', function($scope, UserService){
        var ulc = this;
        
        UserService.GetAllUsers().then(function(retData){
            
            var userList = {};
            if(retData.status=="success" && retData.result)
            {
                userList = retData.result.userinfo;
            }
            else
            {
                userList = [{firstName:'No Data', lastName:'No Data', gender: 'No Data'}];
            }
            
            ulc.userList = userList;
            
        });
    }]);
})();