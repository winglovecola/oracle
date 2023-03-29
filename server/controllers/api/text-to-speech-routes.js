const router = require('express').Router();
const fs = require('fs');
const util = require('util');

require('dotenv').config();


router.get('/text-to-speech', async (req, res) => {
  try {
  process.env.GOOGLE_APPLICATION_CREDENTIALS =  '../book-of-fortune-382018-883d7668cc42.json';


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

  listVoices('en');


  /**
   * Sythesizes sample text into an .mp3 file.
   */
  async function synthesize() {
    
    const client = new textToSpeech.TextToSpeechClient();

    const text = 'It\'s a destiny that we meet. What type of question you have in mind?';

    const request = {
      input: {text: text},
      voice: {name: 'en-US-Wavenet-C', languageCode: 'en-US', ssmlGender: 'FEMALE'},//en-US-Wavenet-C, en-US-News-L
      audioConfig: {audioEncoding: 'MP3'},
    };

    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
  }

  synthesize();
  
} catch (err) {
  res.json({ error: err });
}
});


module.exports = router;
