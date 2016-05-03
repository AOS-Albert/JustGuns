/**
 * Login type: Guest,Email,Fb,Google
 * Default Login type:Guest
 */

BiziToApp
    .controller('MainCtrl', function ($scope, $rootScope, $cordovaNetwork, $cordovaCamera, $cordovaFile, $ionicActionSheet, $cordovaInAppBrowser, $cordovaFacebook, $localStorage, $location, $cordovaGooglePlus, $ionicHistory, $ionicSideMenuDelegate, $state, $ionicPopup, $ionicLoading, APIService, User, Cart) {
        $scope.init = function () {
            //User manage part
            $rootScope.loginType = User.getLoginType();
            $rootScope.loggedin = User.isLoggedIn();
            $scope.user = User.profile();
            $scope.login_data = {
                email: '',
                password: '',
                register_type: 'Email',
                logintype_id: ''
            };
            $scope.register_data = {
                password:"",
                first_name:"",
                last_name:"",
                user_phoneNo:"",
                email:"",
                user_address:"",
                pincode:"",
                user_city:"",
                user_state:"",
                logintype_id:"",
                user_image:"",
                register_type:'Email',
                is_validatePhoneNo:"",
                is_active:"1"
            };
            $scope.forgot_data = {
                email:''
            }
            $scope.capture_image = '';

            if(User.isLoggedIn()){
                if($rootScope.loginType == 'Guest'){
                    $location.path("/login");
                }else{
                    // $location.path("/resort-list");
                    $state.go('product-home');
                }
            }

            //Order manage part
            $rootScope.cartList = Cart.list();
            $rootScope.orderCnt = $rootScope.cartList.length;

            $rootScope.active_resort = null;
            $rootScope.zipcode = null;
            if($localStorage.active_resort){
                $rootScope.active_resort = JSON.parse($localStorage.active_resort);
            }
            if($localStorage.zipcode){
                $rootScope.zipcode = JSON.parse($localStorage.zipcode);
            }
            $rootScope.active_restaurant = null;
            if($localStorage.active_restaurant){
                $rootScope.active_restaurant = JSON.parse($localStorage.active_restaurant);
            }
            $scope.$on('$ionicView.afterEnter', function() {
                $rootScope.loginType = User.getLoginType();
                $rootScope.loggedin = User.isLoggedIn();

                if($rootScope.loggedin){

                    if($rootScope.loginType == 'Guest'){
                        $location.path("/login-guest");
                    }else{
                        // $location.path("/resort-list");
                        $location.path("/user-address");
                        var user = User.profile();
                        $scope.login_data = {
                            email: user.email,
                            password: user.password,
                            register_type: 'Email',
                            logintype_id: ''
                        };

                        User.login(
                            $scope.login_data,
                            'Email',
                            function () {
                                $rootScope.updateUser();
                            },
                            function (error) {
                                User.logout();
                                $rootScope.updateUser();
                                $rootScope.$broadcast('user:logout',User.profile());
                                //Cart related
                                Cart.removeAll();
                                $location.path('/welcome');
                            }
                        );
                    }
                }
            });
            $scope.$on('$ionicView.enter', function(){
                $ionicSideMenuDelegate.canDragContent(false);
            });
            $scope.$on('$ionicView.leave', function(){
                $ionicSideMenuDelegate.canDragContent(true);
            });
            $scope.$on('user:logout', function(data) {
                $scope.user = User.profile();
                $rootScope.loggedin = User.isLoggedIn();
                $rootScope.loginType = User.getLoginType();
                $rootScope.updateUser();
            });

            $ionicHistory.nextViewOptions({
                //disableAnimate: true,
                disableBack: true
            });
        }
    })
    .controller('SignupWelcomeCtrl', function ( $scope, 
                                                $rootScope, $cordovaNetwork, $cordovaCamera, 
                                                $cordovaFile, $ionicActionSheet, $cordovaInAppBrowser, 
                                                $cordovaFacebook, $localStorage, $location, 
                                                $cordovaGooglePlus, $ionicHistory, $ionicSideMenuDelegate, 
                                                $state, $ionicPopup, $ionicLoading, APIService, User, Cart) {
        $scope.continueapp = function() {
            $state.go('login');
        }
        $scope.goToWelcome = function() {
            $state.go('welcome');
        }
    })
    .controller('ListCategoryCtrl', function ( $scope, 
                                                $rootScope, $cordovaNetwork, $cordovaCamera, 
                                                $cordovaFile, $ionicActionSheet, $cordovaInAppBrowser, 
                                                $cordovaFacebook, $localStorage, $location, 
                                                $cordovaGooglePlus, $ionicHistory, $ionicSideMenuDelegate, 
                                                $state, $ionicPopup, $ionicLoading, APIService, User, Cart) {
        $scope.init = function() {

        }
        $scope.categoryMoreAction = function() {

        }
        $scope.modelMoreAction = function() {
            
        }
        $scope.productMoreAction = function() {
            
        }

        $scope.goToHome = function() {
            $state.go('');
        }
        $scope.goToSearch = function() {
            
        }
        $scope.goToProduct = function() {
            
        }
        $scope.goToLike = function() {
            
        }
        $scope.goToChat = function() {
            
        }

    })
    .controller('ListModelCtrl', function ( $scope, 
                                                $rootScope, $cordovaNetwork, $cordovaCamera, 
                                                $cordovaFile, $ionicActionSheet, $cordovaInAppBrowser, 
                                                $cordovaFacebook, $localStorage, $location, 
                                                $cordovaGooglePlus, $ionicHistory, $ionicSideMenuDelegate, 
                                                $state, $ionicPopup, $ionicLoading, APIService, User, Cart) {
        $scope.continueapp = function() {
            $state.go('login');
        }
        $scope.goToWelcome = function() {
            $state.go('welcome');
        }
    })
    .controller('ListSearchCtrl', function ( $scope, 
                                                $rootScope, $cordovaNetwork, $cordovaCamera, 
                                                $cordovaFile, $ionicActionSheet, $cordovaInAppBrowser, 
                                                $cordovaFacebook, $localStorage, $location, 
                                                $cordovaGooglePlus, $ionicHistory, $ionicSideMenuDelegate, 
                                                $state, $ionicPopup, $ionicLoading, APIService, User, Cart) {
        $scope.continueapp = function() {
            $state.go('login');
        }
        $scope.goToWelcome = function() {
            $state.go('welcome');
        }
    })
    .controller('NavCtrl', function($scope, $rootScope, $location, $ionicHistory,$ionicLoading, $localStorage, $ionicSideMenuDelegate, User) {

        $scope.init = function(){
            $scope.showOrderList = false;
            $scope.user_image = null;
            $scope.first_name = null;
            $scope.last_name = null;
            $rootScope.orderCnt = 0;
            $rootScope.updateUser();
        }

        $rootScope.showMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $rootScope.showRightMenu = function () {
            $location.path('order-checkout');
            //$ionicSideMenuDelegate.toggleRight();
        };

        $rootScope.updateUser = function () {
            var user = User.profile();
            $scope.user_image = user.user_image;
            $scope.first_name = user.first_name;
            $scope.last_name = user.last_name;
            $scope.loginType = User.getLoginType();
            $scope.loggedIn = User.isLoggedIn();
        };

        $scope.login = function(){
            $location.path('/login');
        };

        $scope.logout = function(){
            User.logout();
            $rootScope.$broadcast('user:logout',User.profile());
        };

        $scope.$on('$ionicView.afterEnter', function() {
            $ionicLoading.hide();
            $rootScope.updateCartList();
        });
        $scope.$on('user:logout', function() {
            $rootScope.updateUser();
        });
    })
    .controller('FoodMenuCtrl',function($scope, $rootScope, $cordovaSocialSharing, $ionicHistory, $ionicPopover, $localStorage, $ionicLoading, $state, $ionicModal, $ionicPopup, $ionicTabsDelegate ,ModalService, APIService, Cart){

        $scope.init = function () {
            $scope.more_tab_icon = 'img/home/more.png';
            $scope.categories = [];
            $scope.dishes = [];
            $scope.veg_nonveg = false;//true => veg ,false => nonveg
            if($localStorage.active_restaurant){
                $rootScope.active_restaurant = JSON.parse($localStorage.active_restaurant);
                $scope.getCategoryList();
            }else{
                $state.go('restaurant-list');
            }
        };

        //get category list
        $scope.getCategoryList = function(){
            $ionicLoading.show({
                template: 'Loading dishes...'
            });
            APIService.categoryList(
                {
                    restraurent_id: $rootScope.active_restaurant.Restraurent.id
                },
                function(result){
                    $ionicLoading.hide();
                    if(!result.description.error){
                        $scope.categories = result.description.data;
                        if($scope.categories.length > 0){
                            $scope.loadCategoryDishes($scope.categories[0],0);
                        }
                    }else{
                        $ionicPopup.alert({
                            title: 'Info',
                            template: 'Get category list error'//JSON.stringify(result.description.error)
                        });
                    }
                },
                function (err) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'Server connect error'//JSON.stringify(err)
                    });
                });
        };

        //load category dishes
        $scope.loadCategoryDishes = function (category,index) {

            $rootScope.active_category = category;

            for(var g=0;g<$scope.categories.length;g++){
                if($scope.categories[g].Category.id == category.Category.id){
                    $scope.categories[g].selected = true;
                }else{
                    $scope.categories[g].selected = false;
                }
            }

            $ionicTabsDelegate.select(index);

            $ionicLoading.show({
                template: category.Category.category_name
            });

            APIService.dishList(
                {
                    category_id: $rootScope.active_category.Category.id,
                    restraurent_id: $rootScope.active_category.Category.restraurent_id
                },
                function(result){
                    $ionicLoading.hide();
                    if(!result.description.error){
                        $scope.dishes = result.description.data;
                        $scope.updateDishStatus();
                    }else{
                        $ionicPopup.alert({
                            title: 'Info',
                            template: 'Get dish list error'//JSON.stringify(result.description.error)
                        });
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
        };

        //load topping list
        $scope.loadToppingList = function (data) {
            $ionicLoading.show({
                template: 'Loading Options'
            });
            APIService.topingList(
                data,
                function(result){
                    $ionicLoading.hide();
                    if(!result.description.error){
                        $scope.sides = result.description.data.Sides;
                        $scope.options = result.description.data.Options;
                    }else{
                        $ionicPopup.alert({
                            title: 'Info',
                            template: 'Get option list error'//JSON.stringify(result.description.error)
                        });
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
        }

        $scope.openToppingDlg = function (dish) {
            var toping_data  = {
                category_id: $rootScope.active_category.Category.id,
                restraurent_id: $rootScope.active_restaurant.Restraurent.id,
                dish_id: dish.Dish.id
            };
            $scope.loadToppingList(toping_data);

            $scope.sides = [];
            $scope.options = [];
            $scope.active_item = dish;
            $scope.active_item.amount = 1;
            $scope.active_item.topping_price = 0;
            $scope.active_item.total_price = parseFloat($scope.active_item.amount * $scope.active_item.Dish.dish_price + $scope.active_item.topping_price).toFixed(2);

            ModalService
                .init('templates/modal2.html',$scope)
                .then(function(modal) {
                    modal.show();
                });
        };

        $scope.orderPlus = function () {
            $scope.active_item.amount = Number($scope.active_item.amount) + 1;
            $scope.updateDishTotalPrice();
        };

        $scope.orderMinus = function () {
            if($scope.active_item.amount > 1){
                $scope.active_item.amount = Number($scope.active_item.amount) - 1;
                $scope.updateDishTotalPrice();
            }
        };

        $rootScope.addToCart = function (dish) {
            dish.selected = true;
            dish.topping = {
                sides:[],
                options:[]
            };
            for(var i=0;i<($scope.sides.length);i++){
                if($scope.sides[i].Topping.isChecked){
                    dish.topping.sides.push($scope.sides[i]);
                }
            }
            for(var i=0;i<($scope.options.length);i++){
                if($scope.options[i].Topping.isChecked){
                    dish.topping.options.push($scope.options[i]);
                }
            }
            dish.category = $rootScope.active_category;
            dish.restaurant =  $rootScope.active_restaurant;

            Cart.add(dish);

            $scope.closeModal();
            $rootScope.updateCartList();
            $rootScope.$broadcast('cart:updated',Cart.list());
        };

        $scope.updateDishTotalPrice = function () {
            $scope.active_item.total_price = parseFloat(Number($scope.active_item.amount) * Number($scope.active_item.Dish.dish_price) + Number($scope.active_item.topping_price)).toFixed(2);
        }

        $scope.sideChanged = function (side) {
            var sLen = 0;
            for(var i=0;i<($scope.sides.length);i++){
                if($scope.sides[i].Topping.isChecked){
                    sLen++;
                }
            }
            if(sLen > $scope.active_item.Dish.limit_for_sides){
                $ionicLoading.show({
                    template: "You cannot select more than " +  $scope.active_item.Dish.limit_for_sides +" options",
                    duration: 2000
                });
                side.Topping.isChecked = false;
                return false;
            }

            $scope.updateToppingPrice(side);
        }

        $scope.optionChanged = function (option) {
            var sLen = 0;
            for(var i=0;i<($scope.options.length);i++){
                if($scope.options[i].Topping.isChecked){
                    sLen++;
                }
            }
            if(sLen > $scope.active_item.Dish.limits_for_options){
                $ionicLoading.show({
                    template: "You cannot select more than " +  $scope.active_item.Dish.limits_for_options +" options",
                    duration: 2000
                });
                option.Topping.isChecked = false;
                return false;
            }

            $scope.updateToppingPrice(option);
        }

        $scope.updateToppingPrice = function (topping){

            var p = topping.Topping.topping_price || 0;
            if(topping.Topping.isChecked){
                $scope.active_item.topping_price = Number($scope.active_item.topping_price) + Number(p);
            }else{
                $scope.active_item.topping_price = Number($scope.active_item.topping_price) - Number(p);
            }
            $scope.active_item.topping_price = parseFloat($scope.active_item.topping_price).toFixed(2);

            $scope.updateDishTotalPrice();
        };

        $scope.updateDishStatus = function () {
            var data = Cart.list();
            for(var h=0;h<$scope.dishes.length;h++){
                $scope.dishes[h].selected = false;
                for(var k=0;k<data.length;k++){
                    if($scope.dishes[h].Dish.id == data[k].Dish.id){
                        $scope.dishes[h].selected = true;
                    }
                }
            }
        }

        $ionicPopover.fromTemplateUrl('templates/modal1.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.more = function (category) {
            $scope.loadCategoryDishes(category);
            $scope.popover.hide();
        };
        
        $scope.goBack = function () {
            $state.go('restaurant-list');
        };

        /**
         * Not implement functions
         * @param item
         */
        $scope.favourite = function (item) {
            $ionicPopup.alert({
                title:'Favourite Info',
                template: JSON.stringify(item)
            });
        };

        $scope.share = function (item) {
            var restra = item.Restraurent;
            try{
                $ionicLoading.show({template:'Find SNS..'});
                $cordovaSocialSharing.share(restra.restraurent_name, "BiZiToGo", restra.restaurant_logo, null)
                    .then(function(result) {
                        $ionicLoading.hide();
                    }, function(error) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title:'Error',
                            template:'Cannot share'
                        });
                    });
            }catch (err){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title:'Alert',
                    template: err.message
                });
            }
        };

        $scope.placeOrder = function () {
            $state.go('order-checkout');
        };

        $scope.addItems = function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.$on('$ionicView.afterEnter', function() {
            if($localStorage.active_restaurant){
                $rootScope.active_restaurant = JSON.parse($localStorage.active_restaurant);
                $scope.getCategoryList();
            }
        });

        $scope.$on('cart:updated', function(event,data) {
            // you could inspect the data to see if what you care about changed, or just update your own scope
            $scope.updateDishStatus();
        })
    })
    .controller('ResortListCtrl', function ($scope, $rootScope, $state, $cordovaSocialSharing, $localStorage, $ionicHistory, $ionicLoading, $ionicPopup, APIService, Cart) {

        $scope.init = function () {
            $scope.data = {
                showDelete: false
            };

            $scope.items = [];
            $rootScope.active_resort = null;

            //james
            $scope.loadResortList();
/*
            $scope.items =[
            {'Resort':{'id':'3','resort_name':'Knights Inn Maingate','resort_phone':'4073968400','resort_email':'','resort_contactperson':'','resort_description':'','resort_logo':'http://food.bizitogo.com/files/logo/8641053870.png','resort_timeline':'http://food.bizitogo.com/files/logo/23067064736.png','resort_address':'4651 W Irlo Bronson Memorial Hwy','resort_state':'Florida','resort_city':'Kissimmee','resort_LatLng':'','resort_facilities':''}},
            {'Resort':{'id':'4','resort_name':'Knights Inn Maingate','resort_phone':'4073968400','resort_email':'','resort_contactperson':'','resort_description':'','resort_logo':'http://food.bizitogo.com/files/logo/8641053870.png','resort_timeline':'http://food.bizitogo.com/files/logo/23067064736.png','resort_address':'4651 W Irlo Bronson Memorial Hwy','resort_state':'Florida','resort_city':'Kissimmee','resort_LatLng':'','resort_facilities':''}}
            ];
            //console.log(JSON.stringify(result.description.data));
            if(($scope.items.length > 0) && !$rootScope.active_resort){
                $rootScope.active_resort = $scope.items[0];
                //save active resort details
                $localStorage.active_resort = JSON.stringify($rootScope.active_resort);
            }
*/
        }

        $scope.share = function (resort) {
            try{
                $ionicLoading.show({template:'Find SNS..'});
                $cordovaSocialSharing.share(resort.resort_name, "BiZiToGo", resort.resort_logo, null)
                    .then(function(result) {
                        $ionicLoading.hide();
                    }, function(error) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title:'Error',
                            template:'Cannot share'
                        });
                    });
            }catch (err){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Alert',
                    template: err.message
                });
            }
        };

        $scope.goBack = function () {
            $state.go('product-home');
        };

        $scope.moveItem = function(item, fromIndex, toIndex) {
            $scope.items.splice(fromIndex, 1);
            $scope.items.splice(toIndex, 0, item);
        };

        $scope.onItemDelete = function(item) {
            $scope.items.splice($scope.items.indexOf(item), 1);
        };

        $scope.contact = function (num) {
            var call = "tel:" + num;
            document.location.href = call;
        };

        $scope.openResort = function(item){

            if(Cart.list().length == 0){
                $rootScope.active_resort = item;
                //save active resort details
                $localStorage.active_resort = JSON.stringify(item);
                $state.go('restaurant-list');
                return;
            }
            //Alert
            $ionicPopup.confirm({
                title: 'Alert',
                template: 'Your cart will be emptied if you select a new location or restaurant. Are you sure you want to proceed ?'
            }).then(function(res) {
                if(res) {
                    Cart.removeAll();
                    $rootScope.$broadcast('cart:updated',Cart.list());
                    $rootScope.active_resort = item;
                    //save active resort details
                    $localStorage.active_resort = JSON.stringify(item);
                    $state.go('restaurant-list');
                }
            });
        }

        $scope.loadResortList = function (callback) {
            $ionicLoading.show({
                template: 'Loading...'
            });
            APIService.resortList(
                {},
                function(result){
                    $ionicLoading.hide();
                    if(!result.description.error){
                        $scope.items = result.description.data;
                        if(($scope.items.length > 0) && !$rootScope.active_resort){
                            $rootScope.active_resort = $scope.items[0];
                            //save active resort details
                            $localStorage.active_resort = JSON.stringify($rootScope.active_resort);
                        }
                    }else{
                        $ionicPopup.alert({
                            title: 'Info',
                            template: 'Get location list error'//JSON.stringify(result.description.error)
                        });
                    }

                    callback && callback();
                },
                function (err) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'Server connect error'//JSON.stringify(err)
                    });

                    callback && callback();
                });
        }

        $scope.doRefresh = function () {

            $scope.loadResortList(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });

        //james
        };

        $scope.$on('$ionicView.afterEnter', function() {
            $ionicLoading.show({template:'Loading...',animation: 'fade-in',delay:1000});
        });
    })
    .controller('OrderCheckOutCtrl', function ($scope, $rootScope, $state, $localStorage, $ionicSideMenuDelegate, $location, $ionicHistory, $ionicLoading, $ionicPopup ,ModalService, APIService, Cart ,User) {

        $scope.init = function () {
            $scope.netPrice = 0;
            $scope.deliveryPrice = 0;
            $scope.taxesPrice = 0;
            $scope.grandTotalPrice = 0;
            $rootScope.updateCartList();
        }

        $rootScope.updateCartList = function(){
            $rootScope.cartList = Cart.list();
            $rootScope.orderCnt = $rootScope.cartList.length;
            $rootScope.active_restaurant = $rootScope.getActiveRestaurant();
            $scope.items = Cart.list();
            $scope.getNetPrice();
            $scope.getDeliveryPrice();
            $scope.getTaxesPrice();
            $scope.getGrandTotalPrice();
        }

        $rootScope.getActiveRestaurant = function () {
            if($localStorage.active_restaurant){
                return JSON.parse($localStorage.active_restaurant);
            }else{
                return null;
            }
        }

        $scope.getTopping = function (topping) {
            var sides = [],options = [];
            for(var k=0;k<topping.sides.length;k++){
                sides.push(topping.sides[k].Topping.topping_name);
            }
            for(var k=0;k<topping.options.length;k++){
                options.push(topping.options[k].Topping.topping_name);
            }
            return sides.join(',')+' '+options.join(',');
        }

        $scope.loadToppingList = function (data) {
            $ionicLoading.show({
                template: 'Loading Options'
            });
            APIService.topingList(
                data,
                function(result){
                    $ionicLoading.hide();
                    if(!result.description.error){
                        $scope.sides = result.description.data.Sides;
                        $scope.options = result.description.data.Options;
                    }else{
                        $ionicPopup.alert({
                            title: 'Info',
                            template: 'Get option list error'//JSON.stringify(result.description.error)
                        });
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
        }

        $scope.loadAllToppingList = function (dish) {
            var toping_data  = {
                category_id: dish.category.Category.id,
                restraurent_id: dish.restaurant.Restraurent.id,
                dish_id: dish.Dish.id
            };
            $scope.loadToppingList(toping_data);
        }

        $scope.openEditDlg = function (dish) {

            $scope.sides = dish.topping.sides;
            $scope.options = dish.topping.options;
            $scope.active_item = dish;
            $scope.active_item.amount = dish.amount;
            $scope.active_item.topping_price = dish.topping_price;
            $scope.active_item.total_price = dish.total_price;

            ModalService
                .init('templates/modal3.html',$scope)
                .then(function(modal) {
                    modal.show();
                });
        };

        $scope.updateDishTotalPrice = function () {
            $scope.active_item.total_price = parseFloat(Number($scope.active_item.amount) * Number($scope.active_item.Dish.dish_price) + Number($scope.active_item.topping_price)).toFixed(2);
            $scope.updateCartList();
            $rootScope.$broadcast('cart:updated',Cart.list());
        }

        $scope.getNetPrice = function () {
            var f = 0;
            for(var i=0;i<$scope.items.length;i++){
                f += Number($scope.items[i].total_price);
            }
            $scope.netPrice = parseFloat(f).toFixed(2);
            Cart.store('netPrice',$scope.netPrice);
        }

        $scope.getDeliveryPrice = function () {
            var deliverySharges = 0,d=0;
            for(var i=0;i<$scope.items.length;i++){
                d = $scope.items[i].restaurant.Restraurent.restraurent_deliveryPrice || 0;
                deliverySharges += Number($scope.items[i].total_price) * Number(d) /100;
            }
            $scope.deliveryPrice = parseFloat(deliverySharges).toFixed(2);
            Cart.store('deliveryPrice',$scope.deliveryPrice);
        }
        $scope.getTaxesPrice = function () {
            var taxes = 0;
            for(var i=0;i<$scope.items.length;i++){
                taxes += $scope.items[i].total_price * $scope.items[i].restaurant.Restraurent.restraurent_tax_percent / 100;
            }
            $scope.taxesPrice = parseFloat(taxes).toFixed(2);
            Cart.store('taxesPrice',$scope.taxesPrice);
        }
        $scope.sideChanged = function (side) {
            var sLen = 0;
            for(var i=0;i<($scope.sides.length);i++){
                if($scope.sides[i].Topping.isChecked){
                    sLen++;
                }
            }
            if(sLen > $scope.active_item.Dish.limit_for_sides){
                $ionicLoading.show({
                    template: "You cannot select more than " +  $scope.active_item.Dish.limit_for_sides +" options",
                    duration: 2000
                });
                side.Topping.isChecked = false;
                return false;
            }

            $scope.updateToppingPrice(side);
        }

        $scope.optionChanged = function (option) {
            var sLen = 0;
            for(var i=0;i<($scope.options.length);i++){
                if($scope.options[i].Topping.isChecked){
                    sLen++;
                }
            }
            if(sLen > $scope.active_item.Dish.limits_for_options){
                $ionicLoading.show({
                    template: "You cannot select more than " +  $scope.active_item.Dish.limits_for_options +" options",
                    duration: 2000
                });
                option.Topping.isChecked = false;
                return false;
            }

            $scope.updateToppingPrice(option);
        }

        $scope.updateToppingPrice = function (topping) {
            var p = topping.Topping.topping_price || 0;
            if(topping.Topping.isChecked){
                $scope.active_item.topping_price = Number($scope.active_item.topping_price) + Number(p);
            }else{
                $scope.active_item.topping_price = Number($scope.active_item.topping_price) - Number(p);
            }
            $scope.active_item.topping_price = parseFloat($scope.active_item.topping_price).toFixed(2);

            $scope.updateDishTotalPrice();
        };

        $scope.getGrandTotalPrice = function () {
            $scope.grandTotalPrice = parseFloat(Number($scope.netPrice) + Number($scope.deliveryPrice) + Number($scope.taxesPrice)).toFixed(2);
            Cart.store('grandTotalPrice',$scope.grandTotalPrice);
        }

        $scope.plus = function () {
            $scope.active_item.amount = Number($scope.active_item.amount) + 1;
            $scope.updateDishTotalPrice();
        };

        $scope.minus = function () {
            if($scope.active_item.amount > 1){
                $scope.active_item.amount = Number($scope.active_item.amount) - 1;
                $scope.updateDishTotalPrice();
            }
        };

        $scope.itemEdit = function (item) {
            $scope.openEditDlg(item);
        }

        $scope.itemRemove = function (item) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Remove',
                template: 'Are you sure?'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    Cart.remove(item.Dish.id);
                    $scope.updateCartList();
                    $rootScope.$broadcast('cart:updated',Cart.list());
                } else {
                }
            });
        }

        $scope.replace = function (dish) {

            dish.topping = {
                sides:[],
                options:[]
            };
            for(var i=0;i<($scope.sides.length);i++){
                if($scope.sides[i].Topping.isChecked){
                    dish.topping.sides.push($scope.sides[i]);
                }
            }
            for(var i=0;i<($scope.options.length);i++){
                if($scope.options[i].Topping.isChecked){
                    dish.topping.options.push($scope.options[i]);
                }
            }
            dish.category = $rootScope.active_category;
            dish.restaurant =  $rootScope.active_restaurant;

            Cart.replace(dish);

            $rootScope.updateCartList();
            $rootScope.$broadcast('cart:updated',Cart.list());
            $scope.closeModal();
        };

        $scope.checkOut = function () {
            //check Lunch and Dinner time limit
            /**
             * If now time is among in Lunch time,then limit order price will be $15
             * If now time is among in Dinner time,then limit order price will be $25
             */

            //if(Cart.fetch('grandTotalPrice') < 15){
            //    $ionicPopup.alert({
            //        title:'Info',
            //        template:'You can cannot create an order less than $15'
            //    }).then(function(res) {
            //        $location.path('/resort-list');
            //    });
            //}else{
            //    $location.path('/order-submit');
            //}

            if($scope.isLunchTime()){ //now lunch service time
                if(Cart.fetch('netPrice') < 15){
                    $ionicPopup.alert({
                        title:'Info',
                        template:'You can cannot create an order less than $15'
                    }).then(function(res) {
                        //$location.path('/resort-list');
                    });
                }else{
                    $location.path('/order-submit');
                }
            }else if($scope.isDinnerTime()){ // now dinner service time
                if(Cart.fetch('netPrice') < 25){
                    $ionicPopup.alert({
                        title:'Info',
                        template:'You can cannot create an order less than $25'
                    }).then(function(res) {
                        $location.path('/user-address');
                    });
                }else{
                    $location.path('/order-submit');
                }
            }else{ // Other time
                $ionicPopup.alert({
                    title:'Info',
                    template:'This restaurant is currently closed. Please try again later'
                }).then(function(res) {
                    $location.path('/user-address');
                });
            }
        }

        $scope.isLunchTime = function () {
            //compare current time and restaurant lunch time
            //var lunchStart = getCurrentDate() + ' ' + $rootScope.active_restaurant.Restraurent.restraurent_deliverytime_weekdays_to;
            //var lunchEnd = getCurrentDate() + ' ' + $rootScope.active_restaurant.Restraurent.restraurent_deliverytime_weekdays_from;

            var lunchStart = getCurrentDate();
            var lunchEnd = getCurrentDate();

            lunchStart = lunchStart + " 12:01 AM";
            lunchEnd = lunchEnd + " 11:59 PM";

            console.log(">>>>>> lunchStart : " + lunchStart);
            console.log(">>>>>> lunchEnd : " + lunchEnd);

            if(compareTime(lunchStart,lunchEnd)) {
                return true;
            }else{
                return false;
            }
        }

        $scope.isDinnerTime = function () {
            //compare current time and restaurant dinner time
            var dinnerStart = getCurrentDate() + ' ' + $rootScope.active_restaurant.Restraurent.restraurent_deliverytime_weekends_to;
            var dinnerEnd = getCurrentDate() + ' ' + $rootScope.active_restaurant.Restraurent.restraurent_deliverytime_weekends_from;


            var dinnerStart = getCurrentDate();
            var dinnerEnd = getCurrentDate();

            dinnerStart = dinnerStart + " 12:01 AM";
            dinnerEnd = dinnerEnd + " 11:59 PM";

            console.log(">>>>>> dinnerStart : " + dinnerStart);
            console.log(">>>>>> dinnerEnd : " + dinnerEnd);

            if(compareTime(dinnerStart,dinnerEnd)) {
                return true;
            }else{
                return false;
            }
        }

        function getCurrentDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd
            }
            if(mm<10){
                mm='0'+mm
            }
            today = yyyy+'/'+mm+'/'+dd;
            return today;
        }

        function compareTime (start,end) {

            var from = new Date(Date.parse(start));
            var to = new Date(Date.parse(end));
            var cur = new Date();

            if(from < cur && cur < to){
                return true;
            }else{
                return false;
            }
        }

        $scope.save = function () {
            $scope.closeModal();
            $state.go('order-place');
        }

        $scope.clear = function () {
            $ionicPopup.confirm({
                title: 'Remove',
                template: 'Are you sure?'
            }).then(function(res) {
                if(res) {
                    delete $localStorage.cartList;
                    $rootScope.cartList = [];
                    $rootScope.updateCartList();
                    $ionicPopup.alert({
                        title:'BiziToGo',
                        template:'Cart Emptied!'
                    });
                } else {
                }
            });
        }

        $scope.goBack = function () {
            $state.go('order-place');
        }

        $scope.$on('$ionicView.afterEnter', function() {
            $rootScope.updateCartList();
            $rootScope.$broadcast('scroll.scrollTop');
        })

        $scope.$on('cart:updated', function(event,data) {
            // you could inspect the data to see if what you care about changed, or just update your own scope
            $scope.items = [];
            $scope.items = data;
            $rootScope.updateCartList();
        })

    })
    .controller('OrderHistoryCtrl', function ($scope, $rootScope, $ionicScrollDelegate, $state, $localStorage, $ionicHistory, $ionicLoading, $ionicPopup, APIService, User) {

        $scope.orderStatusList = [
            'Pending',
            'Processing',
            'Out for Delivery',
            'Delivered',
            'Cancelled'
        ];

        $scope.loadStatus = 'Loading...';

        $rootScope.changeDateFormat = function (datetime) {
            //2015-08-27 03:47:49
            if(!datetime)return;
            // Split timestamp into [ Y, M, D, h, m, s ]
            var t = datetime.split(/[- :]/);
            t[1] = parseInt(t[1]) - 1;
            // Apply each element to the Date function
            var d = new Date(t[0], t[1], t[2], t[3], t[4], t[5]);
            return d;
        }

        $scope.init = function () {
            $scope.user = User.profile();
            //load order list
            $scope.orderList = [];
        }

        $scope.openOrder = function (order) {
            $rootScope.active_order_id = order.Order.id;
            $state.go('order-state');
        };

        $scope.loadOrderList = function(callback){
            // API call
            $ionicLoading.show({template:'Loading...'});
            APIService.orderList(
                {
                    user_id: $scope.user.id
                },
                function (succ) {
                    $ionicLoading.hide();
                    // Do success
                    if(!succ.description.error){
                        $scope.orderList = succ.description.data;
                        if($scope.orderList.length == 0){
                            $scope.loadStatus = 'None';
                        }
                    }else{
                        var errMsg = '';
                        for(var k in succ.description.error){
                            errMsg += ' - ' + succ.description.error[k] +'<br>';
                        }
                        $ionicPopup.alert({
                            title:succ.message,
                            template: errMsg
                        });
                    }
                    callback && callback();
                }, function (err) {
                    $ionicLoading.hide();
                    callback && callback();
                    $ionicPopup.alert({
                        title:'Info',
                        template: 'Server connect error'//JSON.stringify(err)
                    });
                }
            );
        }

        $scope.doRefresh = function () {
            $scope.user = User.profile();
            $scope.loadOrderList(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.goBack = function () {
            $state.go('product-home');
        };

        $scope.$on('$ionicView.afterEnter', function() {
            $scope.user = User.profile();
            $scope.loadOrderList();
            $ionicScrollDelegate.scrollTop();
        });
    })
    .controller('OrderStateCtrl', function ($scope, $rootScope, $state, $localStorage, $ionicHistory, $ionicLoading, $ionicPopup, APIService) {

        $scope.orderStatusList = [
            'Pending',
            'Processing',
            'Out for Delivery',
            'Delivered',
            'Cancelled'
        ];

        $scope.init = function () {
            $scope.order = null;
            $scope.orderDishes = null;
        }

        $scope.loadOrder = function (order_id) {
            $ionicLoading.show({template:'Loading Order...'});
            APIService.orderDetail(
                {
                    order_id: order_id
                },
                function (succ) {
                    $ionicLoading.hide();
                    // Do success
                    if(!succ.description.error){

                        $scope.order = succ.description.data;
                        console.log("ORDER : +++++++++++ " + JSON.stringify($scope.order));
                        $scope.total = parseFloat(Number($scope.order.OrderInfo.Order.tip) + Number($scope.order.OrderInfo.Order.total_amount)).toFixed(2);//Dragon
                        //alert($rootScope.driverTip);
                        $scope.orderDishes = succ.description.data.OrderDishInfo;
                    }else{
                        var errMsg = '';
                        for(var k in succ.description.error){
                            errMsg += ' - ' + succ.description.error[k] +'<br>';
                        }
                        $ionicPopup.alert({
                            title:succ.message,
                            template: errMsg
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
        }

        $scope.goBack = function () {
            $state.go('order-history');
        };

        $scope.$on('$ionicView.afterEnter', function() {
            $scope.loadOrder($rootScope.active_order_id);
        });
    })
    .controller('OrderSubmitCtrl', function ($scope, $rootScope, $localStorage, $ionicHistory, $state, $ionicLoading, $ionicPopup, User, APIService, Cart, $cordovaInAppBrowser, Payment, ModalService) {
        $scope.init = function () {

            $scope.total_price = Cart.fetch('netPrice');
            $scope.grand_total = Cart.fetch('grandTotalPrice');
            $scope.deliveryPrice = Cart.fetch('deliveryPrice');
            $scope.taxesPrice = Cart.fetch('taxesPrice');
            $scope.tipsPrice = $rootScope.driverTip;//???????????

            var currentTime = new Date();

            // returns the month (from 0 to 11)
            var month = currentTime.getMonth() + 1;

            // returns the day of the month (from 1 to 31)
            var day = currentTime.getDate();

            // returns the year (four digits)
            var year = currentTime.getFullYear();

            $scope.expire_year = year;
            $scope.expire_month = month;
            $scope.months = [];
            for (var i=1; i<=12; i++) {
                if(i<10){
                    $scope.months.push('0'+i);
                }else{
                    $scope.months.push(''+i);
                }
            }
            $scope.years = [];
            for (var j=2015; j<=2099; j++) {
                $scope.years.push(j);
            }
            $scope.payment_form = {
                transaction_type: 'ccsale',
                track_data: null,
                card_number: null,
                exp_date: $scope.expire_month+$scope.expire_year,
                tip_amount: null,
                customer_code: null,
                cvv2cvc2: null,
                salestax: null,
                special_instructions: ''
            };
            $scope.order = {
                "first_name":"",
                "last_name":"",
                "phone":"",
                "email":"",
                "room_no":"",
                "driver_tip":"",
                "address":"",
                "city":"",
                "state":"",
                "zipcode":"",
                "country":"UniteStates",
                "special_instructions":"",
                "resort_id":"3",
                "resort_address":"",
                "restraurent_id":"7",
                "items":[],
                "user_type":"",
                "user_id":"",
                "orderstatus":"0",
                "payment_status":"Pending",
                "payment_type":"Paypal",
                "card":{
                    "card_no":'',//5000300020003003
                    "year":"",//22
                    "month":"",//12
                    "cvv":'',//123
                    "card_owner":""
                }
            };
        }

        $scope.getOrderItems = function (items) {
            var q = [],b={};
            for(var h=0; h < items.length; h++){
                var sides=[],options=[];

                for(var k=0;k < items[h].topping.sides.length;k++){
                    sides.push(items[h].topping.sides[k].Topping.id);
                }
                for(var k=0;k < items[h].topping.options.length;k++){
                    options.push(items[h].topping.options[k].Topping.id);
                }
                b = {
                    dish_id: items[h].Dish.id,
                    quantity: items[h].amount,
                    sides: sides.join(','),
                    options: options.join(',')
                };
                q.push(b);
            }
            return q;
        }

        $scope.updateStatus = function(){

            $scope.user = User.profile();
            $rootScope.cartList = Cart.list();
            $rootScope.loginType = User.getLoginType();


            if($rootScope.active_resort){
                $scope.order.resort_id = $rootScope.active_resort.Resort.id;
                $scope.order.resort_name = $rootScope.active_resort.Resort.resort_name;
                $scope.order.resort_address = $rootScope.active_resort.Resort.resort_address;
            }
            if($localStorage.userAddressFull){
                var userAddressFull = JSON.parse($localStorage.userAddressFull);
                $scope.order.user_id = $scope.user.id;
                $scope.order.first_name = $scope.user.first_name || "";
                $scope.order.last_name = $scope.user.last_name || "";
                $scope.order.phone = $scope.user.user_phoneNo;
                $scope.order.email = $scope.user.email || "";
                $scope.order.address = userAddressFull.address || "";
                $scope.order.city = userAddressFull.city || "";
                $scope.order.state = userAddressFull.state || "";
                $scope.order.country = userAddressFull.country || "";
                $scope.order.resort_id = 1;
                $scope.order.delivery_type = "home";
                $scope.order.resort_name = "Home" || "";
                $scope.order.resort_address = userAddressFull.address || "";
            } else if($scope.user) {
                $scope.order.user_id = $scope.user.id;
                $scope.order.first_name = $scope.user.first_name || "";
                $scope.order.last_name = $scope.user.last_name || "";
                $scope.order.phone = $scope.user.user_phoneNo;
                $scope.order.email = $scope.user.email || "";
                $scope.order.address = $scope.user.user_address || "";
                $scope.order.city = $scope.user.user_city || "";
                $scope.order.state = $scope.user.user_state || "";
                $scope.order.country = $scope.user.country || "";
                $scope.order.delivery_type = "resort";
            }
            if($rootScope.active_restaurant){
                $scope.order.restraurent_id = $rootScope.active_restaurant.Restraurent.id;
            }

            if($rootScope.cartList){
                $scope.order.items = $scope.getOrderItems($rootScope.cartList);
            }

            if($rootScope.cartList){
                $scope.order.user_type = $rootScope.loginType;
            }
        }

        $scope.submitOrder = function () {

            $scope.submit();

        };

        $scope.submit = function () {

        //james

            //$scope.order.email = $scope.user.email || "";

            console.log(JSON.stringify($scope.order));
            if ($rootScope.loginType == 'Guest') {
                console.log("submit guest");
                if ($scope.order.phone == ""){
                    $ionicPopup.alert({
                        title:'Info',
                        template: 'Please Enter your Phone Number'
                    });
                } else if ($scope.order.room_no == ""){
                    $ionicPopup.alert({
                        title:'Info',
                        template: 'Please enter your Room/Suite No.'
                    });
                } else if ($scope.order.email == "") {
                    console.log("submit guest : 0");
                    $ionicPopup.alert({
                        title:'Info',
                        template: 'Please input email address'
                    });
                } else {
                    console.log("email : " + $scope.order.email);
                    console.log("submit guest : 1");

                    $scope.guestorder = {
                        "email": $scope.order.email
                    }

                    console.log(JSON.stringify($scope.guestorder));

                    $ionicLoading.show({template:'Submit...'});

                    APIService.checkGuestEmail(
                        $scope.guestorder,
                        function (succ) {
                            $ionicLoading.hide();
                            // Do success

                            console.log(">>> response : " + JSON.stringify(succ));
                            if (succ.message === "Success") {
                            console.log(">>>> success ");

                                var alertPopup = $ionicPopup.alert({
                                    title:"Info",
                                    template: "This Email is already registered with us." +
                                              "To view your order history, login into your account from the Thank You Page."
                                });
                                alertPopup.then(function(res) {
                                    $ionicLoading.show({template:'Submit...'});
                                    APIService.orderNow(
                                        $scope.order,
                                        function (succ) {
                                            $ionicLoading.hide();
                                            // Do success
                                            if(!succ.description.error){
                                                $ionicPopup.alert({
                                                    title:succ.message,
                                                    template: succ.message
                                                });

                                                Cart.removeAll();
                                                User.store(succ.description.data.OrderInfo.User,'Email');
                                                $rootScope.updateUser();
                                                $rootScope.updateCartList();
                                                $rootScope.$broadcast('cart:updated',Cart.list());

                                                $state.go('thanks');
                                            }else{
                                                var errMsg = '';
                                                for(var k in succ.description.error){
                                                    errMsg += ' - ' + succ.description.error[k] +'<br>';
                                                }
                                                $ionicPopup.alert({
                                                    title:succ.message,
                                                    template: errMsg
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
                                });
/*
                                Cart.removeAll();
                                User.store(succ.description.data.OrderInfo.User,'Email');
                                $rootScope.updateUser();
                                $rootScope.updateCartList();
                                $rootScope.$broadcast('cart:updated',Cart.list());

                                $state.go('thanks');
*/
                            }else{
/*
                                var errMsg = '';
                                for(var k in succ.description.error){
                                    errMsg += ' - ' + succ.description.error[k] +'<br>';
                                }
                                $ionicPopup.alert({
                                    title:succ.message,
                                    template: errMsg
                                });
*/

                                console.log(">>>> fail ");

                            $ionicLoading.show({template:'Submit...'});
                            APIService.orderNow(
                                $scope.order,
                                function (succ) {
                                    $ionicLoading.hide();
                                    // Do success
                                    if(!succ.description.error){
                                        $ionicPopup.alert({
                                            title:succ.message,
                                            template: succ.message
                                        });

                                        Cart.removeAll();
                                        User.store(succ.description.data.OrderInfo.User,'Email');
                                        $rootScope.updateUser();
                                        $rootScope.updateCartList();
                                        $rootScope.$broadcast('cart:updated',Cart.list());

                                        $state.go('thanks');
                                    }else{
                                        var errMsg = '';
                                        for(var k in succ.description.error){
                                            errMsg += ' - ' + succ.description.error[k] +'<br>';
                                        }
                                        $ionicPopup.alert({
                                            title:succ.message,
                                            template: errMsg
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

                            }
                        }, function (err) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title:'Info',
                                template: 'Server connect error'//JSON.stringify(err)
                            });
                        }
                    );
                }

            }  else {
                
                if ($scope.order.phone == ""){
                    $ionicPopup.alert({
                        title:'Info',
                        template: 'Please Enter your Phone Number'
                    });
                } else if ($scope.order.room_no == ""){
                    $ionicPopup.alert({
                        title:'Info',
                        template: 'Please enter your Room/Suite No.'
                    });
                } else {
                    $ionicLoading.show({template:'Submit...'});
                    APIService.orderNow(
                        $scope.order,
                        function (succ) {
                            $ionicLoading.hide();
                            // Do success
                            if(!succ.description.error){
                                $ionicPopup.alert({
                                    title:succ.message,
                                    template: succ.message
                                });

                                Cart.removeAll();
                                User.store(succ.description.data.OrderInfo.User,'Email');
                                $rootScope.updateUser();
                                $rootScope.updateCartList();
                                $rootScope.$broadcast('cart:updated',Cart.list());

                                $state.go('thanks');
                            }else{
                                var errMsg = '';
                                for(var k in succ.description.error){
                                    errMsg += ' - ' + succ.description.error[k] +'<br>';
                                }
                                $ionicPopup.alert({
                                    title:succ.message,
                                    template: errMsg
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
                }
                //
            }
                
                

        }

        $scope.goBack = function () {
            $state.go('order-checkout');
        };

        $scope.showCVVHelp = function(){
            ModalService
                .init('templates/cvv.html',$scope)
                .then(function(modal) {
                    modal.show();
                });
        }

        $scope.changeDriverTip = function () {
            var total_p = Cart.fetch('grandTotalPrice');
            //console.log("##################"+JSON.stringify($scope.order.driver_tip));
            $scope.driverTip = $scope.order.driver_tip;
            $scope.grand_total = parseFloat(Number(total_p) + Number($scope.order.driver_tip)).toFixed(2);
            //alert($scope.driverTip+"----"+$scope.grand_total);
        }

        $scope.$on('$ionicView.afterEnter', function() {
            $scope.updateStatus();
        });

    })
    .controller('ProductHomeCtrl', function ($scope, $rootScope, $ionicScrollDelegate, $state, $localStorage, $ionicHistory, $ionicLoading, $ionicPopup, APIService, User) {

        $scope.orderStatusList = [
            'Pending',
            'Processing',
            'Out for Delivery',
            'Delivered',
            'Cancelled'
        ];

        $scope.loadStatus = 'Loading...';

        $rootScope.changeDateFormat = function (datetime) {
            //2015-08-27 03:47:49
            if(!datetime)return;
            // Split timestamp into [ Y, M, D, h, m, s ]
            var t = datetime.split(/[- :]/);
            t[1] = parseInt(t[1]) - 1;
            // Apply each element to the Date function
            var d = new Date(t[0], t[1], t[2], t[3], t[4], t[5]);
            return d;
        }

        $scope.init = function () {
            $scope.user = User.profile();
            //load order list
            $scope.orderList = [];
        }

        $scope.openOrder = function (order) {
            $rootScope.active_order_id = order.Order.id;
            $state.go('order-state');
        };

        $scope.loadOrderList = function(callback){
            // API call
            $ionicLoading.show({template:'Loading...'});
            APIService.orderList(
                {
                    user_id: $scope.user.id
                },
                function (succ) {
                    $ionicLoading.hide();
                    // Do success
                    if(!succ.description.error){
                        $scope.orderList = succ.description.data;
                        if($scope.orderList.length == 0){
                            $scope.loadStatus = 'None';
                        }
                    }else{
                        var errMsg = '';
                        for(var k in succ.description.error){
                            errMsg += ' - ' + succ.description.error[k] +'<br>';
                        }
                        $ionicPopup.alert({
                            title:succ.message,
                            template: errMsg
                        });
                    }
                    callback && callback();
                }, function (err) {
                    $ionicLoading.hide();
                    callback && callback();
                    $ionicPopup.alert({
                        title:'Info',
                        template: 'Server connect error'//JSON.stringify(err)
                    });
                }
            );
        }

        $scope.doRefresh = function () {
            $scope.user = User.profile();
            $scope.loadOrderList(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.goBack = function () {
            $state.go('product-home');
        };

        $scope.$on('$ionicView.afterEnter', function() {
            $scope.user = User.profile();
            $scope.loadOrderList();
            $ionicScrollDelegate.scrollTop();
        });
    })
    .controller('UserCtrl', function (
        $scope, 
        $rootScope, 
        $cordovaNetwork, 
        $cordovaCamera, 
        $cordovaFile, 
        $ionicActionSheet, 
        $ionicSlideBoxDelegate,
        $cordovaInAppBrowser, 
        $cordovaFacebook, 
        $localStorage, 
        $location, 
        $cordovaGooglePlus, 
        $ionicSideMenuDelegate,
        $ionicHistory, 
        $state, 
        $ionicPopup, 
        $ionicLoading, APIService, User, Cart) {


        $scope.index;

        $scope.init = function () {
            //User manage part
            $rootScope.loginType = User.getLoginType();
            $rootScope.loggedin = User.isLoggedIn();
            $scope.user = User.profile();
            $scope.login_data = {
                email: '',
                password: '',
                register_type: 'Email',
                logintype_id: ''
            };
            $scope.register_data = {
                password:"",
                first_name:"",
                last_name:"",
                user_phoneNo:"",
                email:"",
                user_address:"",
                pincode:"",
                user_city:"",
                user_state:"",
                logintype_id:"",
                user_image:"",
                gender:'Male',
                role: 'admin',
                is_validatePhoneNo:"",
                is_active:"1"
            };
            $scope.forgot_data = {
                email:''
            }
            $scope.capture_image = '';

            if(User.isLoggedIn()) {
                if ($rootScope.loginType == 'Guest') {
                    $location.path("/login-guest");
                }
            }

            //Order manage part
            $rootScope.cartList = Cart.list();
            $rootScope.orderCnt = $rootScope.cartList.length;

            $rootScope.active_resort = null;
            $rootScope.zipcode = null;
            if($localStorage.active_resort){
                $rootScope.active_resort = JSON.parse($localStorage.active_resort);
            }
            if($localStorage.zipcode){
                $rootScope.zipcode = JSON.parse($localStorage.zipcode);
            }
            $rootScope.active_restaurant = null;
            if($localStorage.active_restaurant){
                $rootScope.active_restaurant = JSON.parse($localStorage.active_restaurant);
            }

        }

        /**
         * Slide Method 
        **/
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };

        /**
         * Page Showing option
         */
         $scope.closeWelcomeIntro = function(screenToShow){
            if(screenToShow == 'login'){
                $state.go('login');
            } else {
                $state.go('signup');
            }
         }   

        /**
         * User actions
         */
        $scope.loginByEmail = function(){
            
            if(User.isValidInfo($scope.login_data)){
                User.login(
                    $scope.login_data,
                    'Email',
                    function () {
                        $rootScope.updateUser();
                        $state.go('product-home');
                        $rootScope.$broadcast('user.login');
                    },
                    function (error) {
                        $ionicPopup.alert({
                            title:error.message,
                            template: error.description.error
                        });
                    }
                );
            }else{
                $ionicPopup.alert({
                    title: 'Alert',
                    template: 'Invalid user info!'
                });
            }
        };
        //Register
        $scope.register = function () {
            $scope.register_data.name = $scope.register_data.first_name + " " + $scope.register_data.last_name;
            User.register(
                $scope.register_data,
                'Email',
                function(){
                    $rootScope.updateUser();
                    $state.go('signup-welcome');  
                },
                function(err){
                    var errMsg = '';
                    for(var k in err.description.error){
                        errMsg += ' - ' + err.description.error[k] + '<br>';
                    }
                    $ionicPopup.alert({
                        title: 'Alert',
                        template: errMsg
                    });
                }
            );
        };
        //Upload Photo
        $scope.uploadAvatar = function () {

            $ionicActionSheet.show({
                titleText: 'Get User avatar image',
                buttons: [
                    { text: '<i class="icon ion-camera"></i> Camera' },
                    { text: '<i class="icon ion-ios-albums"></i> Picture' },
                ],
                //destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function() {
                },
                buttonClicked: function(buttonIndex) {
                    if (buttonIndex == 0) {
                        var options = {
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA,
                            quality: 75,
                            targetWidth: 512,
                            targetHeight: 512,
                            allowEdit: true,
                            encodingType: Camera.EncodingType.JPEG,
                            saveToPhotoAlbum: false,
                            popoverOptions: CameraPopoverOptions,
                            correctOrientation: true
                        };
                        $cordovaCamera.getPicture(options).then(function(data) {
                            $ionicLoading.hide();
                            $scope.capture_image = "data:image/jpeg;base64," + data;
                            $scope.register_data.user_image = data;
                        }, function (err) {
                            $ionicLoading.hide();
                        });

                    }else if(buttonIndex === 1){
                        var options = {
                            quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                            allowEdit: false,
                            encodingType: Camera.EncodingType.JPEG,
                            popoverOptions: CameraPopoverOptions,
                            saveToPhotoAlbum: false
                        };
                        $ionicLoading.show({
                            template: 'Loading...'
                        });
                        $cordovaCamera.getPicture(options).then(function(data) {
                            $ionicLoading.hide();
                            $scope.capture_image = "data:image/jpeg;base64," + data;
                            $scope.register_data.user_image = data;

                        }, function (err) {
                            $ionicLoading.hide();
                        });
                    }
                    return true;
                },
                destructiveButtonClicked: function() {
                    return true;
                }
            });
        };
        // forgot password
        $scope.forgot = function () {

            if($scope.forgot_data.email){
                User.forgotPassword(
                    $scope.forgot_data,
                    function () {
                        $ionicPopup.confirm({
                            title: 'Info',
                            template: 'An email has been sent to your registered email id with a temporary password.'
                        }).then(function(res) {
                            if(res) {
                                $state.go('login');
                            }
                        });
                    }
                );
            }else{
                $ionicPopup.alert({
                    title: 'Info',
                    template: 'Please enter email address.'
                });
            }
        };

        /**
         * Redirect functions
         */
        // go to login page
        $rootScope.goToLogin = function () {
            var loginType = User.getLoginType();
            if(User.isLoggedIn() && loginType == 'Guest'){
                $state.go('login');
            }else{
                $state.go('login');
            }
        };
        // signup
        $rootScope.goToSignup = function () {
            $state.go('signup');
        };
        // go to guest
        $rootScope.goToGuest = function () {
            User.registerGuest(function () {
                $rootScope.updateUser();
                $state.go('product-home');
            }, function () {
            });
        };
        // go to home
        $rootScope.goToHome = function () {
            $location.path('/user-address');
        };
        // forgot password
        $rootScope.goToForgot = function () {
            $state.go('forgot');
        };
        // back to welcome
        $rootScope.goToWelcome = function () {
            $state.go('welcome');
        };
        // go to profile
        $rootScope.goToProfile = function () {
            $state.go('profile');
        };

        /**
         * SOCIAL LOGIN
         * Facebook and Google
         */
        // FB Login
        $scope.fbLogin = function () {

            try{
                $ionicLoading.show({
                    template: 'Login...'
                });
                $cordovaFacebook.getLoginStatus()
                    .then(function(success) {
                        /*
                         { authResponse: {
                         userID: "12345678912345",
                         accessToken: "kgkh3g42kh4g23kh4g2kh34g2kg4k2h4gkh3g4k2h4gk23h4gk2h34gk234gk2h34AndSoOn",
                         session_Key: true,
                         expiresIn: "5183738",
                         sig: "..."
                         },
                         status: "connected"
                         }
                         */
                        if(success.status == "connected"){
                            //Goto main page
                            $ionicLoading.hide();
                            $scope.getFBInfo();
                        }else{
                            $cordovaFacebook.login(["public_profile", "email"])
                                .then(function(success) {
                                    /*
                                     * Get user data here.
                                     * For more, explore the graph api explorer here: https://developers.facebook.com/tools/explorer/
                                     * "me" refers to the user who logged in. Dont confuse it as some hardcoded string variable.
                                     *
                                     */

                                    $ionicLoading.hide();
                                    //To know more available fields go to https://developers.facebook.com/tools/explorer/
                                    $scope.getFBInfo();

                                }, function (error) {
                                    // Facebook returns error message due to which login was cancelled.
                                    // Depending on your platform show the message inside the appropriate UI widget
                                    // For example, show the error message inside a toast notification on Android
                                    $ionicLoading.hide();
                                    $ionicPopup.alert({
                                        title: 'FB Login Cancelled',
                                        template: error.errorMessage
                                    });
                                });
                        }
                    }, function (error) {
                        // error
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'FB Login Cancelled',
                            template: error.errorMessage
                        });
                    });

            }catch (err){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'FB Login Cancelled',
                    template: err.message
                });
            }

        };
        // Link facebook
        $scope.fbConnect = function () {
            //will open in app browser
            var options = {
                location: 'yes',
                clearcache: 'no',
                toolbar: 'yes'
            };
            var fbprofile = $localStorage.fbprofile;
            $cordovaInAppBrowser.open('https://www.facebook.com/'+fbprofile.name, '_blank', options)
                .then(function(event) {
                    // success
                })
                .catch(function(event) {
                    // error
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'Facebook load error'
                    });
                });
        };
        $scope.getFBInfo = function () {
            try{
                $ionicLoading.show({template: 'Fetch facebook account...'});
                $cordovaFacebook.api("me?fields=id,name,first_name,last_name,gender,email,birthday,about,hometown,locale,location,picture", [])
                    .then(function(result){
                        /*
                         * As an example, we are fetching the user id, user name, and the users profile picture
                         * and assiging it to an object and then we are logging the response.
                         */
                        //$localStorage.fbprofile = JSON.stringify(result);
                        /****
                         * Get user info from our server
                         */
                        var loginData = {
                            email: result.email,
                            register_type: 'Fb',
                            logintype_id: result.id
                        };

                        User.login(loginData,
                            'Fb',
                            function(){ // login success
                                $rootScope.updateUser();
                                $location.path("/user-address");
                            },
                            function (err) { // if invalid user info

                                var avatar = result.picture.data.url || 'https://lh3.googleusercontent.com/-77pHuyg_QFs/AAAAAAAAAAI/AAAAAAAAAAA/miTBg963mEg/W96-H96/photo.jpg';

                                $scope.convertImgToBase64(avatar,function(base64image){
                                    var registerData = {
                                        first_name: result.first_name || 'FirstName',
                                        last_name: result.last_name || 'LastName',
                                        email: result.email,
                                        user_image: base64image,
                                        register_type:'Fb',
                                        logintype_id: result.id
                                    };

                                    User.register(registerData,
                                        'Fb',
                                        function () {
                                            $rootScope.updateUser();
                                            $location.path("/user-address");
                                        },
                                        function () {
                                            $ionicPopup.alert({
                                                title: 'FB Login Cancelled',
                                                template: 'Register failed'
                                            });
                                        }
                                    );
                                },'image/jpg');
                            });

                    }, function(error){
                        // Error message
                        $ionicPopup.alert({
                            title: 'FB Login Cancelled',
                            template: error.errorMessage
                        });
                    });
            }catch (err){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Alert',
                    template: err.message
                });
            }
        }
         var googleapi = {
                authorize: function(options) {
                    var deferred = $.Deferred();

                    //Build the OAuth consent page URL
                    var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
                        client_id: options.client_id,
                        redirect_uri: options.redirect_uri,
                        response_type: 'code',
                        scope: options.scope

                    });

                    //Open the OAuth consent page in the InAppBrowser
                    var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

                    //The recommendation is to use the redirect_uri "urn:ietf:wg:oauth:2.0:oob"
                    //which sets the authorization code in the browser's title. However, we can't
                    //access the title of the InAppBrowser.
                    //
                    //Instead, we pass a bogus redirect_uri of "http://localhost", which means the
                    //authorization code will get set in the url. We can access the url in the
                    //loadstart and loadstop events. So if we bind the loadstart event, we can
                    //find the authorization code and close the InAppBrowser after the user
                    //has granted us access to their data.
                    $(authWindow).on('loadstart', function(e) {
                        var url = e.originalEvent.url;
                        var code = /\?code=(.+)$/.exec(url);
                        var error = /\?error=(.+)$/.exec(url);

                        if (code || error) {
                            //Always close the browser when match is found
                            authWindow.close();
                        }

                        if (code) {
                            //Exchange the authorization code for an access token
                            $.post('https://accounts.google.com/o/oauth2/token', {
                                code: code[1],
                                client_id: options.client_id,
                                client_secret: options.client_secret,
                                redirect_uri: options.redirect_uri,
                                grant_type: 'authorization_code'
                            }).done(function(data) {
                                deferred.resolve(data);

                                $("#loginStatus").html('Name: ' + data.given_name);
                            }).fail(function(response) {
                                deferred.reject(response.responseJSON);
                            });
                        } else if (error) {
                            //The user denied access to the app
                            deferred.reject({
                                error: error[1]
                            });
                        }
                    });

                    return deferred.promise();
                }
            };
        // Instagram Login
        $scope.instaLogin  = function() {

        }
        /*
        Using oauth
        loginWithSocialMedia(media) and setSocialUser(media, result) methods is maken 
        for all social media such as facebook, twitter, google+, instagram and so on not for only facebook.
        */
        function loginWithSocialMedia(media) {
            OAuth.initialize("gEW2LE2yi21CnNEFt3qAg3BYYco");
            OAuth.popup(media)
                .done(function (result) {
                    result.me()
                        .done(function(data) {
                            setSocialUser(media, data);
                        })
                        .fail(function( jqXHR, textStatus, errorThrown) {
                            alert("req error: " + textStatus);
                        });
                })
                .fail(function (e) {
                    alert('error: ' + e.message);
                });
        }

        function setSocialUser(media, result) {
            var registerData = {};
            registerData.name = result.name;
            registerData.username = media + ":" + result.id;
            registerData.password = "don't Know";
            registerData.member = "Buyer";

            AuthService.registerUser(registerData)
                .then(function(data) {
                    if (data.exist == false) {
                        AuthService.setUser(data.data);
                    } else {
                        AuthService.setUser(registerData);
                    }
                    registerData = null;
                    $scope.loginError = false;
                    $scope.invalidLogin = false;
                    $rootScope.$broadcast('user.loggedin', data);
                }, function(data){
                });
        }

        $scope.loginWithFacebook = function() {
            loginWithSocialMedia('facebook');
        }

        $scope.loginWithInstagram = function() {
            loginWithSocialMedia('instagram');
        }

        $scope.loginWithGooglePlus = function() {
            loginWithSocialMedia('google_plus');
        }

        $scope.loginWithTwitter = function() {
            loginWithSocialMedia('twitter');
        }

        // Google Plus Login
        $scope.gplusLogin = function () {
            try{
                $ionicLoading.show({template: 'Login with Google+...'});
                //CLIENT_ID: 833224562116-0vvn98au6v2udovdhmb9u1mrmabrvjj5.apps.googleusercontent.com
                //REVERSED_CLIENT_ID: com.googleusercontent.apps.833224562116-0vvn98au6v2udovdhmb9u1mrmabrvjj5    (correct this)
                //iOS API KEY : AIzaSyDxEXEDt1OZDBJsmyZZcOKcckpTUio_icY
                //$cordovaGooglePlus.login('833224562116-0vvn98au6v2udovdhmb9u1mrmabrvjj5.apps.googleusercontent.com')
                $cordovaGooglePlus.login()
                    .then(
                    function(data){
                        $ionicLoading.hide();
                        //$scope.googleData = JSON.stringify(data, null, 4);

                        // Get user info from our server

                        var loginData = {
                            email: data.email,
                            register_type: 'Google',
                            logintype_id: data.userId
                        };
                        if (typeof loginData.logintype_id === 'undefined') {
                        	loginData.logintype_id = "105";
                        }

                        User.login(loginData,'Google',
                            function () {
                                $rootScope.updateUser();
                                $location.path("/user-address");
                            },
                            function () {
                                if(!data.imageUrl){
                                    data.imageUrl = 'https://lh3.googleusercontent.com/-77pHuyg_QFs/AAAAAAAAAAI/AAAAAAAAAAA/miTBg963mEg/W96-H96/photo.jpg';
                                }
                                $scope.convertImgToBase64(data.imageUrl,function(base64image){
                                    var registerData = {
                                        first_name: data.givenName || 'FirstName',
                                        last_name: data.familyName || 'LastName',
                                        email: data.email,
                                        user_image: base64image,
                                        register_type:'Google',
                                        logintype_id: data.userId
                                    };
                                    User.register(
                                        registerData,
                                        'Google',
                                        function () {
                                            $rootScope.updateUser();
                                            $location.path("/user-address");
                                        },
                                        function (error) {
                                            $ionicPopup.alert({
                                                title: 'Google+ Info',
                                                template: 'Register failed'
                                            });
                                        });
                                },'image/jpg');
                            }
                        );

                    },
                    function(error){
                        $ionicLoading.hide();

                        // Google returns error message due to which login was cancelled.
                        // Depending on your platform show the message inside the appropriate UI widget
                        // For example, show the error message inside a toast notification on Android

                        $ionicPopup.alert({
                            title: 'Google+',
                            template: JSON.stringify(error)
                        });
                    });
            }catch (err){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Google+',
                    template: err.message
                });
            }
        };

        $scope.convertImgToBase64 = function(url, callback, outputFormat){
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this,0,0);
                var dataURL = canvas.toDataURL(outputFormat || 'image/png').replace('data:image/png;base64,','');
                callback(dataURL);
                canvas = null;
            };
            img.src = url;
        }

        $scope.$on('$ionicView.afterEnter', function() {
            $rootScope.loginType = User.getLoginType();
            $rootScope.loggedin = User.isLoggedIn();
            if($rootScope.loggedin){

                if($rootScope.loginType != 'Guest'){
                    var user = User.profile();
                    $scope.login_data = {
                        email: user.email,
                        password: user.password,
                        register_type: 'Email',
                        logintype_id: ''
                    };
                    // $state.go("resort-list");
                    $state.go('product-home');
            /*
                    User.login(
                        $scope.login_data,
                        'Email',
                        function () {
                            $rootScope.updateUser();
                        },
                        function (error) {
                            console.log(error);
                            User.logout();
                            $rootScope.updateUser();
                            $rootScope.$broadcast('user:logout',User.profile());
                            //Cart related
                            Cart.removeAll();
                            $location.path('/welcome');
                        }
                    );
            */
                }
            }
            console.log($ionicHistory.viewHistory().views);
        });
        $scope.$on('$ionicView.enter', function(){
            $ionicSideMenuDelegate.canDragContent(false);
        });
        $scope.$on('$ionicView.leave', function(){
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on('user:logout', function(data) {
            $scope.user = User.profile();
            $rootScope.loggedin = User.isLoggedIn();
            $rootScope.loginType = User.getLoginType();
            $rootScope.updateUser();
        });

        $ionicHistory.nextViewOptions({
            //disableAnimate: true,
            disableBack: true
        });
    })
    .controller('ContactCtrl', function ($scope, $state, $localStorage, $ionicHistory, $ionicLoading, $ionicPopup, APIService) {
        $scope.companyList = [
            {
                id: 0,
                name:'Resort',
                val:'Resort',
                selected: true
            },
            {
                id: 1,
                name:'Restaurant',
                val:'Restaurant',
                selected: false
            },
            {
                id: 2,
                name:'Jobs',
                val:'Jobs',
                selected: false
            }
        ];
        $scope.user = {
            f_name:'',
            l_name:'',
            email:'',
            phone:'',
            message:'',
            company_type:'Resort'
        };
        $scope.contactus = function () {

            if ($scope.user.f_name === "") {
                $scope.user.f_name = "default";
            }
            $ionicLoading.show({template:'Contacting...'});
            APIService.contactUs(
                $scope.user,
                function (succ) {
                    $ionicLoading.hide();
                    // Do success
                    if(!succ.description.error){
                        $ionicPopup.alert({
                            title:succ.message,
                            template: succ.description
                        });
                    }else{
                        var msg = '';
                        for(var i in succ.description.error){
                            msg += i + ' : ' + succ.description.error[i] + '<br/>'
                        }
                        $ionicPopup.alert({
                            title:succ.message,
                            template: msg
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
        };
    })
    .controller('RestaurantListCtrl', function ($scope, $rootScope, $cordovaSocialSharing, $localStorage, $ionicHistory, $ionicLoading, $state, $ionicPopup ,APIService, Cart) {


        $scope.init = function () {
            $scope.resort = [];
            $scope.items = [];
            getCurrentDate();
        }
        $scope.contact = function (num) {
            var call = "tel:" + num;
            document.location.href = call;
        };
        $scope.favourite = function (item) {
            $ionicPopup.alert({
                title:'Favourite Info',
                template: JSON.stringify(item)
            });
        };
        $scope.share = function (resort) {
            try{
                $ionicLoading.show({template:'Find SNS..'});
                $cordovaSocialSharing.share(resort.resort_name, "BiZiToGo", resort.resort_logo, null)
                    .then(function(result) {
                        $ionicLoading.hide();
                    }, function(error) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title:'Error',
                            template:'Cannot share'
                        });
                    });
            }catch (err){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Alert',
                    template: err.message
                });
            }
        };
        $scope.openRestaurantDetail = function (item) {

            var cart_list = Cart.list();
            if (item.Restraurent.openState){

                if (cart_list.length != 0 && ($rootScope.active_restaurant.Restraurent.id != item.Restraurent.id)){
                    //Alert
                    $ionicPopup.confirm({
                        title: 'Alert',
                        template: 'When you select a different restaurant,Any items in your cart will be deleted.'
                    }).then(function(res) {
                        if(res) {
                            Cart.removeAll();
                            $rootScope.$broadcast('cart:updated',Cart.list());
                            $rootScope.active_restaurant = item;
                            $localStorage.active_restaurant = JSON.stringify(item);
                            $state.go('order-place');
                        }
                    });
                }else{
                    $rootScope.active_restaurant = item;
                    $localStorage.active_restaurant = JSON.stringify(item);
                    $state.go('order-place');
                }
            } else {
                $ionicPopup.alert({
                    title: 'Info',
                    template: 'This restaurant is currently closed for delivery.'
                });
            }
            //if($rootScope.active_restaurant.Restraurent.id != item.Restraurent.id){
            //
            //    //Alert
            //    $ionicPopup.confirm({
            //        title: 'Alert',
            //        template: 'When you select a different restaurant,Any items in your cart will be deleted.'
            //    }).then(function(res) {
            //        if(res) {
            //            //save active restaurent details
            //            $rootScope.active_restaurant = item;
            //            $localStorage.active_restaurant = JSON.stringify(item);
            //            if(cart_list.length == 0){
            //                $state.go('order-place');
            //            }else{
            //                Cart.removeAll();
            //                $rootScope.$broadcast('cart:updated',Cart.list());
            //                $state.go('order-place');
            //            }
            //        }
            //    });
            //}else{
            //    $rootScope.active_restaurant = item;
            //    $localStorage.active_restaurant = JSON.stringify(item);
            //
            //}
        };
        $scope.goBack = function () {
            if ($rootScope.deliveryType === "Home"){
                $state.go('product-home');
            } else {
                $state.go('resort-list');
            }
            
        };
        $scope.loadRestaurantList = function (callback) {

            console.log(">>>>>>>> loadRestaurantList : 0");
            if($rootScope.deliveryType === "Resort"){
                var active_resort = JSON.parse($localStorage.active_resort);

                if(active_resort){
                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                    APIService.restaurantList(
                        {resort_id:active_resort.Resort.id},
                        function(result){
                            $ionicLoading.hide();

                            callback && callback();

                            if(!result.description.error){
                                console.log("===========================");
                                console.log(result.description.data);
                                console.log("===========================");
                                angular.forEach(result.description.data, function(data){
                                    if (data.Restraurent[$scope.week] == true){


                                        var startTime = getCurrentDate() + ' ' + data.Restraurent.restraurent_deliverytime_weekdays_from;
                                        var endTime = getCurrentDate() + ' ' + data.Restraurent.restraurent_deliverytime_weekends_to;
                                        data.Restraurent.openState = compareTime(startTime, endTime);
                                        $scope.items.push(data);
                                    }
                                });

                                // $scope.items = result.description.data;
                                $scope.resort = $scope.items[0].Resort;
                                if(($scope.items.length > 0) && !$rootScope.active_restaurant){
                                    $rootScope.active_restaurant = $scope.items[0];
                                }

                            }else{
                                $ionicPopup.alert({
                                    title: 'Info',
                                    template: 'Get restaurant list error'//JSON.stringify(result.description.error)
                                });
                            }
                        },
                        function (err) {
                            $ionicLoading.hide();
                            callback && callback();
                            $timeout(function () {
                                $ionicLoading.show({
                                    template: 'Reconnecting...'
                                });
                                console.log(">>>>>>>> ee");
                                $scope.loadRestaurantList(callback);
                            }, 2000);
                        });
                }
            } else if($rootScope.deliveryType === "Home"){

                $ionicLoading.show({
                    template: 'Loading...'
                });
                APIService.restaurantList(
                    {resort_id: "1"},
                    function(result){
                        $ionicLoading.hide();

                        callback && callback();

                        if(!result.description.error){
                            console.log("===========================");
                            console.log(result.description.data);
                            console.log("===========================");
                            angular.forEach(result.description.data, function(data){
                                if (data.Restraurent[$scope.week] == true){

                                    var startTime = getCurrentDate() + ' ' + data.Restraurent.restraurent_deliverytime_weekdays_from;
                                    var endTime = getCurrentDate() + ' ' + data.Restraurent.restraurent_deliverytime_weekends_to;
                                    data.Restraurent.openState = compareTime(startTime, endTime);
                                    $scope.items.push(data);
                                }
                            });

                            // $scope.items = result.description.data;
                            $scope.resort = $scope.items[0].Resort;
                            if(($scope.items.length > 0) && !$rootScope.active_restaurant){
                                $rootScope.active_restaurant = $scope.items[0];
                            }

                        }else{
                            $ionicPopup.alert({
                                title: 'Info',
                                template: 'Get restaurant list error'//JSON.stringify(result.description.error)
                            });
                        }
                    },
                    function (err) {
                        $ionicLoading.hide();
                        callback && callback();
                        $timeout(function () {
                            $ionicLoading.show({
                                template: 'Reconnecting...'
                            });
                            console.log(">>>>>>>> ee");
                            $scope.loadRestaurantList(callback);
                        }, 2000);
                    });
            } else {
                var active_resort = JSON.parse($localStorage.active_resort);

                if(active_resort){
                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                    APIService.restaurantList(
                        {resort_id:active_resort.Resort.id},
                        function(result){
                            $ionicLoading.hide();

                            callback && callback();

                            if(!result.description.error){
                                console.log("===========================");
                                console.log(result.description.data);
                                console.log("===========================");
                                angular.forEach(result.description.data, function(data){
                                    if (data.Restraurent[$scope.week] == true){


                                        var startTime = getCurrentDate() + ' ' + data.Restraurent.restraurent_deliverytime_weekdays_from;
                                        var endTime = getCurrentDate() + ' ' + data.Restraurent.restraurent_deliverytime_weekends_to;
                                        data.Restraurent.openState = compareTime(startTime, endTime);
                                        $scope.items.push(data);
                                    }
                                });

                                // $scope.items = result.description.data;
                                $scope.resort = $scope.items[0].Resort;
                                if(($scope.items.length > 0) && !$rootScope.active_restaurant){
                                    $rootScope.active_restaurant = $scope.items[0];
                                }

                            }else{
                                $ionicPopup.alert({
                                    title: 'Info',
                                    template: 'Get restaurant list error'//JSON.stringify(result.description.error)
                                });
                            }
                        },
                        function (err) {
                            $ionicLoading.hide();
                            callback && callback();
                            $timeout(function () {
                                $ionicLoading.show({
                                    template: 'Reconnecting...'
                                });
                                console.log(">>>>>>>> ee");
                                $scope.loadRestaurantList(callback);
                            }, 2000);
                        });
                }
            }
        }

        function getCurrentDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            switch(today.getDay()){
                case 1:
                    $scope.week = "monday";
                break;
                case 2:
                    $scope.week = "tuesday";
                break;
                case 3:
                    $scope.week = "wednesday";
                break;
                case 4:
                    $scope.week = "thursday";
                break;
                case 5:
                    $scope.week = "friday";
                break;
                case 6:
                    $scope.week = "saturday";
                break;
                case 7:
                    $scope.week = "sunday";
                break;
            }

            if(dd<10){
                dd='0'+dd
            }
            if(mm<10){
                mm='0'+mm
            }
            today = yyyy+'/'+mm+'/'+dd;
            return today;
        }

        function compareTime (start,end) {
            var from = new Date(Date.parse(start));
            var to = new Date(Date.parse(end));
            var cur = new Date();

            if(from < cur && cur < to){
                return true;
            }else{
                return false;
            }
        }

        $scope.doRefresh = function () {
            console.log(">>>>>>> refresh");
            $scope.loadRestaurantList(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.$on('$ionicView.afterEnter', function() {
            console.log(">>>>>>> afterEnter: ");
            $scope.loadRestaurantList();
        });

    })
    .controller('ProfileCtrl', function ($scope, $rootScope, $localStorage, $cordovaCamera, $ionicActionSheet, $cordovaInAppBrowser, $cordovaFacebook, $cordovaGooglePlus, $ionicHistory, $state, $ionicPopup, $ionicLoading, APIService, User, Cart) {

        $scope.init = function () {
            $scope.user = User.profile();
            $rootScope.loggedin = User.isLoggedIn();
            $scope.capture_image = '';
        }
        /**
         * User actions
         */
        //Profile update
        $scope.update = function () {
            var profile = User.profile();
            var update_data = {
                user_id: $scope.user.id,
                first_name:$scope.user.first_name,
                last_name:$scope.user.last_name,
                user_phoneNo:$scope.user.user_phoneNo,
                email:$scope.user.email,
                user_address:$scope.user.user_address,
                pincode:$scope.user.pincode,
                user_city:$scope.user.user_city,
                user_state:$scope.user.user_state,
                logintype_id:$scope.user.logintype_id,
                register_type:$scope.user.register_type,
                is_validatePhoneNo:$scope.user.is_validatePhoneNo,
                is_active:$scope.user.is_active
            };
            if($scope.user.password){
                update_data.password = $scope.user.password;
            }
            if($scope.capture_image){
                update_data.user_image = $scope.capture_image;
                $scope.userEdit(update_data);
            }else if($scope.user.user_image){
                try{
                    $rootScope.convertImgToBase64($scope.user.user_image,function(base64image){
                        update_data.user_image = base64image;
                        $scope.userEdit(update_data);
                    })
                }catch (err){
                    //console.log(err.message);
                }
            }else{
                $scope.userEdit(update_data);
            }

        };
        $scope.userEdit = function (update_data) {
            $ionicLoading.show({
                template: 'Updating...'
            });
            APIService.editUser( //if user logged in by emil,then update user info
                update_data,
                function(result){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Info',
                        template: result.message
                    });
                    if(!result.description.error){
                        $scope.user = result.description.data;
                        $scope.user.password = '';
                        $localStorage.profile = JSON.stringify(result.description.data);
                        $rootScope.updateUser();
                    }
                },
                function (err) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'Update error'//JSON.stringify(err)
                    });
                });
        };
        //Login
        $scope.goLogin = function () {
            $rootScope.goToLogin();
        };
        // Logout user
        $scope.logout = function () {

            //User related
            User.logout();
            $rootScope.updateUser();
            $rootScope.$broadcast('user:logout',User.profile());
            //Cart related
            Cart.removeAll();

            $ionicLoading.show('Logout..');
            setTimeout(function () {
                $ionicLoading.hide();
                $state.go('welcome');
            },1000);

        };
        /**
         * Redirect functions
         */
        // Link facebook
        $scope.fbConnect = function () {
            //will open in app browser
            var options = {
                location: 'yes',
                clearcache: 'no',
                toolbar: 'yes'
            };
            $cordovaInAppBrowser.open('https://www.facebook.com/'+$scope.user.first_name, '_blank', options)
                .then(function(event) {
                    // success
                })
                .catch(function(event) {
                    // error
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'Facebook load error'
                    });
                });
        };
        //Edit profile
        $scope.editAvatar = function () {

            $ionicActionSheet.show({
                titleText: 'Get User avatar image',
                buttons: [
                    { text: '<i class="icon ion-camera"></i> Camera' },
                    { text: '<i class="icon ion-ios-albums"></i> Picture' },
                ],
                //destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function() {
                    //console.log('CANCELLED');
                },
                buttonClicked: function(buttonIndex) {

                    if (buttonIndex == 0) {
                        var options = {
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA,
                            quality: 75,
                            targetWidth: 512,
                            targetHeight: 512,
                            allowEdit: true,
                            encodingType: Camera.EncodingType.JPEG,
                            saveToPhotoAlbum: false,
                            popoverOptions: CameraPopoverOptions,
                            correctOrientation: true
                        };

                        $cordovaCamera.getPicture(options).then(function(data) {
                            $scope.capture_image = data;
                            $scope.update();
                        }, function (err) {
                            $ionicLoading.hide();
                        });
                    }else if(buttonIndex == 1){

                        var options = {
                            quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                            allowEdit: false,
                            encodingType: Camera.EncodingType.JPEG,
                            popoverOptions: CameraPopoverOptions,
                            saveToPhotoAlbum: false
                        };
                        $ionicLoading.show({
                            template: 'Loading...'
                        });
                        $cordovaCamera.getPicture(options).then(function(data) {
                            $ionicLoading.hide();
                            $scope.capture_image = data;
                            $scope.update();
                        }, function (err) {
                            $ionicLoading.hide();
                        });
                    }
                    return true;
                },
                destructiveButtonClicked: function() {
                    return true;
                }
            });
        };

        /**
         * InAppBrowser events listener
         */

        $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){
        });

        $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
            // insert CSS via code / file
            $cordovaInAppBrowser.insertCSS({
                code: 'body {background-color:red !important;}'
            });

            //insert Javascript via code / file
            //$cordovaInAppBrowser.executeScript({
            //    file: 'inappbrowser-script.js'
            //});
        });

        $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event){
            //alert('$cordovaInAppBrowser:loaderror');
        });

        $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){
            //alert('$cordovaInAppBrowser:exit');
        });

        $scope.$on('$ionicView.afterEnter', function() {
            $rootScope.loggedin = User.isLoggedIn();
            $scope.user = User.profile();
            $scope.user.password = '';
        });

        $scope.$on('user:logout', function(data) {
            $rootScope.updateUser();
            $scope.user = User.profile();
            $rootScope.loggedin = User.isLoggedIn();
            $rootScope.loginType = User.getLoginType();
        });

        //Base64 encode function
        $rootScope.convertImgToBase64 = function(url, callback, outputFormat){
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this,0,0);
                var dataURL = canvas.toDataURL(outputFormat || 'image/png').replace('data:image/png;base64,','');
                callback(dataURL);
                canvas = null;
            };
            img.src = url;
        }

    })
    .controller('UserAddressCtrl', function ($scope, 
                                            $rootScope, 
                                            $localStorage, 
                                            $ionicHistory, 
                                            $state, 
                                            $ionicPopup, 
                                            $ionicLoading, 
                                            APIService, 
                                            User, 
                                            Cart) {
        $scope.user = {};
        $scope.init = function() {
            $scope.user = User.profile();
            $scope.user.zipcode = "";
            $scope.user.address = "";
            $scope.loadZipcodeList();
            delete $localStorage.userAddressFull;
        }
        $scope.orderNow = function() {
            var zipState = false;
            if (!$scope.user.address.trim()){
                $ionicPopup.alert({
                    title: 'Address Empty!',
                    template: 'The address field is empty.'
                });
            } else if (!$scope.user.zipcode.trim()){
                $ionicPopup.alert({
                    title: 'Zipcode Empty!',
                    template: 'The zipcode field is empty.'
                });
            } else {
                var zipList = JSON.parse($localStorage.zipcode);
                angular.forEach(zipList, function(data){
                    if (data.Zip.zip === $scope.user.zipcode){
                        zipState = true;
                        $scope.user = User.profile();
                        $scope.user.zipcode = "";
                        $scope.user.address = "";
                        $rootScope.deliveryType = "Home";
                        $state.go('restaurant-list');
                    }
                });
                if (zipState == false){
                    $ionicPopup.alert({
                        title: 'Zip code error!',
                        template: 'We are sorry we currently do not deliver to this address.'
                    });
                }
            }
        }

        $scope.locationChanged = function (location) {
            $localStorage.userAddressFull = JSON.stringify(location);
            $scope.user.zipcode = location.zipcode;
        };

        $scope.loadZipcodeList = function() {
            $ionicLoading.show({
                template: 'Loading Resorts...'
            });
            APIService.zipcode(
                {},
                function(result){
                    $ionicLoading.hide();
                    if(!result.description.error){
                        $scope.items = result.description.data;
                        if(($scope.items.length > 0) && !$rootScope.zipcode){
                            $rootScope.zipcode = $scope.items;
                            //save active resort details
                            $localStorage.zipcode = JSON.stringify($rootScope.zipcode);
                            
                        }
                    }else{
                        $ionicPopup.alert({
                            title: 'Info',
                            template: 'Get zipcode list error'//JSON.stringify(result.description.error)
                        });
                    }
                },
                function (err) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'Server connect error'//JSON.stringify(err)
                    });
                });
        }
        $scope.goResort = function() {
            delete $localStorage.userAddressFull;
            $rootScope.deliveryType = "Resort"
            $state.go('resort-list');
        }
        $scope.loadZipcodeList();
    })
    .controller('OfflineCtrl', function ($scope, $location, $cordovaNetwork, $ionicLoading, $ionicSideMenuDelegate, $ionicGesture, $ionicHistory) {})
;


function showIntro() {
    if(AuthService.isAuthenticated()){
        IntroModalProvider.showIntroModal($scope);
    }
}

function showWelcome() {
    if(!AuthService.isAuthenticated()){
        IntroModalProvider.showWelcomModal($scope);
    }
}
