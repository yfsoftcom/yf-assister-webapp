"use strict";
angular.module('app.services', ['ngApi','ngCordova'])

.service('DashboardService', ['$ae','$q',function($ae,$q){
        return {
            getData:function(uid){
                var q = $q.defer();
                var func = new $ae.Function('api.assister.protal');
                func.invoke({}).then(function(datas){
                    q.resolve(datas);
                }).catch(function(err){
                    q.reject(err);
                });
                return q.promise;
            },
            getMonthData:function(uid,month){
              var q = $q.defer();
              var func = new $ae.Function('api.assister.month');
              func.invoke({month:month,uid:uid}).then(function(datas){
                  q.resolve(datas);
              }).catch(function(err){
                  q.reject(err);
              });
              return q.promise;
            }
        }
}])
    .service('AppService', ['$ae','$q',function($ae,$q){
        return {
            getApps:function(uid){
                var q = $q.defer();
                var func = new $ae.Function('api.assister.apps');
                func.invoke({}).then(function(datas){
                    q.resolve(datas);
                }).catch(function(err){
                    q.reject(err);
                });
                return q.promise;
            }
        }
    }])
    .service('NotificationService',['$q','$ae',function($q,$ae){

        var datas1 = [
            {
                channel:'果然100销售',
                publishAt:1446215421,
                content:'进度完成101%！',
                url:'http://www.baidu.com'
            },
            {
                channel:'世果销售',
                publishAt:1446215421,
                content:'进度完成121%！',
                url:'http://www.fir.im'
            },
            {
                channel:'果饮店销售',
                publishAt:1446215421,
                content:'进度完成141%！',
                url:'http://www.guoran100.com'
            }
        ];

        return {
            getMessages : function(uid){
                var q = $q.defer();
                var func = new $ae.Function('api.assister.getMessages');
                func.invoke({uid:uid}).then(function(datas){
                    q.resolve(datas);
                }).catch(function(err){
                    q.reject(err);
                });

                return q.promise;

            }
        }
    }])
    .service('SubscribeService',['$q','$ae',function($q,$ae){
        return {
            getSubscriptions : function(uid){
                var q = $q.defer();
                var func = new $ae.Function('api.assister.getSubscriptions');
                func.invoke({uid:uid}).then(function(datas){
                    q.resolve(datas);
                }).catch(function(err){
                    q.reject(err);
                });
                return q.promise;

            },
            updateUserSubcriptions:function(uid,subscribe){
                var q = $q.defer();
                var func = new $ae.Function('api.assister.updateUserSubscriptions');
                func.invoke({uid:uid,subscribe:subscribe}).then(function(datas){
                    q.resolve(datas);
                }).catch(function(err){
                    q.reject(err);
                });
                return q.promise;
            }
        }
    }])
    .service('CommonService',['$q','$ae','$ionicPlatform','$cordovaDevice','$cordovaAppVersion',
        function($q,$ae,$ionicPlatform,$cordovaDevice,$cordovaAppVersion){
          /******************* CONST VAR DEFINED ****************************/
          var CONST_BROWSER_OPTIONS = {
              toolbar: {
                  height: 44,
                  color: '#eeeeee'
              },
              title: {
                  color: '#000000',
                  showPageTitle: true
              },
              backButton: {
                  wwwImage:'img/back-128.png',
                  wwwImageDensity:2,
                  imagePressed: 'back_pressed',
                  align: 'left',
                  event: 'backPressed'
              },
              closeButton: {
                  wwwImage:'img/close-128.png',
                  wwwImageDensity:2,
                  imagePressed: 'close_pressed',
                  align: 'right',
                  event: 'closePressed'
              },
              backButtonCanClose: true
          };
          var CONST_BROWSER_TARGET = '_blank';

          var CONST_APP_KEYS = {mode:'PRODUCT',appkey:'45883198abcdc110',masterKey:'1b7e5703602b6fce1cae7364ac0f2249'};//product

          /******************* VAR DEFINED ****************************/

            return {
                ready:function(){
                    var q = $q.defer();
                    $ae.init(CONST_APP_KEYS);
                    //等待设备加载
                    $ionicPlatform.ready(function(){
                      q.resolve();
                    });
                    return q.promise;
                },
                checkUpdate:function(appName){
                    appName = appName || 'DemoApp';
                    var q = $q.defer();
                    var platform = $cordovaDevice.getPlatform();
                    var checkCallback = function(build){
                        var func = new $ae.Function('api.version.check');
                        var args = {app:appName,device:platform.toLowerCase(),version:build};
                        func.invoke(args).then(function(d){
                            q.resolve(d);
                        }).catch(function (e) {
                            //包含version和download
                            e.download= e.error.download;
                            q.reject(e);
                        });
                    };
                    $cordovaAppVersion.getVersionCode().then(checkCallback);

                    return q.promise;

                },
                openWebView:function(url,target){
                    //非手机环境
                    target = target || CONST_BROWSER_TARGET;
                    cordova.ThemeableBrowser.open(url, target, CONST_BROWSER_OPTIONS);
                },
            };
        }])
;
