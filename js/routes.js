angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      //底部标签页
      .state('tab', {
        url: '/tab',
        templateUrl: 'templates/tabs.html',
        abstract:true,
        controller: 'CoreCtrl'
      })
      //看板
      .state('tab.dashboard', {
        url: '/dashboard',
        views: {
          'dashboard': {
            templateUrl: 'templates/dashboard/protal.html',
            controller: 'DashboardCtrl'
          }
        }
      })

      //应用
      .state('tab.apps', {
        url: '/apps',
        views: {
          'apps': {
            templateUrl: 'templates/apps/index.html',
            controller: 'AppsCtrl'
          }
        }
      })

      //添加
      .state('tab.plus', {
        url: '/plus',
        views: {
          'plus': {
            templateUrl: 'templates/plus/index.html',
            controller: 'PlusCtrl'
          }
        }
      })

      //通知
      .state('tab.notification', {
          url: '/notification',
          views: {
              'notification': {
                  templateUrl: 'templates/notification/list.html',
                  controller: 'NotificationCtrl'
              }
          }
      })

      //订阅
      .state('tab.subscribe', {
        url: '/subscribe',
        views: {
          'notification': {
            templateUrl: 'templates/subscribe/index.html',
            controller: 'SubscribeCtrl'
          }
        }
      })

      //设置
      .state('tab.setting', {
        url: '/setting',
        views: {
          'setting': {
            templateUrl: 'templates/setting/index.html',
            controller: 'SettingCtrl'
          }
        }
      })

  ;


$urlRouterProvider.otherwise('/tab/dashboard')



});
