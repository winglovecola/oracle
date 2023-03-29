const router = require('express').Router();

const uploadRoutes = require('./upload-routes');
const imageEditRoutes = require('./img-edit-routes');
const textToSpeechRoutes = require('./text-to-speech-routes');

router.use('/upload', uploadRoutes);
router.use('/img', imageEditRoutes);
router.use('/text-to-speech', textToSpeechRoutes);

module.exports = router;