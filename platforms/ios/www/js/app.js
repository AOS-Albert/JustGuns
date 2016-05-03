
var BiziToApp = angular.module(
        'ionicApp',
        [
            'ionic',
            'ionic.contrib.drawer',
            'ngCookies',
            'ngCordova',
            'ngStorage',
            'ngResource',
            'ionicLazyLoad',
            'ion-place-tools'
        ]            
        
    )
        .run(function($ionicPlatform,$ionicPopup,$state,$location,$localStorage,$rootScope,$cordovaNetwork,$ionicLoading,$ionicHistory,$ionicBackdrop,$timeout,User,Cart) {
            $ionicPlatform.ready(function() {
                if(window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if(window.StatusBar) {
                    StatusBar.styleDefault();
                }
                // Disable BACK button on home
                $ionicPlatform.registerBackButtonAction(function (event) {
                    if($state.current.name === 'welcome' || $state.current.name === 'resort-list'){
                        User.confirmExit(function(res){
                            if (res) {
                                User.logout(function(){
                                    navigator.app.exitApp();
                                });
                            }
                        });
                    }else{
                        navigator.app.backHistory();
                    }
                }, 100);

                $rootScope.loginType = User.getLoginType();
                $rootScope.loggedin = User.isLoggedIn();
                //Order manage part
                $rootScope.cartList = Cart.list();
                $rootScope.orderCnt = $rootScope.cartList.length;

                $rootScope.active_resort = null;
                if($localStorage.active_resort){
                    $rootScope.active_resort = JSON.parse($localStorage.active_resort);
                }
                $rootScope.active_restaurant = null;
                if($localStorage.active_restaurant){
                    $rootScope.active_restaurant = JSON.parse($localStorage.active_restaurant);
                }

                // listen for Online event
                $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
                    console.log(networkState);
                    $rootScope.networkType = $cordovaNetwork.getNetwork();
                    $rootScope.networkState = ($cordovaNetwork.isOnline())?'online':'offline';
                })

                // listen for Offline event
                $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
                    console.log(networkState);
                    $rootScope.networkType = $cordovaNetwork.getNetwork();
                    $rootScope.networkState = ($cordovaNetwork.isOnline())?'online':'offline';
                    $ionicLoading.show({
                        template: 'You are offline',
                        duration: 3000
                    });
                })
            });
        })
        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('welcome', {
                    url: "/welcome",
                    //abstract:true,
                    templateUrl: "templates/welcome.html",
                    controller: 'UserCtrl'
                })
                .state('signup-welcome', {
                    url: "/signup-welcome",
                    templateUrl: "templates/signup-welcome.html",
                    controller: 'SignupWelcomeCtrl'
                })
                .state('signup', {
                    url: "/signup",
                    templateUrl: "templates/user-signup.html",
                    controller: 'UserCtrl'
                })
                .state('product-home', {
                    url: "/product-home",
                    templateUrl: "templates/product-home.html",
                    controller: 'ProductHomeCtrl'
                })
                .state('list-category', {
                    url: "/list-category",
                    templateUrl: "templates/list-category.html",
                    controller: 'ListCategoryCtrl'
                })
                .state('list-model', {
                    url: "/list-model",
                    templateUrl: "templates/list-model.html",
                    controller: 'ListModelCtrl'
                })
                .state('list-search', {
                    url: "/list-search",
                    templateUrl: "templates/list-search.html",
                    controller: 'ListSearchCtrl'
                })
                .state('offline', {
                    url: "/offline",
                    templateUrl: "templates/offline.html",
                    controller: 'OfflineCtrl'
                })
                .state('about', {
                    url: "/about",
                    templateUrl: "templates/about.html"
                })
                .state('privacy', {
                    url: "/privacy",
                    templateUrl: "templates/privacy.html"
                })
                .state('terms', {
                    url: "/terms",
                    templateUrl: "templates/ToC.html"
                })
                .state('rateus', {
                    url: "/rateus",
                    templateUrl: "templates/rateus.html"
                })
                .state('profile', {
                    url: "/profile",
                    templateUrl: "templates/profile.html",
                    controller: 'ProfileCtrl'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'templates/login.html',
                    controller: 'UserCtrl'
                })
                .state('login-guest', {
                    url: '/login-guest',
                    templateUrl: 'templates/login-guest.html',
                    controller: 'UserCtrl'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'templates/register.html',
                    controller:'UserCtrl'
                })
                .state('forgot', {
                    url: '/forgot',
                    templateUrl: 'templates/forgot.html',
                    controller: 'UserCtrl'
                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: 'templates/contact.html',
                    controller: 'ContactCtrl'
                })
                .state('settings', {
                    url: '/settings',
                    templateUrl: 'templates/settings.html'
                })
                .state('resort-list', {
                    url: '/resort-list',
                    templateUrl: 'templates/resort-list.html',
                    controller: 'ResortListCtrl'
                })
                .state('restaurant-list', {
                    url: '/restaurant-list',
                    templateUrl: 'templates/restaurant-list.html',
                    controller: 'RestaurantListCtrl'
                })
                .state('order-submit', {
                    url: '/order-submit',
                    templateUrl: 'templates/order-submit.html',
                    controller: 'OrderSubmitCtrl'
                })
                .state('order-checkout', {
                    url: '/order-checkout',
                    templateUrl: 'templates/order-checkout.html',
                    controller: 'OrderCheckOutCtrl'
                })
                .state('order-history', {
                    url: '/order-history',
                    templateUrl: 'templates/order-history.html',
                    controller: 'OrderHistoryCtrl'
                })
                .state('order-state', {
                    url: '/order-state',
                    templateUrl: 'templates/order-state.html',
                    controller: 'OrderStateCtrl'
                })
                .state('thanks', {
                    url: '/thanks',
                    templateUrl: 'templates/thanks.html'
                })
                .state('order-place', {
                    url: "/order-place",
                    templateUrl: "templates/order-place.html",
                    controller: 'FoodMenuCtrl'
                })
                .state('return-policy', {
                    url: "/return-policy",
                    templateUrl: "templates/return-policy.html"
                })
                .state('user-address', {
                    url: "/user-address",
                    templateUrl: "templates/user-address.html",
                    controller: 'UserAddressCtrl'
                })
            $urlRouterProvider.otherwise("/welcome");

        })
        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
            $ionicConfigProvider.navBar.alignTitle('center')
        })
        .config(['$ionicConfigProvider', function($ionicConfigProvider) {
            $ionicConfigProvider.tabs.position('top'); // other values: top
        }])
        .config(function($ionicConfigProvider) {
            // remove back button text completely
            $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back').previousTitleText(false);
        })
        .config(function($cordovaInAppBrowserProvider) {

            var defaultOptions = {
                location: 'no',
                clearcache: 'no',
                toolbar: 'no'
            };
            $cordovaInAppBrowserProvider.setDefaultOptions(defaultOptions);
        })
        .config(function($ionicConfigProvider) {
            $ionicConfigProvider.views.swipeBackEnabled(false);
        })
    ;