/*
User-App  2016-03-27
*/
!function(){"use strict";var a=angular.module("app");a.factory("AppInterceptor",["$rootScope","$injector","cfpLoadingBar",function(a,b,c){return{request:function(b){return a.globals&&a.globals.isAuth&&(b.headers["x-session-token"]=a.globals.reqToken),c.start(),b},response:function(a){return c.complete(),a}}}])}();