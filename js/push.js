"use strict";
angular.module('JPush', []).service('$jPush',[function() {

    var onGetRegistrationID = function(data) {
        try {
            console.log("JPushPlugin:registrationID is " + data);
            alert(data);
        } catch (exception) {
        alert(exception);
            console.log(exception);
        }
    };
    var getRegistrationID = function() {
        window.plugins.jPushPlugin.getRegistrationID(onGetRegistrationID);
    };
    return {
        init: function() {
            try {
                window.plugins.jPushPlugin.init();
                getRegistrationID();
                if (device.platform != "Android") {
                    window.plugins.jPushPlugin.setDebugModeFromIos();
                    window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                } else {
                    window.plugins.jPushPlugin.setDebugMode(true);
                    window.plugins.jPushPlugin.setStatisticsOpen(true);
                }
            } catch (exception) {
              alert(exception);
                console.log(exception);
            }
        }
    };
}]);
