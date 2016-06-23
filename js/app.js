// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//var db = null;

angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    /*******************INITIALIZE DATABASE******************************/
    // $rootScope.db = $cordovaSQLite.openDB({ name: "news.db" });
    $rootScope.db = window.openDatabase('news.db', '1.0', 'database', -1);
    //title, img, date, body
    $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS articles (id integer primary key, title text, img text, date text, body text)");
    /********************************************************************/

    /*******************INTITIALIZE PUSH NOTIFICATIONS*******************/
    // Add to index.js or the first page that loads with your app.
    // For Intel XDK and please add this to your app.js.

    document.addEventListener('deviceready', function () {
      // Enable to debug issues.
      // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
      
      var notificationOpenedCallback = function(jsonData) {
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
      };

      window.plugins.OneSignal.init("15d7c2b2-25bb-46ce-9aba-b97a7899b558",
                                     {googleProjectNumber: "670391923390"},
                                     notificationOpenedCallback);
      
      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(true);
    }, false);
    /********************************************************************/
    
  });
})