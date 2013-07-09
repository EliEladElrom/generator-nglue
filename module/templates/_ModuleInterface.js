'use strict';

angular.module('<%= moduleName %>')
  .factory('<%= moduleName %>Interface', ['$rootScope', function($rootScope) {

    // public API for this service, implement below
    var serviceAPI = {};

    // Private API
    // Add any run-once code and any vars or functions private to this service


    // expose any functions and vars publicly by adding them to serviceAPI
    serviceAPI = angular.extend(serviceAPI, {

    });
    return serviceAPI;  // return service object
  }]);