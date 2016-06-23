angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.latestICDLNews', {
    url: '/news',
    views: {
      'side-menu21': {
        templateUrl: 'templates/latestICDLNews.html',
        controller: 'latestICDLNewsCtrl'
      }
    }
  })

  .state('menu.iCDLModules', {
    url: '/modules',
    views: {
      'side-menu21': {
        templateUrl: 'templates/iCDLModules.html',
        controller: 'iCDLModulesCtrl'
      }
    }
  })

  .state('menu.trainingExams', {
    url: '/training',
    views: {
      'side-menu21': {
        templateUrl: 'templates/trainingExams.html',
        controller: 'trainingExamsCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.accreditedICDLCenters', {
    url: '/centers',
    views: {
      'side-menu21': {
        templateUrl: 'templates/accreditedICDLCenters.html',
        controller: 'accreditedICDLCentersCtrl'
      }
    }
  })

  .state('menu.becomeACenter', {
    url: '/becomecenter',
    views: {
      'side-menu21': {
        templateUrl: 'templates/becomeACenter.html',
        controller: 'becomeACenterCtrl'
      }
    }
  })

  .state('menu.fAQS', {
    url: '/faq',
    views: {
      'side-menu21': {
        templateUrl: 'templates/fAQS.html',
        controller: 'fAQSCtrl'
      }
    }
  })

  .state('menu.credits', {
    url: '/credits',
    views: {
      'side-menu21': {
        templateUrl: 'templates/credits.html',
        controller: 'creditsCtrl'
      }
    }
  })

  .state('menu.introductoryModules', {
    url: '/introductory-modules',
    views: {
      'side-menu21': {
        templateUrl: 'templates/introductoryModules.html',
        controller: 'introductoryModulesCtrl'
      }
    }
  })

  .state('menu.baseModules', {
    url: '/base-modules',
    views: {
      'side-menu21': {
        templateUrl: 'templates/baseModules.html',
        controller: 'baseModulesCtrl'
      }
    }
  })

  .state('menu.standardModules', {
    url: '/standard-modules',
    views: {
      'side-menu21': {
        templateUrl: 'templates/standardModules.html',
        controller: 'standardModulesCtrl'
      }
    }
  })

  .state('menu.advancedModules', {
    url: '/advanced-modules',
    views: {
      'side-menu21': {
        templateUrl: 'templates/advancedModules.html',
        controller: 'advancedModulesCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu/news')

  

});