const User = require('../models/User')

module.exports = {
    //Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err)
        };
    },
    //Get one user
    async getSingleUser(req, res) {
        try {
            const user = await User.findById({ _id: req.params.userId });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.status(200).json(newUser);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //Update user
    async updateUser(req, res) {
        try {
            const updtUser = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { username: req.body.username, email: req.body.email },
                { runValidators: true, new: true });
            res.status(200).json(updtUser);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //Delete user
    async deleteUser(req, res) {
        try {
            const delUser = await User.findOneAndRemove({ _id: req.params.userId });
            res.status(200).json(delUser);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //Add friend
    async addFriend(req, res) {
        try {
            const newFs = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { runValidators: true, new: true });
            res.status(200).json(newFs);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //Delete friend
    async deleteFriend(req, res) {
        try {
            const delFs = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true });
                res.status(200).json(delFs);
        } catch (err) {
            res.status(500).json(err)
        }
    },
};