BiziToApp
/**
 * For test, we use proxy
  */
    .constant('ApiEndpoint', {
        // url: 'http://data.justguns.com'
        url: 'http://192.168.1.65'
    })
    //Resort list page directive
    .directive('backImg', function(){
        return function(scope, element, attrs){
            var url = attrs.backImg;
            var content = element.find('a');
            content.css({
                'background-image': 'url(' + url +')',
                'background-position' : 'center top !important',
                'background-size' : 'cover'
            });
        };
    })
    .directive('googleplace', function() {
        return {
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel) {
                var options = {
                    types: [],
                    componentRestrictions: {}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
     
                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    scope.$apply(function() {
                        ngModel.$setViewValue(element.val());                
                    });
                });
            }
        };
    })
    .directive('validNumber', function() {
        return {
            require: '?ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                if(!ngModelCtrl) {
                    return;
                }

                ngModelCtrl.$parsers.push(function(val) {
                    if (angular.isUndefined(val)) {
                        var val = '';
                    }
                    var clean = val.replace(/[^0-9\.]/g, '');
                    var decimalCheck = clean.split('.');

                    if(!angular.isUndefined(decimalCheck[1])) {
                        decimalCheck[1] = decimalCheck[1].slice(0,2);
                        clean =decimalCheck[0] + '.' + decimalCheck[1];
                    }

                    if (val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                element.bind('keypress', function(event) {
                    if(event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        };
    })
    .service('ModalService', function($ionicModal, $rootScope) {

        var init = function(tpl, $scope) {

            var promise;
            $scope = $scope || $rootScope.$new();

            promise = $ionicModal.fromTemplateUrl(tpl, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
                return modal;
            });

            $scope.openModal = function() {
                $scope.modal.show();
            };
            $scope.closeModal = function() {
                $scope.modal.hide();
            };
            $scope.$on('$destroy', function() {
                $scope.modal.remove();
            });

            return promise;
        }

        return {
            init: init
        }

    })
    .factory('APIService', function ($resource,ApiEndpoint) { // Using ngResource service ,good
        var data = $resource(
            ApiEndpoint.url,
            {},
            {
                login: {
                    url: ApiEndpoint.url + '/api/v1/justguns/login',
                    method:'POST'
                },
                register: {
                    url: ApiEndpoint.url + '/api/v1/justguns/signup',
                    method:'POST'
                },
                editUser: {
                    url: ApiEndpoint.url + '/userEdit',
                    method:'POST'
                },
                forgotPassword: {
                    url: ApiEndpoint.url + '/forgetPassword',
                    method:'POST'
                },
                getUser: {
                    url: ApiEndpoint.url + '/detail',
                    method:'GET'
                },
                getGuestId: {
                    url: ApiEndpoint.url + '/guestId',
                    method:'GET'
                },
                resortList: {
                    url: ApiEndpoint.url + '/listresort',
                    method:'GET'
                },
                restaurantList: {
                    url: ApiEndpoint.url + '/listRestraurent',
                    method:'GET'
                },
                categoryList: {
                    url: ApiEndpoint.url + '/categoryList',
                    method:'GET'
                },
                topingList: {
                    url: ApiEndpoint.url + '/topingList',
                    method:'GET'
                },
                dishList: {
                    url: ApiEndpoint.url + '/dishList',
                    method:'GET'
                },
                orderList: {
                    url: ApiEndpoint.url + '/myorderList',
                    method:'POST'
                },
                orderDetail: {
                    url: ApiEndpoint.url + '/orderDetail',
                    method:'POST'
                },
                contactUs: {
                    url: ApiEndpoint.url + '/contactUs',
                    method:'POST'
                }, //james
                checkGuestEmail: {
                    url: ApiEndpoint.url + '/emailexits',
                    method:'POST'
                },
                orderNow: {
                    url: ApiEndpoint.url + '/pages/orderNow',
                    method:'POST'
                },
                zipcode: {
                    url: ApiEndpoint.url + '/zipcodes',
                    method:'GET'
                }
            });
        return data;
    })
    .factory('ApiHTTPService', function ($http, $q, $rootScope, $localStorage, $timeout, ApiEndpoint) { // Using ngResource service ,good
        
        var self = this;

        self.login = function(data){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/login',
                method: "POST",
                data : data
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

        self.logout = function(){

            var defer = $q.defer();
            if(JSON.parse($localStorage.profile).id) {
                defer.resolve(null);
                return defer.promise;
            }

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/logout?token=' + $localStorage.token,
                method: "GET"
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

        self.register = function(data){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/signup',
                method: "POST",
                data : data
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

        self.editUser = function(data){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/userEdit?token=' + $localStorage.token,
                method: "POST",
                data : data
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

        self.forgotPassword = function(data){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/forgetPassword?token=' + $localStorage.token,
                method: "POST",
                data : data
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

        self.receiptList = function(data){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/receipt?token=' + $localStorage.token,
                method: "POST",
                data : data
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

        self.storeList = function(data){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/store?token=' + $localStorage.token,
                method: "GET"
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

        self.categoryList = function(data){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/categoryList?token=' + $localStorage.token,
                method: "GET"
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }
        self.deleteReceipt = function(data){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/delete_receipt?token=' + $localStorage.token + '&id=' + data,
                method: "GET"
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

        self.getByStore = function(id){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/getByStore?token=' + $localStorage.token,
                method: "POST",
                data: {
                    id: id
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

        self.getByProduct = function(id){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/getByProduct?token=' + $localStorage.token,
                method: "POST",
                data: {
                    id: id
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

        self.getByCategory = function(id){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/getByCategory?token=' + $localStorage.token,
                method: "POST",
                data: {
                    id: id
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

        self.getByMonth = function(id){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/getByMonth?token=' + $localStorage.token,
                method: "POST",
                data: {
                    id: id
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

        self.getByTime = function(id){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/getByTime?token=' + $localStorage.token,
                method: "POST",
                data: {
                    id: id
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

// points part for customer

        self.getPoints = function(id, type){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/getmypoint?token=' + $localStorage.token,
                method: "POST",
                data: {
                    id: id,
                    type: type
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }
        self.getTransationHistory = function(id, retailerId){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/gettranhistory?token=' + $localStorage.token,
                method: "POST",
                data: {
                    id: id,
                    retailer_id: retailerId
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }
        self.getRedeemPoints = function(id, retailerId, redeemPointNum){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/redeempoint?token=' + $localStorage.token,
                method: "POST",
                data: {
                    customer_id: id,
                    retailer_id: retailerId,
                    redeem_number: redeemPointNum
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }

// Coupon part about transation

        self.viewAllCoupon = function(id){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/viewAllCoupon?token=' + $localStorage.token,
                method: "POST",
                data: {
                    customer_id: id
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }
        self.saveCoupon = function(){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/saveCoupon?token=' + $localStorage.token,
                method: "GET"
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }
        self.viewMyCoupon = function(id){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/viewMyCoupon?token=' + $localStorage.token,
                method: "POST",
                data: {
                    customer_id: id
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }
        self.deleteCoupon = function(){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/deleteCoupon?token=' + $localStorage.token,
                method: "GET"
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }
        self.registerCard = function(id, cardNumber, description){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/registerCard?token=' + $localStorage.token,
                method: "POST",
                data : {
                    customer_id: id,
                    cardnumber: cardNumber,
                    description: description,
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }
        self.getCardInfo = function(id){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/showCards?token=' + $localStorage.token,
                method: "POST",
                data: {
                    customer_id: id
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }
        self.removeCard = function(id, row){

            var defer = $q.defer();

            $http({
                url: ApiEndpoint.url + '/api/v1/justguns/deleteCard?token=' + $localStorage.token,
                method: "POST",
                data: {
                    customer_id: id,
                    cardID: row.id
                }
            })
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(error){
                    defer.reject(error);
                });

            return defer.promise;

        }        
        return self;
    })
    .service('Session', ['$cookieStore', function ($cookieStore) {
        var localStoreAvailable = typeof (Storage) !== "undefined";
        this.store = function (name, details) {
            if (localStoreAvailable) {
                if (angular.isUndefined(details)) {
                    details = null;
                } else if (angular.isObject(details) || angular.isArray(details) || angular.isNumber(+details || details)) {
                    details = angular.toJson(details);
                };
                sessionStorage.setItem(name, details);
            } else {
                $cookieStore.put(name, details);
            };
        };

        this.persist = function(name, details) {
            if (localStoreAvailable) {
                if (angular.isUndefined(details)) {
                    details = null;
                } else if (angular.isObject(details) || angular.isArray(details) || angular.isNumber(+details || details)) {
                    details = angular.toJson(details);
                };
                localStorage.setItem(name, details);
            } else {
                $cookieStore.put(name, details);
            }
        };

        this.get = function (name) {
            if (localStoreAvailable) {
                return getItem(name);
            } else {
                return $cookieStore.get(name);
            }
        };

        this.destroy = function (name) {
            if (localStoreAvailable) {
                localStorage.removeItem(name);
                sessionStorage.removeItem(name);
            } else {
                $cookieStore.remove(name);
            };
        };

        var getItem = function (name) {
            var data;
            var localData = localStorage.getItem(name);
            var sessionData = sessionStorage.getItem(name);

            if (sessionData) {
                data = sessionData;
            } else if (localData) {
                data = localData;
            } else {
                return null;
            }

            if (data === '[object Object]') { return null; };
            if (!data.length || data === 'null') { return null; };

            if (data.charAt(0) === "{" || data.charAt(0) === "[" || angular.isNumber(data)) {
                return angular.fromJson(data);
            };

            return data;
        };

        return this;
    }])
    .factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
        var self = this;

        // Handle query's and potential errors
        self.query = function (query, parameters) {
            parameters = parameters || [];
            var q = $q.defer();

            $ionicPlatform.ready(function () {
                $cordovaSQLite.execute(db, query, parameters)
                    .then(function (result) {
                        q.resolve(result);
                    }, function (error) {
                        //console.warn('I found an error');
                        //console.warn(error);
                        q.reject(error);
                    });
            });
            return q.promise;
        }

        // Proces a result set
        self.getAll = function(result) {
            var output = [];

            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }
            return output;
        }

        // Proces a single result
        self.getById = function(result) {
            var output = null;
            output = angular.copy(result.rows.item(0));
            return output;
        }

        return self;
    })
    .factory('Cart', function ($localStorage) {
        var self = this;
        var localStoreAvailable = typeof (Storage) !== "undefined";
        // Set cart list
        self.storeAll = function (list) {
            if(localStoreAvailable){
                if(list && list.length > 0){
//console.log("*****************"+$localStorage);
                    $localStorage.cartList = JSON.stringify(list);
                    return list.length;
                }else{
                    return false;
                }
            }
        }

        /***
         *
         * @param id = {'netPrice','deliveryPrice','taxesPrice','grandTotalPrice'}
         * @param value
         */
        self.store = function (id, value) {
            $localStorage[id] = value;
        }

        self.fetch = function (id) {
            if(id){
                return $localStorage[id];
            }
            return false;
        }

        // Get cart list
        self.list = function () {
            if(localStoreAvailable){
                var c = [];
                if($localStorage.cartList){
                    c = JSON.parse($localStorage.cartList);
                }
                return c;
            }
        }

        // Get cart
        self.cart = function (id) {
            if(localStoreAvailable){
                var c = self.list();
                for(var k=0;k<c.length;k++){
                    if(c[k].Dish.id == id){
                        return c[k];
                    }
                }
                return false;
            }
        }

        // Replace item
        self.replace = function (item) {
            if(localStoreAvailable){
                var c = self.list();
                for(var k=0;k<c.length;k++){
                    if(c[k].Dish.id == item.Dish.id){
                        c[k] = item;
                    }
                }
                self.storeAll(c);
                return self.list();
            }
        }
        
        // Add cart
        self.add = function (item) {
            if(localStoreAvailable){
                var e = self.list();
                e.push(item);
                if(self.storeAll(e)){
                    return self.list();
                }else{
                    return false;
                }
            }
        }
        
        // Remove cart
        self.remove = function (id) {
            if(localStoreAvailable){
                var a = [],b = self.list();
                for(var k=0;k < b.length;k++){
                    if(b[k].Dish.id != id){
                        a.push(b[k]);
                    }
                }
                $localStorage.cartList = JSON.stringify(a);
                return a;
            }
        }
        
        // Remove all
        self.removeAll = function () {
            if(localStoreAvailable){
                delete $localStorage.cartList;
                return true;
            }
        }

        return self;
    })
    .factory('User', function ($localStorage, $rootScope, $ionicHistory, $state, $ionicLoading, $ionicPopup, APIService, $cordovaFacebook, $cordovaGooglePlus, $location ,Cart) {
        /***
         * User status manage variables
         var user = {
             id: 0,
             first_name: '',
             last_name: '',
             email: '',
             password: '',
             confirm_password: '',
             user_phoneNo: '',
             user_city: '',
             user_state: '',
             country: '',
             user_address: '',
             user_image: '',
             logintype_id: '',
             register_type: '',
             is_validatePhoneNo: '',
             is_active: ''
         };
         * $localStorage.loggedIn => bool
         * $localStorage.profile => user profile
         * $localStorage.loginType => Guest,Email,Fb,Google
         * $localStorage.guestId => Guest user id
         */
        var self = this;
        var localStoreAvailable = typeof (Storage) !== "undefined";

        self.isLoggedIn = function () {
            if(localStoreAvailable){
                if($localStorage.loggedIn){
                    return $localStorage.loggedIn;
                }else{
                    return false;
                }
            }
            return false;
        }

        // Get user profile
        self.profile = function () {
            var p = {
                id: 0,
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                role: "admin",
                confirm_password: '',
                user_phoneNo: '',
                user_city: '',
                user_state: '',
                country: '',
                user_address: '',
                user_image: '',
                logintype_id: '',
                register_type: '',
                is_validatePhoneNo: '',
                is_active: ''
            };
            if(localStoreAvailable){
                if($localStorage.profile){
                    p = JSON.parse($localStorage.profile);
                }
            }
            return p;
        }

        // Store profile
        /**
         * How to use :
         *
         *  User.store(profile,'Guest'); // profile = { id: <guest_id> };
         *  User.store(profile,'Email');
         *  User.store(profile,'Fb');
         *  User.store(profile,'Google');
         *
         * @param profile
         * @param loginType
         * @returns {boolean}
         */
        self.store = function (profile,token) {
            if(localStoreAvailable){
                $localStorage.profile = JSON.stringify(profile);
                $localStorage.loggedIn = true;
                $localStorage.token = token;
                $localStorage.loginType = 'Email';
                return true;
            }
        }

        // Remove user profile
        self.logout = function (callback) {

            $ionicLoading.show('Logout..');
            //User related
            var loginType = self.getLoginType();
            if(loginType === 'Fb'){
                // Facebook logout
                $cordovaFacebook.logout()
                    .then(function(success) {
                        // success
                    }, function (error) {
                        // error
                        $ionicPopup.alert({
                            title: 'Error',
                            template:'facebook logout error'
                        });
                    });
            }else if(loginType === 'Google'){
                // Google+ logout
                $cordovaGooglePlus.logout();
            }

            //if(localStoreAvailable){
            //    //delete $localStorage.profile;
            //    //delete $localStorage.loginType;
            //    //delete $localStorage.loggedIn;
            //    $localStorage.$reset();
            //    $ionicHistory.clearCache();
            //    $ionicHistory.clearHistory();
            //}

            $localStorage.$reset();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();

            if(callback){
                callback();
            }else{
                $rootScope.$broadcast('user:logout',self.profile());
                setTimeout(function () {
                    $ionicLoading.hide();
                    $location.path("/welcome");
                },1000);
            }
        }

        // Get login type
        self.getLoginType = function () {
            if(localStoreAvailable){
                var p = 'Guest';
                if($localStorage.loginType){
                    p = $localStorage.loginType;
                }
                return p;
            }
        }

        // Set login type
        self.storeLoginType = function (type) {
            if(localStoreAvailable){
                var p = type || 'Guest';
                $localStorage.loginType = p;
                return true;
            }
        }

        // Get guest id
        self.getGuestId = function () {
            if(localStoreAvailable){
                var p = 'Guest';
                if($localStorage.guestId){
                    p = $localStorage.guestId;
                }
                return p;
            }
        }

        // Set guest id
        self.setGuestId = function (id) {
            if(localStoreAvailable){
                $localStorage.guestId = id;
                return true;
            }
        }


        self.userUpdate = function () {

        }
        // Login
        /**
            data = {
                email: '',
                password: '',
                register_type: 'Email',
                logintype_id: ''
            };
            data = {
                email: '',
                password: '',
                register_type: 'Fb',
                logintype_id: ''
            };
         * @param data
         */
        self.login = function (data,loginType, succCallback, errCallback) {
            try{
                $ionicLoading.show({template:'Login...'});


                // $http({method: "post", 
                //     url: ApiEndpoint.url, 
                //     data: {
                //         email : "admin@gmail.com",
                //         password : "admin"
                //     }
                // })
                // .success(function(succ) {
                //      $ionicLoading.hide();
                //         // Do success
                //         if(!succ.error){
                //             //sucess
                //             self.store(succ.user, succ.token);
                //             succCallback && succCallback();
                //         }else{
                //             //error
                //             errCallback && errCallback(succ);
                //         }
                // })
                // .error(function(err) {
                //         $ionicLoading.hide();
                //         $ionicPopup.alert({
                //             title:'Login information',
                //             template: 'Login error!'//JSON.stringify(err)
                //         });
                // });


                APIService.login(
                    data,
                    function (succ) {
                        $ionicLoading.hide();
                        // Do success
                        if(!succ.error){
                            //sucess
                            self.store(succ.user, succ.token);
                            succCallback && succCallback();
                            
                        }else{
                            //error
                            $ionicPopup.alert({
                            title:'Login Information',
                            template: 'Invalid Email or Password!'//JSON.stringify(err)
                        });
                        }
                    }, function (err) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title:'Network Information',
                            template: 'Server Connect Failed!'//JSON.stringify(err)
                        });
                    }
                );
            }catch (err){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Alert',
                    template: err.message
                });
            }
        }

        self.register = function (data,loginType,succCallback,errCallback) {
            try{
                $ionicLoading.show({template: 'Registering'});
                APIService.register(
                    data,
                    function(result){
                        $ionicLoading.hide();
                        if((parseInt(result.status) == 0)) {
                            self.store(result.user,result.token);
                            succCallback && succCallback(result);
                        }else{
                            errCallback && errCallback(result);
                        }
                    },
                    function (err) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Register Error',
                            template: 'Server connect error'//JSON.stringify(err)
                        });
                    }
                );
            }catch (err){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Alert',
                    template: err.message
                });
            }
        }

        self.registerGuest = function (succCallback,errCallback) {
            try{
                $ionicLoading.show({
                    template: 'Logging in as guest'
                });
                APIService.getGuestId(
                    {},
                    function (result) {
                        $ionicLoading.hide();
                        if(!result.description.error){
                            self.store(
                                {
                                    id: result.description.data,
                                    register_type: 'Guest'
                                },
                                'Guest'
                            );
                            succCallback && succCallback();
                        }else{
                            $ionicPopup.alert({
                                title: 'Error',
                                template: result.description.error
                            });
                            errCallback && errCallback();
                        }
                    },
                    function (err) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error',
                            template: 'Server connect error'//JSON.stringify(err)
                        });
                    }
                );
            }catch (err){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Alert',
                    template: err.message
                });
            }
        }

        self.forgotPassword = function (data,succCallback) {
            try{
                $ionicLoading.show({template:'Sending...'});
                APIService.forgotPassword(
                    data,
                    function (succ) {
                        $ionicLoading.hide();
                        // Do success
                        if(!succ.description.error){
                            //sucess
                            $ionicPopup.alert({
                                title:succ.message,
                                template: succ.description
                            });
                            succCallback && succCallback();
                        }else{
                            //error
                            $ionicPopup.alert({
                                title:succ.message,
                                template: succ.description.error
                            });
                        }
                    }, function (err) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title:'Info',
                            template: 'Server connect error'//JSON.stringify(err)
                        });
                    }
                );
            }catch (err){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Alert',
                    template: err.message
                });
            }
        }
        /**
         * Check user login data is valid or not
         * @param data
         * @returns {boolean}
         */
        self.isValidInfo = function(data){
            if(!data)return false;
            if(!data.email || !data.password){
                return false;
            }else{
                return true;
            }
        }

        self.confirmExit = function (callback) {
            $ionicPopup.confirm({
                title: 'Warning',
                template: 'Do you want to exit and close the application? All data will be lost'
            }).then(function(res) {
                callback && callback(res);
            })
        }

        return self;
    })
    .factory('xmlParser', function () {
        var x2js = new X2JS();
        return {
            xml2json: function (args) {
                return angular.bind(x2js, x2js.xml2json, args)();
            },
            xml_str2json: function (args) {
                return angular.bind(x2js, x2js.xml_str2json, args)();
            },
            json2xml_str: function (args) {
                return angular.bind(x2js, x2js.json2xml_str, args)();
            }
        }
    })
    .factory('Payment',function ($localStorage, $http, $ionicLoading, $ionicPopup, User, ConvergeEndpoint,xmlParser) {
        var self = this,
            loginType = User.getLoginType();

        // Get profile payment
        self.getProfile = function () {
            var profile = User.get();

            return {
                //profile vars
                first_name:profile.first_name,
                last_name:profile.last_name,
                phone:profile.phone,
                email:profile.email,
                address:profile.user_address,
                city:profile.user_city,
                state:profile.user_state,
                zipcode:profile.zipcode,
                country:profile.country,
                //order details relate vars
                resort_id:'',
                restraurent_id:'',
                items:null,
                user_type:loginType,
                user_id:profile.id,
                //payment relate vars
                room_no:'',
                driver_tip:0,
                orderstatus:'0',
                payment_status:'',//"Pending"
                payment_type:'',//"Paypal"
                transaction_id:''//"xldokr8dkmkfmpl"
            };
        }

        // Payment submit to converge
        self.submitToConverge = function(form_data,succCallback,errCallback){
            var d = {
                ssl_merchant_id: '005457',
                ssl_user_id: 'webpage',
                ssl_pin: '2M2E64',
                ssl_transaction_type: 'ccsale',
                ssl_test_mode: true,
                ssl_card_number: '378282246310005',
                ssl_exp_date: '1216',
                ssl_amount: '61.11',
                ssl_description:'Test Transaction',
                products: 'Test ::1::001 Transaction::',
                ssl_cvv2cvc2_indicator:'1',
                ssl_cvv2cvc2:'0005',
                ssl_first_name:'test',
                ssl_last_name:'tester',
                ssl_company:'Test Company',
                ssl_avs_address:'666 champain hwp',
                ssl_city:'Knoxvilie',
                ssl_state:'TN',
                ssl_country:'USA',
                ssl_avs_zip:'37920',
                ssl_phone:'905-555-1234',
                ssl_email:'test@wjsskanyo.com'
            }
            //$http.post(ConvergeEndpoint.url, {
            //    params: d
            //})
            //$http({
            //    method: 'POST',
            //    url: ConvergeEndpoint.url
            //})
            //    .success(function(data) {
            //        alert("SUCCESS!" + JSON.stringify(data));
            //    })
            //    .error(function(data) {
            //        alert("ERROR" + JSON.stringify(data));
            //    });
            $ionicLoading.show({
                template: 'Submitting...'
            });
            var xml = '<txn><ssl_merchant_id>007126</ssl_merchant_id><ssl_pin>32968K</ssl_pin><ssl_user_id>webpage</ssl_user_id><ssl_test_mode>false</ssl_test_mode><ssl_transaction_type>ccsale</ssl_transaction_type><ssl_card_number>378282246310005</ssl_card_number><ssl_exp_date>0916</ssl_exp_date><ssl_amount>60.12</ssl_amount><ssl_description>Test Description</ssl_description><products>60.12::1::001::Test Description::</products><ssl_cvv2cvc2_indicator>1</ssl_cvv2cvc2_indicator><ssl_cvv2cvc2>005</ssl_cvv2cvc2><ssl_first_name>First</ssl_first_name><ssl_last_name>Last</ssl_last_name><ssl_company>TestCompany</ssl_company><ssl_avs_address>TEst address</ssl_avs_address><ssl_city>Paris</ssl_city><ssl_state>Paris</ssl_state><ssl_country>France</ssl_country><ssl_avs_zip>32487</ssl_avs_zip><ssl_phone>905-112-3332</ssl_phone><ssl_email>test@tt.com</ssl_email></txn>';
            var xml1 = '<txn><ssl_merchant_id>007126</ssl_merchant_id><ssl_user_id>webpage</ssl_user_id><ssl_pin>32968K</ssl_pin><ssl_test_mode>false</ssl_test_mode><ssl_transaction_type>ccsale</ssl_transaction_type><ssl_card_number>378282246310005</ssl_card_number><ssl_exp_date>0916</ssl_exp_date><ssl_amount>10.10</ssl_amount><ssl_cvv2cvc2_indicator>1</ssl_cvv2cvc2_indicator><ssl_first_name>Test</ssl_first_name><ssl_partial_auth_indicator>1</ssl_partial_auth_indicator></txn>';
            $http.post(ConvergeEndpoint.xml_url, xml1)
                .success(function(data) {
                    $ionicLoading.hide();
                    var dd = xmlParser.xml_str2json(data);
                    succCallback && succCallback(dd.txn);
                })
                .error(function(data) {
                    $ionicLoading.hide();
                    errCallback && errCallback(data);
                });
        }
        return self;
    })
    .factory('IntroModalProvider', function IntroModalProvider(
                              $rootScope,
                              $ionicModal,
                              $ionicSlideBoxDelegate,
                              common) {

      var introModal, welcomeModal = null;

      var initIntroModal = function($scope) {
          var promise;
          var tpl = 'template/intro.html'
          $scope = $scope || $rootScope.$new();
          if(!introModal){
            $ionicModal.fromTemplateUrl(tpl, {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function(modal) {
                introModal = modal;
                modal.show();
              });
          } else {
              introModal.show();
          }
          $scope.closeIntro = function () {
              if($scope.slideIndex != 3){
                  $scope.next();
              } else {
                  introModal.hide();
              }
          };
          $scope.slideChanged = function(index) {
              $scope.slideIndex = index;
          };
          $scope.next = function() {
              $ionicSlideBoxDelegate.next();
          };
          $scope.previous = function() {
              $ionicSlideBoxDelegate.previous();
          };
        };

        var initWelcomeModal = function($scope) {
            var promise;
            var tpl = 'template/welcome.html'
            $scope = $scope || $rootScope.$new();
            if(!welcomeModal){
              $ionicModal.fromTemplateUrl(tpl, {
                  scope: $scope,
                  animation: 'slide-in-up'
                }).then(function(modal) {
                  welcomeModal = modal;
                  welcomeModal.show();
                });
            } else {
                welcomeModal.show();
            }
            $scope.closeWelcomeIntro = function (screenToShow) {
                if(screenToShow == 'login'){
                    common.checkLogin();
                } else {
                    $rootScope.$broadcast('show-register-page');
                }
                welcomeModal.hide();
            };

          };

        return {
          showIntroModal: initIntroModal,
          showWelcomModal: initWelcomeModal
        }

    })
;
function MyCtrl($scope) {
    $scope.gPlace;
}