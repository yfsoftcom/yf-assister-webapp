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
            }
        }
}])
    .service('AppService', ['$ae','$q',function($ae,$q){
        var datas = [
            {
                title:'采购端',
                url:'http://erp.guoran100.com/index.php?s=/caigou/index/index.html'
            }
        ];
        return {
            getApps:function(uid){
                var q = $q.defer();
                q.resolve(datas);
                return q.promise;
            }
        }
    }])
    .service('NotificationService',['$q','$ae',function($q,$ae){

        var datas = [
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
                q.resolve(datas);
                return q.promise;

            }
        }
    }])
    .service('CommonService',['$q','$ae','$cordovaDevice','$cordovaAppVersion',
        function($q,$ae,$cordovaDevice,$cordovaAppVersion){
            return {
                ready:function(){
                    var q = $q.defer();
                    $ae.init({mode:'PRODUCT',appkey:'45883198abcdc110',masterKey:'1b7e5703602b6fce1cae7364ac0f2249'});
                    q.resolve();
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
                    if('iOS' == platform){
                        $cordovaAppVersion.getVersionCode().then(checkCallback);
                    }else{
                        $cordovaAppVersion.getVersionNumber().then(checkCallback);
                    }

                    return q.promise;

                },
                openWebView:function(url){
                    //非手机环境
                    cordova.ThemeableBrowser.open(url, '_blank', {
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
                    });
                },
            };
        }])
;

