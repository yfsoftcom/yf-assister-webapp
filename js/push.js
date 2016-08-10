"use strict";
angular.module('JPush', []).service('$jPush',[function() {
    var push;
    return {
        setBadge: function(badge) {
            if (push) {
                plugins.jPushPlugin.setBadge(badge);
            }
        },
        setAlias: function(alias) {
            if (push) {
                plugins.jPushPlugin.setAlias(alias);
            }
        },
        setTags:function(tags){
            if(push){
                plugins.jPushPlugin.setTags(tags);
            }
        },
        setTagsWithAlias:function(tags,alias){
            if(push){
                plugins.jPushPlugin.setTagsWithAlias(tags,alias);
            }
        },
        check: function() {
            if (window.jpush && push) {
                plugins.jPushPlugin.receiveNotificationIniOSCallback(window.jpush);
                window.jpush = null;
            }
        },
        init: function(notificationCallback) {
            push = window.plugins && window.plugins.jPushPlugin;
            if (push) {
                plugins.jPushPlugin.init();
                plugins.jPushPlugin.setDebugMode(true);
                plugins.jPushPlugin.openNotificationInAndroidCallback = notificationCallback;
                //plugins.jPushPlugin.openNotificationIniOSCallback = notificationCallback;
                //document.addEventListener("jpush.openNotification", onOpenNotification, false);
            }
        }
    };
}]);
