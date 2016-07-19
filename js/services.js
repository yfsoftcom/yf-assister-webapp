"use strict";
angular.module('app.services', ['ngApi'])

.service('DashboardService', ['$ae','$q',function($ae,$q){

        var datas = {
            lastUpdateAt:'2016-07-13 20:00:00',
            datas:[
                {
                    title:'物流指标',
                    datas:[
                        {
                            title:'A1',
                            val:'59.3%'
                        },
                        {
                            title:'A2',
                            val:'53.3%'
                        },
                        {
                            title:'A3',
                            val:'52.1%'
                        },
                        {
                            title:'B1',
                            val:'62.3%'
                        },
                        {
                            title:'B1',
                            val:'39.3%'
                        }

                    ]
                }
            ]
        };
        return {
            getData:function(uid){
                var q = $q.defer();
                q.resolve(datas);

                return q.promise;
            }
        }
}])
;

