angular.module('starter.controllers', [])

.controller('WelcomeCtrl', function ($scope, $http, $filter, $stateParams) {
        if ($stateParams.sessionid){
            $scope.sessionid = $stateParams.sessionid;
        }else{
            $scope.sessionid = 'null';
        }

        $scope.trackId = '9999';
        $scope.host = '10.0.4.39';
        $scope.form= {
            'username':''
        }

        $http.get('http://' +$scope.host+ '/api/portal/auth/v1/test_host').success(function(resp){
            $scope.host = resp.test_host;
            $scope.start_session({'trackId':$scope.trackId})
        });


        $scope.start_session = function(params) {
            $http.post('http://' +$scope.host+ '/api/portal/auth/v1/start_session?sessionid='+$scope.sessionid, params,{
                headers: {
                    'Content-Type': undefined //cross browser post allowed
                }
            }).success(function(resp){
                if (resp.success){
                    $scope.sessionid = resp.sessionid;
                    if (resp.connected_before){
                        $scope.register_mode = 'login';
                        $scope.form.username = resp.username
                    }else{
                        $scope.register_mode = 'sign_up_sms';
                    }
                }
                $scope.resp =  resp;
            })
        }


        $scope.sendSms = function (){
            $scope.is_submit = true;
            var params = {
                'gsm':$scope.form.gsm,
                'country_code': '90',
                'register_type': 'sms'
            }
            $http.post('http://' +$scope.host+ '/api/portal/auth/v1/sign_up?sessionid='+$scope.sessionid, params,{
                headers: {
                    'Content-Type': undefined //cross browser post allowed
                }
            }).success(function(resp){
                $scope.resp =  resp;
                if (resp.success){
                    $scope.register_mode = 'login';
                    $scope.form.username =  params.country_code + $scope.form.gsm
                }
                $scope.is_submit = false;
            });
        }

        $scope.login = function (){
            $scope.is_submit = true;
            var params = {
                'password' : $scope.form.password,
                'username' : $scope.form.username
            }
            $http.post('http://' +$scope.host+ '/api/portal/auth/v1/login?sessionid='+$scope.sessionid, params,{
                headers: {
                    'Content-Type': undefined //cross browser post allowed
                }
            }).success(function(resp){
                $scope.resp =  resp;
                $scope.is_submit = false;
                if (resp.success){
                    $scope.register_mode = 'enable_internet';
                    setTimeout(function(){
                        $http.jsonp(resp.login_url+'&callback=JSON_CALLBACK').success(function(response){
                            console.log('response',response)
//                    message:loggedin varsa internet success
                        });
                    }, 3000)
                }
            });
        }


    });
