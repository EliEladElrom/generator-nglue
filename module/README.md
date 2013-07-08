Modules built for Angular.js in nglue use an interface service in order to expose an api to the apps that use them.

Take an example module, an item repeater with pagination, created with command `yo nglue:module pagedList`
a file will be created as `modules/pagedList/pagedListModuleInterface.js` 

`pagedListModuleInterface.js` creates an angular service on the `pagedListModule` namespace called `pagedListModuleInterface`

Here below we see two functions exposed by the module api.  In addition, note that the module's Interface service should also give dummy data for testing the module's ui:

```
angular.module('pagedListModule')
  .factory('pagedListModuleInterface', ['$rootScope', function($rootScope) {

    var serviceAPI = {
    };

    serviceAPI = angular.extend(serviceAPI, {
      addListenerToItems: function(loadingFunction) {
        // API Stub: sets a watcher to tell when it's time to load new data into the module 
        loadingFunction(); // simply run once in module
      },
      getItems: function() {
        // API Stub: function that module uses to get data from elsewhere in the app
        return [/* dummy data here */];
      }
    });

    return serviceAPI;
  }]);
```


The module's interface file is outside of the `scripts` directory, so it will not be included when uglifying the module's source code.  Instead, each app that nglues the pagedListModule needs to create a working interface service itself.  Thanks to Angular's dependency injection, the pagedListModuleInterface that we create for meetingsApp will be injected back into any controllers or services that were defined in pagedListModule, ngluing together the app and it's module components.

Here is an example of how the app, `meetingsApp`, implements the `pagedListModuleInterface`:

```
angular.module('meetingsApp')
  .factory('pagedListModuleInterface', ['eventService', 'meetingCache', function(eventService, meetingCache) {

    var serviceAPI = {
    };

    serviceAPI = angular.extend(serviceAPI, {
      addListenerToItems: function(loadingFunction) {
        eventService.registerRootEventHandler(eventService.dataCacheRefreshedEvent, loadingFunction);
      },
      getItems: function() {
        return meetingCache.getMeetingsFromCache();
      }
    });

    return serviceAPI;
  }]);
```
