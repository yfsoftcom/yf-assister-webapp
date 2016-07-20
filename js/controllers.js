angular.module('app.controllers', ['app.services'])
    .controller('CoreCtrl',['$scope','CommonService',function($scope,CommonService){
        CommonService.ready().then(function(){
            console.log('初始化完毕');
        });
    }])
    .controller('DashboardCtrl',['$scope','DashboardService',function($scope,DashboardService){

        $scope.doRefresh = function(){
            DashboardService.getData(1)
                .then(function(data){
                    console.log(data);
                    $scope.datas = data;
                }).catch(function(err){
                    console.log(err);
                })
                .finally(function(){
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };


    }])
    .controller('AppsCtrl',['$scope','CommonService','AppService',function($scope,CommonService,AppService){
        //输出用户可以使用的应用列表
        $scope.doRefresh = function(){
            AppService.getApps(1)
                .then(function(data){
                    $scope.apps = data;
                })
                .finally(function(){
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        $scope.open = function(url){
            CommonService.openWebView(url);
        }

    }])
    .controller('PlusCtrl',['$scope',function($scope){

    }])
    .controller('SubscribeCtrl',['$scope',function($scope){

    }])
    .controller('NotificationCtrl',['$scope',function($scope){
        $scope.doRefresh = function(){
            $scope.$broadcast('scroll.refreshComplete');
        };
    }])
    .controller('SettingCtrl',['$scope','CommonService',function($scope,CommonService){
        $scope.checkUpdate = function(){
            CommonService.checkUpdate('AssisterApp')
                .then(function(){
                    alert('已是最新版~无需更新');
                })
                .catch(function(e){
                    //有更新
                    if(!confirm('有更新版本,是否前往下载?'))
                        return false;
                    //前往下载
                    CommonService.openWebView(e.download);
                });


        }
    }])

;
