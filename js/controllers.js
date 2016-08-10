angular.module('app.controllers', ['app.services','JPush'])
    .controller('CoreCtrl',['$scope','CommonService','$jPush','$state',function($scope,CommonService,$jPush,$state){
        CommonService.ready().then(function(){
            console.log('初始化完毕');
            var notificationCallback = function() {
                $state.go('tab.notification');
            };
            $jPush.init(notificationCallback);
            $jPush.setAlias('mmm');
            document.addEventListener("jpush.setAlias", function(event){
                alert(event.alias);
                alert(2222);
                console.log("===============");
                console.log("===============");
                console.log(event.alias);
                console.log("===============");
                console.log("===============");
                console.log("===============");
                console.log("===============");
                console.log("===============");
            }, false);
            alert(456);
            document.addEventListener("jpush.openNotification", notificationCallback, false);
        });

        $scope.open = function(url){
            CommonService.openWebView(url);
        }
    }])
    .controller('DashboardCtrl',['$scope','$ionicPopup','$ionicLoading','DashboardService',function($scope,$ionicPopup,$ionicLoading,DashboardService){

        $scope.doRefresh = function(){
          $ionicLoading.show({template: '客官别急,小的正在拼命加载数据...'});
            DashboardService.getData(1)
                .then(function(data){
                    console.log(data);
                    $scope.datas = data;
                }).catch(function(err){
                    console.log(err);
                })
                .finally(function(){
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicLoading.hide();
                });
        };

        $scope.showDetail = function(d){
          if(d === undefined){
            return;
          }
          d = d[0];
          // 一个提示对话框
          var str = '';
          for(var i in d.datas){
            var _d = d.datas[i];
            str += '<div class="row">';
            str += '<div class="col"><b>' + _d.title + '</b></div>';
            str += '<div class="col">' + _d.val + '</div>';
            str += '</div>';
          }
          //
          $ionicPopup.alert({
               title: d.title,
               template: str
            });

        }


    }])
    .controller('MonthProtalCtrl',['$scope','$ionicPopup','$ionicLoading','DashboardService',function($scope,$ionicPopup,$ionicLoading,DashboardService){

      //月报控制器
      $scope.doRefresh = function(){
        $ionicLoading.show({template: '客官别急,小的正在拼命加载数据...'});
          DashboardService.getMonthData(1,7)
              .then(function(data){
                  console.log(data);
                  $scope.datas = data;
              }).catch(function(err){
                  console.log(err);
              })
              .finally(function(){
                  $scope.$broadcast('scroll.refreshComplete');
                  $ionicLoading.hide();
              });
      };
      $scope.more = function(){
        $ionicPopup.alert({
             title: '啊喔',
             template: '<p>Sorry啦~这里还不能点~</p>'
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
    }])
    .controller('PlusCtrl',['$scope',function($scope){

    }])
    .controller('SubscribeCtrl',['$scope','SubscribeService',function($scope,SubscribeService){
        $scope.subcriptions = [] ;
        $scope.doRefresh = function(){
            SubscribeService.getSubscriptions(1)
                .then(function(datas){
                    console.log(datas);
                    $scope.subcriptions = datas;
                })
                .finally(function(){
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        $scope.subscribe_change = function(id,checked){
            //更新订阅内容
            SubscribeService.updateUserSubcriptions(1,id);
        };
    }])
    .controller('NotificationCtrl',['$scope','NotificationService',function($scope,NotificationService){
        $scope.doRefresh = function(){
            NotificationService.getMessages(1)
                .then(function(datas){
                    $scope.datas = datas;
                })
                .finally(function(){
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
    }])
    .controller('SettingCtrl',['$scope','CommonService',function($scope,CommonService){
        $scope.checkUpdate = function(){
            CommonService.checkUpdate('果然助理')
                .then(function(){
                    alert('已是最新版~无需更新');
                })
                .catch(function(e){
                    //有更新
                    if(!confirm('有更新版本,是否前往下载?'))
                        return false;
                    //前往下载
                    CommonService.openWebView(e.download,'_system');
                });


        }
    }])

;
