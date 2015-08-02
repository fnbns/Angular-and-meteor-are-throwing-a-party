 Parties = new Mongo.Collection("parties")

 Parties.allow({
     insert: function (userId, party) {
         return userId && party.owner === userId
     },
     update: function (userId, party, fields, modifier) {
         return userId && party.owner === userId
     },
     remove: function (userId, party) {
         return userId && party.owner === userId
     }
 })

 Meteor.methods({
     invite: function (partyID, userID) {

         /*   The check package includes pattern checking functions useful for checking the types and structure of variables and                 an extensible library of patterns to specify which types you are expecting.
          */
         check(partyID, String)
         check(userID, String)

         var _party = Parties.findOne(partyID)

         if (!_party)
             throw new Meteor.Error(404, "The party does not exist")
         if (_party.owner !== this.userId)
             throw new Meteor.Error(404, "The party does not exist")
         if (_party.public)
             throw new Meteor.Error(400,
                 "That party is public. No need to invite people.")

         if (userID !== _party.owner && !_.contains(_party.invited, userID)) {
             Parties.update(partyID, {
                 $addToSet: {
                     invited: userID
                 }
             })
         }

         var _from = contactEmail(Meteor.users.findOne(this.userId))
         var _to = contactEmail(Meteor.users.findOne(userID))

         if (Meteor.isServer && _to) {

             Email.send({
                 from: "noreply@campusparty.com",
                 to: _to,
                 replyTo: _from || undefined,
                 subject: "Party:" + _party.title,
                 text: "You are officially invited to " + _party.title + "in Campus Party." + "\n\nCome check it out: " + Meteor.absoluteUrl() + "\n"

             })
         }
     }
 })

 var contactEmail = function (user) {
     if (user.emails && user.emails.length)
         return user.emails[0].address
     if (user.services && user.services.twitter && user.services.twitter.email)
         return user.services.twitter.email
     return null
 }
