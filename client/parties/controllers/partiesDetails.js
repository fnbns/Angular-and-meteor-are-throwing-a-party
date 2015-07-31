 angular.module("campusParty").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
  function ($scope, $stateParams, $meteor) {


         $scope.users = $meteor.collection(Meteor.users, false).subscribe('users')
         $scope.party = $meteor.object(Parties, $stateParams.partyId)

         var subscriptionHandle
         $meteor.subscribe('parties').then(function (handle) {
             subscriptionHandle = handle
         })

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

         /* stop subscription on scope destroy since we're subscribed in both routes */
         $scope.$on('$destroy', function () {
             subscriptionHandle.stop()
         })

 }])
