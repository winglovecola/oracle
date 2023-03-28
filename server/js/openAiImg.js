require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

async function editImage (imgPath) {

    const openai = new OpenAIApi(configuration);
    const response = await openai.createImageEdit(
      fs.createReadStream(imgPath),
      /* fs.createReadStream("mask.png"), //we don't need this at the moement*/
      "A cute baby sea otter wearing a beret", //A text description of the desired image(s). The maximum length is 1000 characters.
      2,           //The number of images to generate. Must be between 1 and 10.
      "1024x1024" //The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024
    );
}
