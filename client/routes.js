angular.module("campusParty").run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {

        /* catching the error from $meteor.requireUser(); get back to home*/
        if (error === "AUTH_REQUIRED") {
            console.log("error on auth, return to parties")
            $state.go('parties')
        }
    })
}])

angular.module('campusParty').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('parties', {
                url: '/parties',
                templateUrl: 'client/parties/views/parties-list.ng.html',
                controller: 'PartiesListCtrl'
            })
            .state('partyDetails', {
                url: '/parties/:partyId',
                templateUrl: 'client/parties/views/party-details.ng.html',
                controller: 'PartyDetailsCtrl',
                resolve: {
                    "currentUser": ["$meteor", function ($meteor) {
                        return $meteor.requireUser();
    }]
                }
            })
            //TODO #1: Implement require valid users for priviledge levels !

        $urlRouterProvider.otherwise('/parties')
}])
