angular.module('starter.services', [])

.factory('Markers', ['$ionicPopup', function($ionicPopup) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var markers = [];

  return {

    init : function() {
        data = localStorage.getItem("straliens_data");
        markers = data ? JSON.parse(data) : [];
    },


    all: function() {
      return markers;
    },

    remove: function(marker) {
        var self = this;
        var confirmPopup = $ionicPopup.confirm({
            title: 'Supprimer le point',
            template: 'Es-tu sûr de vouloir supprimer le point ?',
            cancelText: 'Non',
            okText: 'Oui !'
        });
        confirmPopup.then(function(res) {
            if(res) {
                markers.splice(markers.indexOf(marker), 1);
                self.save();
            }
        });
    },

    add: function(marker) {
        markers.push(marker);
        this.save();
    },

    save: function() {
        localStorage.setItem(Date.now(),JSON.stringify(markers));
        localStorage.setItem("straliens_data",JSON.stringify(markers));
    }
  };
}]);
