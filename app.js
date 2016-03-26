(function(){
    'use strict';
    var angModule = angular.module('app',['ui.router','ui.router.router','ngCookies', '720kb.datepicker', 'angular-loading-bar','LocalStorageModule','ngAnimate','Deals','UserDetails']);
    var $stateProviderRef = null;
    angModule.run(['$rootScope','$state',function($rootScope,$state){
        $rootScope.$state = $state;
    }]);
    
    angModule.config(['$stateProvider', '$urlRouterProvider', '$httpProvider','localStorageServiceProvider','cfpLoadingBarProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider,localStorageServiceProvider,cfpLoadingBarProvider){
        
        localStorageServiceProvider.setPrefix('uiapp');
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 500;
        $urlRouterProvider.otherwise("/login");        
        
        $stateProvider.state('login', {
            url: '/login',
            params:{returnState:'',returnParams:{}},
            templateUrl: 'app/login/loginView.html',
            controller: 'LoginController as lc'            
        });        
        /*state('landing', {            
            url: '/landing',            
           templateUrl: 'app/landingpage/landing.view.html',
           data : {requiredLogin: true, state: 'landing'},
           abstract:true           
                     
        })
        .state('landing.newuser',{
            url:'/users',
            templateUrl:'app/usermanagement/useradd.view.html',
            data : {requiredLogin: true, state: 'landing.newuser'},
            controller: 'AddUserController as auc'
        })
        .state('landing.edituser',{
            url:'/users/:userId',
            templateUrl:'app/usermanagement/useradd.view.html',
            data : {requiredLogin: true, state: 'landing.edituser'},
            controller: 'AddUserController as auc'
        })
        .state('landing.listuser',{
            url:'/newuser',
            templateUrl:'app/usermanagement/userlist.view.html',
            data : {requiredLogin: true, state: 'landing.listuser'},
            controller: 'UserlistController as ulc'
        }); */
        
        $httpProvider.interceptors.push('AppInterceptor'); 
        $stateProviderRef = $stateProvider;
       
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);
    
    angModule.run(['$rootScope','$location','$cookies','$http','$state','cfpLoadingBar','$urlRouter',function($rootScope,$location,$cookies,$http,$state,cfpLoadingBar,$urlRouter){
        $rootScope.globals = $cookies.globals || {};
        /*$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        $http.defaults.headers.common['Access-Control-Allow-Headers'] = '*';*/
        /* $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
             if(toState.name === 'landing')
             {
                 $state.go('.listuser');
             }
         });
        $rootScope.$on('$locationChangeStart', function(event, next, current){
            var restrictedPage = $.inArray($location.path(),['/landing', '/list','/landing/users']);
            var loggedIn = $rootScope.globals.currentUser;
            
            if(restrictedPage > -1 && !loggedIn)
            {
                $location.path('/login');
            }
        });*/
        $state = $rootScope.$state;
        $http.get("config.json").then(function(response){
            angular.forEach(response, function(value, key){
                var checkStateExist = value;
                
                angular.forEach(value, function(module, key1){
                    if(module.pckInclude)
                    {
                                               
                            var isStateArray = angular.isArray(module.stateRoutes);                        
                            if(isStateArray)
                            {
                                angular.forEach(module.stateRoutes, function(stateValues, key3){
                                var getExistingState = $state.get(stateValues.name);
                                    if(getExistingState !== null){
                                        return; 
                                    } 
                                    
                                    var state = {
                                        "url": stateValues.url,
                                        "parent": stateValues.parent,
                                        "abstract": stateValues.abstract,
                                        "data": stateValues.data,
                                        "templateUrl": stateValues.templateUrl,
                                        "controller":stateValues.controller
                                    };
                                    if($stateProviderRef !== null){
                                        $stateProviderRef.state(stateValues.name, state);
                                        $urlRouter.sync();
                                        $urlRouter.listen();
                                    }
                                });                            
                            }
                       
                    }  
                });
            });
        }, function(err){return {status:'error', message:'No data'};});
        
        
         $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
           // var restrictedPage = $.inArray($location.path(),['/landing', '/list','/landing/users']);
            
            var data = toState.data;
            if(typeof toState.data !== 'undefined' && fromState.name !== 'login')
            {
                var loginRequired = typeof data.requiredLogin === 'undefined' ? false : data.requiredLogin; 
                
                var loggedIn = $rootScope.globals.currentUser;
                
                if(loginRequired && !loggedIn)
                {
                    event.preventDefault();
                    $state.transitionTo('login', {returnState:data.state, returnParams: toParams});
                }
            }
        });
        
         $rootScope.start = function() {
         cfpLoadingBar.start();
        };

        $rootScope.complete = function () {
            cfpLoadingBar.complete();
        };  
                
    }]);
    
})();