angular.module('starter.controllers', [])



.controller('ListCtrl', function($scope, Markers) {
    $scope.markers = Markers.all();
    $scope.remove = function(marker) {
        Markers.remove(marker);
    }
})


.controller('AddCtrl', function($scope, Markers, $ionicPopup, $state) {
    $scope.empty = {
        url: '',
        name: '',
        lat: '',
        lng: ''
    };

    $scope.form = _.extend({}, $scope.empty);


    $scope.onLaunchQrCodeScanner = function() {

        cordova.plugins.barcodeScanner.scan(
            function (result) {
                $scope.form.url = result.text;
                $scope.$apply();
            },
            function (error) {
                $ionicPopup.alert({
                    title: "Ooops ! Erreur"
                })
            }
        );
    };

    $scope.onLaunchGeoloc = function() {
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                $scope.form.lat = pos.coords.latitude;
                $scope.form.lng = pos.coords.longitude;
                $scope.$apply();
            },
            function(error) {
                $ionicPopup.alert({
                    title: "Ooops ! Erreur"
                })
            }
        )
    };

    $scope.onAddClick = function(){
        Markers.add($scope.form);
        $scope.form = _.extend({}, $scope.empty);

        $ionicPopup.alert({
            title: "Il a bien été ajouté ! Au suivant :)"
        }).then(function(){
            $state.go('tab.list');
        })
    };
})

.controller('JsonCtrl', function($scope, Markers) {

    $scope.markers = Markers.all();

})

