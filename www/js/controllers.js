angular.module('starter.controllers', [])

.controller('WelcomeCtrl', function ($scope, $http, $filter, $stateParams) {
  $scope.sessionid = $stateParams.session_id;
  $scope.adv_id = '9999';

  $scope.initApp = function(){
    $http
        .get('/js/api/getSessionId.json')
        .success(function(resp)
        {
          $scope.sessionId = resp;
        })
        .then(function(){
          console.log($scope.sessionId);
        });
  };

  $scope.initApp();

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



    ///////////////////////////////////////////////////////////////
    // url'e $scope.sessionId.sessionid eklenecek...
    $http
        .get('/js/api/lastConnectionFail.json')
        .success(function(resp)
        {
          $scope.connectedBefore = resp;
        })
        .then(function(){
          console.log($scope.connectedBefore);
          if ($scope.connectedBefore.connected_before == false)
          {
            $scope.register_mode="sign_up_sms";
          }
        });

  }

  //$http.get('/api/portal/mobil/test_host/'+$scope.sessionid).success(function(resp){
  //  $scope.test_host = resp.test_host;
  //});


  $scope.sendSms = function (){
    //$scope.is_submit = true;
    //$http.jsonp('http://' +$scope.test_host+ '/api/portal/mobil/send_sms/' + $scope.sessionid + '/' + $scope.adv_id + '/' + $scope.form.gsm + '/'+'?callback=JSON_CALLBACK').success(function(resp){
    //  $scope.resp =  resp;
    //  if (resp.sms_verify){
    //    $scope.register_mode = 'sms_verify'
    //  }
    //  $scope.is_submit = false;
    //});



    ////////////////////////////////////////////////////////////////
    $http
        .get('/js/api/signUp.json')
        .success(function(resp)
        {
          $scope.signUp = resp;
        })
        .then(function(){
          if($scope.signUp.success){
            console.log($scope.signUp.message);
            $scope.enableInternet();
          }
        });
  }

  $scope.enableInternet = function(){
    $http
        .get('/js/api/enableInternetSuccess.json')
        .success(function(resp)
        {
          $scope.enableInternet = resp;
        })
        .then(function(){
          if($scope.enableInternet.success){
            console.log($scope.enableInternet.login_url);
          }
          else
          {
            console.log($scope.enableInternet.message);
          }
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
