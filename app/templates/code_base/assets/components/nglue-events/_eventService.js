'use strict';

angular.module('eventService', [])
  .factory('eventService', ['$rootScope', function ($rootScope) {

    // implement serviceAPI in each app

    return angular.extend(serviceAPI, {
      broadcastRootEvent: function (eventname, args) {
        $rootScope.$broadcast(eventname, args);
      },
      broadcastEvent: function (scope, eventname, args) {
        scope.$broadcast(eventname, args);
      },
      registerEventHandler: function (scope, eventname, listener) {
        scope.$on(eventname, listener);
      },
      registerRootEventHandler: function (eventname, listener) {
        $rootScope.$on(eventname, listener);
      }
    });
  }]);
