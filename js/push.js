"use strict";
angular.module('JPush', []).service('$jPush',[function() {

    var _service = {};

    _service.getRegistrationID = function(){
      _service.push.getRegistrationID(function(data) {
          try {
            //alert(data);
          } catch (exception) {
            alert(exception);
          }
      });
    };


    _service.init = function(){
      if(!window.plugins){
        console.log('Plugins Init Error~');
        return false;
      };
      if(!_service.push){
        _service.push = window.plugins.jPushPlugin;
      }
      try {
          _service.push.init();
          _service.getRegistrationID();
          if (device.platform != "Android") {
              _service.push.setDebugModeFromIos();
              _service.push.setApplicationIconBadgeNumber(0);
          } else {
              _service.push.setDebugMode(true);
              _service.push.setStatisticsOpen(true);
          }
          return true;
      } catch (exception) {
        alert(exception);
      }
      return false;
    };

    _service.setTagsWithAlias = function(tags,alias){
      _service.push.setTagsWithAlias(tags, alias);
    }


    return _service;
}]);
