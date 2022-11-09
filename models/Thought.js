const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    // reactionId: {
    //     type: Schema.Types.ObjectId,
    //     default: () => new Types.ObjectId()
    // },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
    {
        toJson: {
            getters: true,
        },
    });

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
    {
        toJson: {
            getters: true,
            virtuals: true
        },
        id: false
    },
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
const Reaction = model('Reaction', reactionSchema);
module.exports = {Thought, Reaction}