const router = require('express').Router();
const fs = require('fs');
const util = require('util');
const path = require('path');


require('dotenv').config();


router.post('/', async (req, res) => {
  try {
  

    process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, 'book-of-fortune-382018-883d7668cc42.json');



    const textToSpeech = require('@google-cloud/text-to-speech');

    'use strict';

    /**
     * Lists available voices for the specified language.
     *
     * @param {string} languageCode - The language code.
     */
    async function listVoices(languageCode) {
      const textToSpeech = require('@google-cloud/text-to-speech');

      const client = new textToSpeech.TextToSpeechClient();

      const [result] = await client.listVoices({languageCode});
      const voices = result.voices;

      voices.forEach((voice) => {
        console.log(`${voice.name} (${voice.ssmlGender}): ${voice.languageCodes}`);
      });
    }

    //listVoices('en');


    /**
     * Sythesizes sample text into an .mp3 file.
     */
    async function synthesize() {
      
      const client = new textToSpeech.TextToSpeechClient();


      //const text = 'It\'s a destiny that we meet. What type of question you have in mind?';
      
      if (!req.body.speech || !req.body.uid)
      {
        console.log ('speech or uid is undefined')
        return; //skip if no text input 
      }

      const text = req.body.speech.trim ();
      const uid = req.body.uid;
      
        
      const request = {
        input: {text: text},
        voice: {name: 'en-US-Wavenet-C', languageCode: 'en-US', ssmlGender: 'FEMALE'},//en-US-Wavenet-C, en-US-News-L
        audioConfig: {audioEncoding: 'MP3'},
      };

      const [response] = await client.synthesizeSpeech(request);
      // Write the binary audio content to a local file
      const writeFile = util.promisify(fs.writeFile);

      //console.log ("test", text, req.body.uid)
      const userTempUpload = `../../../client/public/src/temp/${uid}/`;
      const outputFolder = `${path.join(__dirname, userTempUpload)}`;

      

      const outputFilename = new Date().toJSON().replace (/:/g, "-") + '.mp3';
      const outputFile = `${outputFolder}${outputFilename}`;
      


      if (await !fs.existsSync(outputFolder)){
        await fs.mkdirSync(outputFolder, { recursive: true });
      }
    
      //console.log (outputFile)
      
      if (await !fs.existsSync(outputFile))
        await writeFile(outputFile, response.audioContent, 'binary');


      return `/src/temp/${uid}/${outputFilename}`;

    }

    const soundPath = await synthesize();

    res.status(200).json(soundPath);
  
  } catch (err) {
    res.status(400).json({ error: err });
  }
});


module.exports = router;
