const router = require('express').Router();

const uploadRoutes = require('./upload-routes');
const imageEditRoutes = require('./img-edit-routes');


router.use('/upload', uploadRoutes);
router.use('/img', imageEditRoutes);


module.exports = router;