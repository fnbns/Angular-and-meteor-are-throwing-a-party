 angular.module('campusParty').controller('PartiesListCtrl', ['$scope', '$meteor', '$root',
        function ($scope, $meteor, $root) {

         $scope.parties = $meteor.collection(Parties)


         /* add party method*/
         $scope.addParty = function () {
             $scope.newParty.owner = $root.currentUser._id
             $scope.parties.push($scope.newParty)
         }


         $scope.remove = function (party) {
             $scope.parties.splice($scope.parties.indexOf(party), 1)
         }

         $scope.removeAll = function () {
             $scope.parties.remove()
         };

      }])
