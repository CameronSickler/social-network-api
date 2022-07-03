const router = require('express').Router();

const apiRoutes = require('./api');
//const htmlRoutes = require('./html/html-routes');
//if front end is ever created

router.use('/api', apiRoutes);
//router.use('/', htmlRoutes);
//if front end is ever created

router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
});


module.exports = router;