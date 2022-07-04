const { User } = require('../models');



const userController = {


    //Create User
    createUser({ body }, res) {

        User.create(body)

            .then(dbUserData => res.json(dbUserData))

            .catch(err => res.status(400).json(err));
    },



    // Get All Users
    getAllUsers(req, res) {

        User.find({})

            .populate({ path: 'thoughts', select: '-__v' })

            .populate({ path: 'friends', select: '-__v' })

            .select('-__v')

            .then(dbUserData => res.json(dbUserData))

            .catch(err => {

                console.log(err);
                res.status(500).json(err);

            });
    },



    // Get User By ID
    getUserById({ params }, res) {

        User.findOne({ _id: params.id })

            .populate({ path: 'thoughts', select: '-__v' })

            .populate({ path: 'friends', select: '-__v' })

            .select('-__v')

            .then(dbUserData => {

                if (!dbUserData) {
                    res.status(404).json({ message: 'No User With This ID!' });
                    return;
                }
                res.json(dbUserData)
            })

            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },



    // Update User By ID
    updateUser({ params, body }, res) {

        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })

            .then(dbUserData => {

                if (!dbUserData) {
                    res.status(404).json({ message: 'No User With This ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },



    //Delete User By ID
    deleteUser({ params }, res) {

        User.findOneAndDelete({ _id: params.id })

            .then(dbUserData => {

                if (!dbUserData) {
                    res.status(404).json({ message: 'No User With This ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },



    // Add Friend
    addFriend(req, res) {

        User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId } }, { new: true })

            .populate({ path: 'friends', select: ('-__v') })

            .select('-__v')

            .then(dbUserData => {

                if (!dbUserData) {
                    res.status(404).json({ message: 'No User With This ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },



    // Delete Friend
    deleteFriend(req, res) {

        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })

            .populate({ path: 'friends', select: '-__v' })

            .select('-__v')

            .then(dbUserData => {

                if (!dbUserData) {
                    res.status(404).json({ message: 'No User With This ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }

};



module.exports = userController; 