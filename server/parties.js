Meteor.publish("parties", function (_options, _searchString) {
    if (_searchString == null)
        _searchString = ''

    /* return the number of all parties - used in client side */
    Counts.publish(this, 'numberOfParties', Parties.find({
        'name': {
            '$regex': '.*' + _searchString || '' + '.*',
            '$options': 'i'
        },
        $or: [
            {
                $and: [
                    {
                        'public': true
                    },
                    {
                        'public': {
                            $exists: true
                        }
                    }
    ]
            },
            {
                $and: [
                    {
                        owner: this.userId
                    },
                    {
                        owner: {
                            $exists: true
                        }
                    }
    ]
            }
]
    }), {
        noReady: true
    })

    return Parties.find({
        'name': {
            '$regex': '.*' + _searchString || '' + '.*',
            '$options': 'i'
        },
        $or: [
            {
                $and: [
                    {
                        "public": true
                    },
                    {
                        "public": {
                            $exists: true
                        }
                    }
      ]
            },
            {
                $and: [
                    {
                        owner: this.userId
                    },
                    {
                        owner: {
                            $exists: true
                        }
                    }
      ]
            }
    ]
    }, _options)
})
