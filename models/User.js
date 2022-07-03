const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
            // found at https://www.codegrepper.com/code-examples/whatever/email+validation+in+mongoose
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
)

// get total count of friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

// create the Users model using the Users Schema
const User = model('User', UserSchema);

// Export Users module
module.exports = User;