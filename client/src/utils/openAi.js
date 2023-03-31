//chatGPT
const keyObj = {
  k1: 'sk-kHKXTLrCLCPgjaA9gUN4T3B',
  k2: 'lbkFJZztT7N455GO013NZZ6Qw',
};

async function chatGptApi(search) {
  let chatGptApiUrl = 'https://api.openai.com/v1/completions';
  let cak = keyObj.k1 + keyObj.k2;
  let fetchData = {
    model: 'text-davinci-003',
    prompt: search,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  let fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + cak,
    },
    body: JSON.stringify(fetchData),
  };
  //loading icon
  /*
    let loadText = '';
  if ($(elementID)) {
    loadText = '';
    $(elementID).html ('<div id="loading-div"><img id="loading-icon" src="./assets/images/loading2.gif">' + loadText + '</div>');
  } */
  let chatGptRes = await fetch(chatGptApiUrl, fetchOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log("data: ", data);
      //loading data into page
      //textTrimed = data.choices[0].text.replace(/(?:\r\n|\r|\n)/g, '<br>');
      return data;
    });
  return chatGptRes;
}
export default chatGptApi;
