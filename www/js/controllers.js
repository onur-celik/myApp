angular.module('starter.controllers', [])

.controller('WelcomeCtrl', function ($scope, $http, $filter, $stateParams) {
  $scope.sessionid = $stateParams.session_id;
  $scope.adv_id = '9999';

  $scope.getLastConnectionInfo = function(){
    $scope.is_submit = true;
    //$http.jsonp('http://' +$scope.test_host+ '/api/portal/mobil/last_connection_info/'+$scope.sessionid+ '/' + $scope.adv_id+'?callback=JSON_CALLBACK').success(function(resp){
    //  $scope.resp =  resp;
    //  $scope.is_submit = false;
    //});

    //$scope.resp = {
    //  "connected_before": true,
    //  "data": "{\"client\": {\"ip\": \"192.168.20.224\", \"mac\": \"CC:52:AF:11:09:0B\", \"requested_url\": \"http://www.google.com.tr\", \"logged-in\": \"no\"}, \"edge\": {\"hostname\": \"ns1.google.com\", \"login_url\": \"http://ns1.google.com/login\", \"ssl-login\": \"no\", \"current_url\": \"http://ns1.google.com/login?dst=http%3A%2F%2Fwww.milliyet.com%2F\", \"chap-id\": \"\", \"plain-passwd\": \"yes\", \"current_host\": \"ns1.google.com\", \"essid\": \"Logsign20\", \"chap-challenge\": \"\", \"current_port\": \"80\"}, \"portal\": {\"url\": \"http://10.0.4.39\"}, \"integration\": \"Microtik\", \"error\": {\"message\": \"\"}}",
    //  "id": "IB28J6GM0QRE"
    //};

    $scope.resp = {'connected_before':true};

    $scope.is_submit = false;
  }

  //$http.get('/api/portal/mobil/test_host/'+$scope.sessionid).success(function(resp){
  //  $scope.test_host = resp.test_host;
  //});


  $scope.sendSms = function (){
    $scope.is_submit = true;
    $http.jsonp('http://' +$scope.test_host+ '/api/portal/mobil/send_sms/' + $scope.sessionid + '/' + $scope.adv_id + '/' + $scope.form.gsm + '/'+'?callback=JSON_CALLBACK').success(function(resp){
      $scope.resp =  resp;
      if (resp.sms_verify){
        $scope.register_mode = 'sms_verify'
      }
      $scope.is_submit = false;
    });
  }

  $scope.login = function (){
    //$http.jsonp('http://' +$scope.test_host+ '/api/portal/mobil/login/' + $scope.sessionid + '/' + $scope.adv_id + '/' + $scope.form.gsm + '/' + $scope.form.password + '/'+'?callback=JSON_CALLBACK').success(function(resp){
    //  $scope.resp =  resp;
    $scope.resp = {'success':true,'message':'success|error message', sessionid:'abc'};
    console.log('response-1 : ',$scope.resp);
    //  setTimeout(function(){
    //    $http.jsonp(resp.login_url).success(function(response){
    //      response = {'success':true,'message':'success|error message', sessionid:'abc'};
    var response = {"success":true,"login_url":"http://Gw/login?username=user&.."};
    console.log('response-2 : ',response);
    //    });
    //  }, 3000)
    //});
  }

  $scope.verifySms = function (){
    $scope.is_submit = true;
    $http.jsonp('http://' +$scope.test_host+ '/api/portal/mobil/verify_sms/' + $scope.sessionid + '/' + $scope.adv_id + '/' + $scope.form.gsm + '/' + $scope.form.password + '/'+'?callback=JSON_CALLBACK').success(function(resp){
      $scope.resp =  resp;
      $scope.is_submit = false;
      if (resp.success){
        $scope.register_mode = 'login';
      }
    });
  }

});
