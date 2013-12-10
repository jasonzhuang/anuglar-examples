'use strict';

foodMeApp.controller('CheckoutController',
    function CheckoutController($scope, cart, customer, $location) {

  $scope.cart = cart;
  $scope.restaurantId = cart.restaurant.id;
  $scope.customer = customer;
  $scope.submitting = false;


  $scope.purchase = function() {

    cart.submitOrder().then(function(orderId){
       $location.path('thank-you').search({orderId:orderId});
    });
  };
});
