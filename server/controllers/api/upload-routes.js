const router = require('express').Router();

const path = require('path');
const fs = require('fs');

const multer = require('multer'); // middleware for handling uploaded files through forms
const sharp = require('sharp'); // middleware for image compression


// Import the custom middleware for handling form data



const userImgTempUpload = '../../src/img/tmp_upload';

const userImgPhotoPath = '../../src/img/upload';

const userImgAvatarCustomPath = '../../src/img/avatar/custom';
const userImgAvatarPresetPath = '../../src/img/avatar/preset';

const uploadPhoto = multer({
  dest: path.join(__dirname, userImgTempUpload),
});

const uploadAvatar = multer({
  dest: path.join(__dirname, userImgTempUpload),
});


// Create new photo
router.post('/photos', uploadPhoto.single('photos'), async (req, res) => {
  try {
    // Use sharp to resize the image and save it to the public folder
    const tempImgFile = req.file.path;
    const userImgPhotofolderPath = `${path.join(__dirname, userImgPhotoPath)}/${req.body.session}`;

    if (await !fs.existsSync(userImgPhotofolderPath)){
      await fs.mkdirSync(userImgPhotofolderPath, { recursive: true });
    }

    const userImgPhotoFilePath = `${userImgPhotofolderPath}/${req.file.originalname}`;

    await sharp(tempImgFile)
      .resize(1024) // resizes the image to 1024px wide
      .jpeg({ quality: 80 }) // converts to jpeg and sets quality to 80%
      .toFile(userImgPhotoFilePath, async (err, stats) => {

        if (!err) {

          //create data entry 

          const photoData = {
            userid: '',
            img_filename: req.file.originalname,
            img_size: stats.size,
            img_width: stats.width,
            img_height: stats.height,
            created_time: Date.now(),
            updated_time: Date.now()
          };

          res.status(200).json(photoData);
        } else {
          res.status(400).json('failed to generate photo');
        }
      });

  } catch (err) {
    res.json({ error: err });
  }
});


/* 
// Get photos for a user
router.get('/photos', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userid, {
      include: [{model: Photo}],
    });

    console.log('made it into the direct route');

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    user = userData.get({ plain: true });

    // console.log('userData:', userData);
    // console.log('user:', user);

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Get photos for a user
router.get('/photos/:userid', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.userid, {
      include: [{model: Photo}],
      order: [
        ['created_time', 'DESC'],
      ]
    });

    console.log('made it into the direct route');

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    user = userData.get({ plain: true });

    // console.log('userData:', userData);
    // console.log('user:', user);

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Create new avatar image
router.post('/avatar', uploadAvatar.single('avatar'), async (req, res) => {
  try {
    // Use sharp to resize the image and save it to the public folder
    const tempImgFile = req.file.path;

    const userImgAvatarFileName = `${req.session.userid}.jpg`;
    const userImgAvatarCustomFilePath = `${path.join(__dirname, userImgAvatarCustomPath)}/${userImgAvatarFileName}`;

    await sharp(tempImgFile)
      .resize(600) // resizes the image to 800px wide
      .jpeg({ quality: 80 }) // converts to jpeg and sets quality to 80%
      .toFile(userImgAvatarCustomFilePath, async (err, stats) => {
        if (!err) {


          const avatarData = await User.update(
            {
              avatar: userImgAvatarFileName,
              avatar_type: 'C' //custom
            },
            { where: { id: req.session.userid } }
          );

          res.status(200).json(avatarData);
        } else {
          res.status(400).json('Failed to create avatar');
        }
      });

  } catch (err) {
    res.json({ error: err });
  }
});
 */

module.exports = router;
