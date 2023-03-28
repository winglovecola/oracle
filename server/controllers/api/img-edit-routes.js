const router = require('express').Router();
const axios = require('axios');
const path = require('path');

const FormData = require('form-data');
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");

const fs = require('fs');

const userImgPhotoPath = '../../src/img/upload';
const session = 'm3ug6nd';
const imgFilename = '20190714_212229.png';


const userImgPhotofolderPath = `${path.join(__dirname, userImgPhotoPath)}\\${session}`;
const userImgPhotoFilePath = `${userImgPhotofolderPath}\\${imgFilename}`;


const imgMask = `${userImgPhotofolderPath}\\mask.png`;
//let userImgPhotoFilePath = `${userImgPhotoPath}/${session}/${imgFilename}`;
// userImgPhotoFilePath = path.join(__dirname, userImgPhotoFilePath);
//console.log (userImgPhotoFilePath);

//console.log ('KEY: ' + process.env.AI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.AI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function editImage (imgPath) {

    const response = await openai.createImageEdit(
      fs.createReadStream(imgPath),
      fs.createReadStream(imgMask), //we don't need this at the moement
      "flamingo on the water", //A text description of the desired image(s). The maximum length is 1000 characters.
      1,           //The number of images to generate. Must be between 1 and 10.
      "512x512", //The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024
    );


    console.log(response.data.data[0].url);
    return response.data.data[0].url;
}


async function createImageVariation (imgPath) {

  const response = await openai.createImageVariation(
    fs.createReadStream(imgPath),
    2,
    "1024x1024"
  );

  return response.data.data[0].url;
}


async function createImage () {

  const response = await openai.createImage({
    prompt: "A cute baby sea otter",
    n: 1,
    size: "512x512",
  });

  return response.data.data[0].url;
}



const API_KEY = process.env.AI_API_KEY;
const API_URL = 'https://api.openai.com/v1/images/edits';

const editImage2 = async (imagePath, prompt, api_key) => {
  // Read the image and mask files as binary data
  const image = fs.readFileSync(imagePath);

  // Generate a new image based on the input image and mask, as well as the prompt
  const form = new FormData();
  form.append('model', 'image-alpha-001');

  form.append('api_key', api_key);
  form.append('prompt', prompt);
  form.append('n', '1');
  form.append('size', '512x512');
  form.append('response_format', 'url');
  form.append('image', image, { filename: 'image.png' });


  const generationResponse = await axios.post(API_URL, form, {
    headers: form.getHeaders()
  });

  return generationResponse.data.data[0].url;
};





router.get('/edit', async (req, res) => {
  try {
    //console.log (userImgPhotoFilePath)
    const result = await editImage (userImgPhotoFilePath);
    //const result = await createImageVariation (userImgPhotoFilePath);
    
    //const result = await createImage ();

    const prompt = 'A cute baby sea otter wearing a beret';
    //result = await editImage2(userImgPhotoFilePath, prompt, API_KEY);

    
    res.status(200).json(result);


  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
