'use strict';

angular.module('<%= appName %>')
  .factory('eventService', ['$rootScope', function ($rootScope) {
    var serviceAPI = {
      example: 'eventService__example'
    };

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
