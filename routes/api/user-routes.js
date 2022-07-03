const router = require('express').Router();

const {

    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

} = require('../../controllers/user-controller');


//Set up GET all and POST
router.route('/').get(getAllUsers)
    .post(createUser);


//Set up GET, PUT, and DELETE
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


//Set up POST and DELETE
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router; 