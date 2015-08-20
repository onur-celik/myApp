angular.module('starter.controllers', [])

.controller('WelcomeCtrl', function ($scope, $http, $filter, $stateParams) {
//        $scope.sessionid = $stateParams.sessionid;
        $scope.sessionid = 'null';
        $scope.trackId = '9999';
        $scope.host = '10.0.4.39'
        $scope.form = {}
        $scope.register_mode = 'sign_up_sms'

        $scope.getLastConnectionInfo = function(){
            $scope.is_submit = true;
            $http.get('http://' +$scope.host+ '/api/portal/auth/v1/last_connection_info?sessionid='+$scope.sessionid).success(function(resp){
                $scope.resp =  resp;
                $scope.is_submit = false;
                if (resp.connected_before){
                    $scope.register_mode = 'enable_internet';
                }
            });
        }
//        $http.get('/api/portal/auth/v1/test_host').success(function(resp){
//            $scope.host = resp.test_host;
//            $scope.start_session({'trackId':$scope.trackId})
//        });


        $scope.start_session = function(params) {
            var req = {
                method: 'POST',
                url: 'http://' +$scope.host+ '/api/portal/auth/v1/start_session?sessionid='+$scope.sessionid,
                headers: {
                    'Content-Type': undefined //cross browser post allowed
                },
                data: params
            }

            $http(req).success(function(resp){
                if (resp.success){
                    $scope.sessionid = resp.sessionid;
                    $scope.getLastConnectionInfo();
                }
                $scope.resp =  resp;
            });
        }


        $scope.sendSms = function (){
            $scope.is_submit = true;
            var params = {
                'gsm':$scope.form.gsm,
                'country_code': '90'
            }
            $http.post('http://' +$scope.host+ '/api/portal/auth/v1/sign_up?sessionid='+$scope.sessionid, params,{
                headers: {
                    'Content-Type': undefined //cross browser post allowed
                }
            }).success(function(resp){
                $scope.resp =  resp;
                console.log(resp);
                if (resp.success){
                    $scope.register_mode='sms_verify'
                }
                $scope.is_submit = false;
            });
        }
        $scope.enable_internet = function (){
            $http.get('http://' +$scope.host+ '/api/portal/auth/v1/enable_internet?sessionid='+$scope.sessionid).success(function(resp){
                $scope.resp =  resp;
                if (resp.success){
                setTimeout(function(){
                    $http.jsonp(resp.login_url).success(function(response){
                        console.log('response',response)
//                    message:loggedin varsa internet success
                    });
                }, 3000)

                }
//                setTimeout(function(){
//                    $http.jsonp(resp.login_url).success(function(response){
//                        console.log('response',response)
////                    message:loggedin varsa internet success
//                    });
//                }, 3000)
            });
        }
        $scope.verifySms = function (){
            $scope.is_submit = true;
            var params = {
                'code' : $scope.form.password
            }
            $http.post('http://' +$scope.host+ '/api/portal/auth/v1/sms_verify?sessionid='+$scope.sessionid, params,{
                headers: {
                    'Content-Type': undefined //cross browser post allowed
                }
            }).success(function(resp){
                $scope.resp =  resp;
                $scope.is_submit = false;
                if (resp.success){
                    $scope.register_mode = 'enable_internet';
                }
            });
        }

        $scope.start_session({'trackId':$scope.trackId})

});
