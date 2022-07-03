const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thought-controller');


//Set up GET all
router.route('/')
    .get(getAllThoughts);


//Set up GET one, PUT, and DELETE by ID
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


//Set up POST thought
router.route('/:userId')
    .post(createThought);


//Set up POST reaction
router.route('/:thoughtId/reactions')
    .post(addReaction);


//Set up DELTE reaction
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;