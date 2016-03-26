/*
User-App  2016-03-27
*/
!function(){"use strict";var a=angular.module("app");a.factory("FlashService",["$rootScope",function(a){function b(){function b(){var b=a.flash;b&&(b.keepAfterLocationChange?b.keepAfterLocationChange=!1:delete a.flash)}a.$on("$locationChangeStart",function(){b()})}function c(b,c){a.flash={message:b,keepAfterLocationChange:c,type:"success"}}function d(b,c){a.flash={message:b,keepAfterLocationChange:c,type:"error"}}var e={};return e.Success=c,e.Error=d,b(),e}])}();