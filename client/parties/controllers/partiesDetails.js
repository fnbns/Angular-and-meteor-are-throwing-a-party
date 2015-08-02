 angular.module("campusParty").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
  function ($scope, $stateParams, $meteor) {

         $scope.map = {
             center: {
                 latitude: 45,
                 longitude: -73
             },
             zoom: 8,
             events: {
                 click: function (mapModel, eventName, originalEventArgs) {
                     if (!$scope.party)
                         return;

                     if (!$scope.party.location)
                         $scope.party.location = {};

                     $scope.party.location.latitude = originalEventArgs[0].latLng.lat();
                     $scope.party.location.longitude = originalEventArgs[0].latLng.lng();
                     //scope apply required because this event handler is outside of the angular domain
                     $scope.$apply();
                 }
             },
             marker: {
                 options: {
                     draggable: true
                 },
                 events: {
                     dragend: function (marker, eventName, args) {
                         if (!$scope.party.location)
                             $scope.party.location = {};

                         $scope.party.location.latitude = marker.getPosition().lat();
                         $scope.party.location.longitude = marker.getPosition().lng();
                     }
                 }
             }
         }

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


         /* invite people to party */
         $scope.invite = function (user) {
             $meteor.call('invite', $scope.party._id, user._id).then(
                 function (data) {
                     console.log('success inviting', data)
                 },
                 function (err) {
                     console.log('failed', err)
                 }
             )
         }

         /* helper for front-end setup */
         $scope.canInvite = function () {
             if (!$scope.party)
                 return false

             return !$scope.party.public &&
                 $scope.party.owner === Meteor.userId()
         }
 }])
