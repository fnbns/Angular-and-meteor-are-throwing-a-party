angular.module('campusParty').filter('uninvited', function () {
    return function (users, party) {
        if (!party)
            return false

        return _.filter(users, function (user) {
            if (user._id == party.ownner || _.contains(party.invited, user._id))
                return false
            else
                return true
        })
    }
})
