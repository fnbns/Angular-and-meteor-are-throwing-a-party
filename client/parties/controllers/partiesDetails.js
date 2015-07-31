 angular.module("campusParty").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
  function ($scope, $stateParams, $meteor) {


         $scope.users = $meteor.collection(Meteor.users, false).subscribe('users')
         $scope.party = $meteor.object(Parties, $stateParams.partyId).subscribe('parties')

         $scope.save = function () {
             $scope.party.save().then(function (numberOfDocs) {
                 console.log('save success doc affected ', numberOfDocs)
             }, function (error) {
                 console.log('save error', error)
             })
         }

         $scope.reset = function () {
             $scope.party.reset()
         }

}])
