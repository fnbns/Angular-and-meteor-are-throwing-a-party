 angular.module('campusParty')
     .controller('PartiesListCtrl', ['$scope', '$meteor', '$rootScope',
        function ($scope, $meteor, $rootScope) {

             $scope.parties = $meteor.collection(Parties)

             /* add party*/
             $scope.addParty = function () {
                 if ($rootScope.currentUser) {
                     $scope.newParty.owner = $rootScope.currentUser._id
                     $scope.parties.push($scope.newParty)

                     /* reset model*/
                     $scope.newParty = {}

                 } else {
                     /* TODO: Show allert / notify user */
                 }

             }

             $scope.remove = function (party) {
                 $scope.parties.splice($scope.parties.indexOf(party), 1)
             }

             $scope.removeAll = function () {
                 $scope.parties.remove()
             };

      }])
