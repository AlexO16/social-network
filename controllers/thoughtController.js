const {Thought, Reaction} = require('../models/Thought')
const {Types} = require('mongoose')

module.exports = {
    //Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        };
    },
    //Get one thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById({ _id: req.params.thoughtId });
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            res.status(200).json(newThought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //Update thought
    async updateThought(req, res) {
        try {
            const updtThought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                { thoughtText: req.body.thoughtText, username: req.body.username},
                { runValidators: true, new: true });
            res.status(200).json(updtThought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //Delete thought
    async deleteThought(req, res) {
        try {
            const delThought = await Thought.findOneAndRemove(
                { _id: req.params.thoughtId });
            res.status(200).json(delThought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //Add reaction
    async addReaction(req, res) {
        try {
            const reaction = await Reaction.create({...req.body})
            const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $push: { reactions: reaction } },
                    { runValidators: true, new: true });
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //Delete reaction
    async deleteReaction(req, res) {
        try {
            const delRxn = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: {_id: Types.ObjectId(req.params.reactionId) }}},
                { runValidators: true, new: true });
            res.status(200).json(delRxn);
        } catch (err) {
            res.status(500).json(err)
        }
    },
};