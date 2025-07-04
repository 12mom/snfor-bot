const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient();

async function convertTextToVoice(text, filename = 'output.mp3') {
  const request = {
    input: { text: text },
    voice: { languageCode: 'ar-XA', ssmlGender: 'MALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(filename, response.audioContent, '
