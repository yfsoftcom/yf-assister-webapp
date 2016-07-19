angular.module('app.controllers', ['app.services'])
    .controller('CoreCtrl',['$scope',function($scope){

    }])
    .controller('DashboardCtrl',['$scope','DashboardService',function($scope,DashboardService){

        $scope.doRefresh = function(){
            DashboardService.getData(1)
                .then(function(data){
                    $scope.datas = data;
                })
                .finally(function(){
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };


    }])
    .controller('AppsCtrl',['$scope',function($scope){

    }])
    .controller('PlusCtrl',['$scope',function($scope){

    }])
    .controller('SubscribeCtrl',['$scope',function($scope){

    }])
    .controller('NotificationCtrl',['$scope',function($scope){

    }])
    .controller('SettingCtrl',['$scope',function($scope){

    }])

;
