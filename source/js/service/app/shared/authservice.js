/*
User-App  2016-03-27
*/
!function(){function a(a,b,c,d,e,f){function g(a,b,c){f.AuthenticateUser(a,b).then(function(a){var b;a&&a.status&&"success"==e("lowercase")(a.status)?(d.sesTokenId=a.tokenId,b={success:!0}):b={success:!1,message:"Username or password is incorrect"},c(b)})}function h(a,c){d.globals={currentUser:{username:a,password:c},isAuth:!0,reqToken:d.sesTokenId},b.put("globals",d.globals)}function i(){d.globals={},b.remove("globals")}var j={};return j.Login=g,j.SetCredentials=h,j.ClearCredentials=i,j}var b=angular.module("app");b.factory("AuthService",a),a.$inject=["$http","$cookies","$q","$rootScope","$filter","UserService"]}();